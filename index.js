/**
 * Generator & Static Server.
 */
const http = require('http');
const Worker = require("worker_threads");
const fs = require("fs");
const path = require("path");

const { Marked } = require('marked');
const { markedHighlight } = require("marked-highlight");
const hljs = require('highlight.js');
const katex = require('katex');
require("katex/contrib/mhchem");

const modulePath = path.resolve(__filename);

if (process.argv.includes("develop")) {
  const childs = [];
  const exec = (argv) =>
    childs.push(new Worker(modulePath, { argv }).on("error", console.error));
  let i = 0;
  const spawn = () => {
    console.log("#", ++i);
    childs.forEach(() => childs.pop().terminate());
    exec(["serve", "--dev"]);
  };
  spawn();
  process.stdin.on("data", spawn);
  (async () => {
    await new Promise(() => { });
    // Code to continue after the promise is resolved
  })();
} else if (process.argv.includes("serve")) {
  const port = 4000;
  const mime = {
    html: "text/html;charset=utf8",
    js: "text/javascript",
    svg: "image/svg+xml",
  };
  const r2a = path.join.bind(null, path.dirname(modulePath), "docs");
  http.createServer(({ url }, res) => {
    const pair = [
      [200, r2a(url)],
      [200, r2a(url, "index.html")],
      [404, r2a("404.html")],
    ].find(([_, p]) => fs.existsSync(p) && fs.statSync(p).isFile());
    if (!pair) return res.writeHead(404).end("404 Not Found");
    const [status, local] = pair;
    res.setHeader("content-type", mime[local.split(".").pop()] || "");
    res.writeHead(status).end(fs.readFileSync(local));
  }).listen(port);
  console.info(`server: 127.0.0.1:${port}`);
  // Fall through here, go ahead and run generator
} else if (process.argv.includes("generate")) {
} else {
  throw new Error("unknown function"); // https://stackoverflow.com/questions/73742023
}

console.time("generate time");

const isDev = process.argv.includes("--dev");

const htmlclean = require("htmlclean");
const terser = require("terser");
const { url } = require('inspector');

const minify = (() => {
  const htmlStrip /* Strip useless chars, keep "/>" in <svg> */ = (s) =>
    s.replace(/(?<=>)( |\n)+|( |\n)+(?=<)|(?<!\; )\/(?=>)|; (?=\/>)/g, "");
  const f = (s) => s;
  if (isDev) return { htmlEnhanced: htmlStrip, html: f, css: f, js: f };
  const cssRule = /\/\*.+?\*\/|(?<=[^\w])\s|\s(?=[^\w:#-])|;\s*(?=})|0(?=\.)/g;
  return {
    htmlEnhanced: (s) => htmlclean(htmlStrip(s)),
    html: (s) => htmlclean(s), // bug: htmlclean(`<p><!-- ## Links --></p>`)
    css: (s) => s.replace(cssRule, ""),
    js: (s) => terser.minify(s, { toplevel: true }).code,
  };
})();

// Convert relative path to absolute
const p = ([r], ...s) => path.join(path.dirname(modulePath), r, ...s);

// mapstr`<p>Hi ${[22,33]}${i=>i}</p>` === "<p>Hi 2233</p>"
const mapstr = (parts, ...inserts) => {
  let str = "";
  parts.forEach((part, i) => {
    if (part) str += (inserts[i] ?? []).keys ? part : part + inserts[i];
    else {
      inserts[i - 1].forEach((v, k) => (str += inserts[i](v, k)));
    }
  });
  return str;
};

const makePage = (() => {
  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  const rule = /^\$+([^$\n]+?)\$+/;

  function markedKatex(options = {}) {
    return {
      extensions: [
        {
          name: 'inlineKatex',
          level: 'inline',
          start(src) { return src.indexOf('$'); },
          tokenizer(src, tokens) {
            const match = src.match(rule);
            if (match) {
              return {
                type: 'inlineKatex',
                raw: match[0],
                text: match[1].trim()
              };
            }
          },
          renderer: (token) => katex.renderToString(token.text, { ...options, displayMode: token.displayMode }) + '\n'
        }
      ]
    };
  }

  const options = {
    throwOnError: false,
    output: "mathml"
  };

  marked.use(markedKatex(options));

  return ({ isMarkdown, path: rpath, title, description = "", content }) => {
    if (isMarkdown) {
      content = `<article><h1>${title}</h1>${marked.parse(content)}</article>`;
    }
    const templateRaw = fs.readFileSync(p`./units/template.html`).toString();
    const template = minify.htmlEnhanced(templateRaw);
    const result = template
      .replace("/*{title}*/", title)
      .replace("/*{description}*/", description)
      .replace("/*{content}*/", content);
    if (rpath.endsWith("/")) rpath += "index.html";
    const targetPath = p`./docs/${rpath}`;
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, result);
  };
})();

const loadMD = (filePath) => {
  const meta = {};
  const str = fs.readFileSync(filePath).toString();
  let head;
  // must be top
  if (str.substring(0, 3) === "```") {
    head = str.slice(0, str.indexOf("\n```"));
    console.log(head);

    for (const line of head.split("\n").slice(1)) {
      const key = line.slice(0, line.indexOf(":"));
      meta[key] = line.slice(key.length + 1).trim();
    }
  }
  else return { meta, content: str };
  return { meta, content: str.slice(head.length + "\n```".length) };
};

// Init
{
  const docsPath = path.resolve('./docs');
  const docsOldPath = path.resolve('./docs_old');

  const promises = fs.promises;

  try {
    let docsPathExists = false;
    let docsOldPathExists = false;
    try {
      fs.accessSync(docsPath);
      docsPathExists = true;
    } catch (err) {
      // Handle the error or simply set docsPathExists to false
    }
    try {
      fs.accessSync(docsOldPath);
      docsOldPathExists = true;
    } catch (err) {
      // Handle the error or simply set docsOldPathExists to false
    }
    if (docsPathExists) {
      if (docsOldPathExists) {
        fs.rmSync(docsOldPath, { recursive: true });
        console.log('Delete OldPath operation successful');
      }
      fs.renameSync(docsPath, docsOldPath);
      console.log('Rename operation successful');
    }
    fs.mkdirSync(docsPath);
    console.log('New directory created successfully');
  } catch (err) {
    console.error('Error occurred:', err);
  }

  const f = ([r]) => fs.readFileSync(p`./units/${r}`).toString(); // Read file str
  const avatar = fs.readFileSync('./units/avatar.jpg', { encoding: 'base64' });
  const style = minify.css(f`main.css` + f`markdown.css`);
  const head = minify.htmlEnhanced(f`head.html`).replace("/*{style}*/", style);
  const bundle = f`bundle.js`
    .replace("/*{avatar}*/", "data:image/jpg;base64," + avatar)
    .replace("/*{head}*/", head)
    .replace("/*{extra}*/", minify.htmlEnhanced(f`extra.html`))
    .replace("/*{script}*/", f`main.js`);
  fs.writeFileSync(p`./docs/bundle.js`, minify.js(bundle));
  fs.writeFileSync(p`./docs/update.html`, f`update.html`);
  fs.writeFileSync(p`./docs/.nojekyll`, ""); // Prevent the GitHub Pages to run Jekyll

  const copyDirSync = (srcDir, destDir) => {
    fs.readdirSync(srcDir).forEach((fileName) => {
      const src = path.join(srcDir, fileName);
      const dest = path.join(destDir, fileName);
      if (fs.statSync(src).isFile()) {
        fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(src, dest);
      } else {
        copyDirSync(src, dest);
      }
    });
  };
  copyDirSync(p`./source/res`, p`./docs/res`);
}

// Posts
const posts = [];
{
  const files = fs.readdirSync(p`./source/posts`);
  files.slice(isDev ? -12 : 0).forEach((fileName) => {
    const { meta, content } = loadMD(p`./source/posts/${fileName}`);
    console.log(fileName);

    if (meta) {
      if (meta.date) {
        meta.id = meta.date.replace(/:|\.| /g, "");
        delete meta.date;
        const prefix = meta.id.slice(0, 8) + "-" + meta.id.slice(8);
        if (fileName !== `${prefix} ${meta.title}.md`)
          console.warn(`post file [ ${fileName} ] has incorrect name`);
      }
      if (meta.tags) meta.tags = meta.tags.split(",");
    }
    if (!meta.id) {
      let i = 13;
      meta.id = fileName.substring(0, 8) + fileName.substring(9, i);
      meta.title = fileName.substring(i, fileName.length - 3);
    }
    if (!meta.date) {
      const year = meta.id.substring(0, 4);
      const month = meta.id.substring(4, 6);
      const day = meta.id.substring(6, 8);
      const hour = meta.id.substring(9, 11);
      const minute = meta.id.substring(11, 13);

      meta.date = `${year}.${month}.${day} ${hour}:${minute}`;
    }
    debugger;
    if (!meta.tags) meta.tags = ["blog"];

    posts.push(meta);
    makePage({
      ...meta,
      isMarkdown: true,
      path: `/post/${meta.id}/`,
      content,
    });
  });
}

const tops = ["置顶", "トップに固定", "상단고정", "Pin", "Épingler", "top"];
posts.sort((post1, post2) => {
  if (tops.some(term => post1.tags.includes(term)) === tops.some(term => post2.tags.includes(term))) {
    return post2.id - post1.id; // Sort by id in descending order if both are equally topped or not topped
  } else {
    return tops.some(term => post1.tags.includes(term)) ? -1 : 1; // Posts that are topped come first
  }
});


// Custom Pages
const pages = [];
{
  fs.readdirSync(p`./source/pages`).forEach((fileName) => {
    const { meta, content } = loadMD(p`./source/pages/${fileName}`);
    pages.push(meta);
    console.log(meta);
    console.log(content);
    makePage({
      ...meta,
      isMarkdown: true,
      path: `/${meta.name}/`,
      content,
    });
  });
}

// Pages - Home
{
  const group = [];
  const volume = 10;
  for (let i = 0; i < posts.length; i += volume)
    group.push(posts.slice(i, i + volume));
  group.forEach((list, i, { length: last }) => {
    const cur = i + 1;
    makePage({
      path: i ? `/home/${cur}/` : "/",
      title: i ? `Home: ${cur}` : "Homepage",
      description: i ? "" : "Welcome to my blog!",
      content: mapstr`
        ${list}${({ id, title, description, tags }) => mapstr`
        <section>
          <h3><a href="/./post/${id}">${title}</a></h3>
          <p>${description}</p>
          <div>${tags}${(tag) => `<a href="/./tag/${tag}">${tag}</a> `}</div>
        </section>
        `}
        <nav>
          <a href="/.">◁◁</a>
          <a href="/.${cur > 2 ? `/home/${cur - 1}` : ""}">◁</a>
          <a>${cur} / ${last}</a>
          <a href="/./home/${cur < last ? cur + 1 : last}">▷</a>
          <a href="/./home/${last}">▷▷</a>
        </nav>
      `,
    });
  });
}

// Pages - Archive
{
  const map = new Map(); // Because Objcet's prop order is unspecified
  posts.forEach((post) => {
    const year = post.date.slice(0, 4);
    if (!map.has(year)) map.set(year, []);
    map.get(year).push(post);
  });
  makePage({
    path: "/archive/",
    title: "Archive",
    content: mapstr`
      <section>
        <h1><a href="/./archive">Archive</a></h1>
        ${map}${(_, year) => `<a href="/./archive/${year}">${year}</a> `}
      </section>
    `,
  });
  map.forEach((list, year) => {
    makePage({
      path: `/archive/${year}/`,
      title: `Archive: ${year}`,
      content: mapstr`
        <section>
          <h1><a href="/./archive/${year}">${year}</a></h1>
          ${list}${({ id, date, title }) => `
          <p>
            <a href="/./post/${id}">
              <span>${date.slice(5, 10)}</span> ${title}
            </a>
          </p>
          `}
        </section>
      `,
    });
  });
}

// Pages - Tag
{
  const map = new Map();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!map.has(tag)) map.set(tag, []);
      map.get(tag).push(post);
    });
  });
  makePage({
    path: "/tag/",
    title: "Tag",
    content: mapstr`
      <section>
        <h1><a href="/./tag">Tag</a></h1>
        ${map}${(_, tag) => `<a href="/./tag/${tag}">${tag}</a> `}
      </section>
    `,
  });
  map.forEach((list, tag) => {
    makePage({
      path: `/tag/${tag}/`,
      title: `Tag: ${tag}`,
      content: mapstr`
        <section>
          <h1><a href="/./tag/${tag}">${tag}</a></h1>
          ${list}${(p) => `<p><a href="/./post/${p.id}">${p.title}</a></p>`}
        </section>
      `,
    });
  });
}

// Pages - 404 Error
{
  makePage({
    isMarkdown: true,
    path: "/404.html",
    title: "404 Not Found",
    content: "The requested path could not be found.",
  });
}

// Site Map and RSS
{
  const domain = "https://qianxliu.github.io";

  fs.writeFileSync(
    p`./docs/robots.txt`,
    `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml`
  );

  fs.writeFileSync(
    p`./docs/sitemap.xml`,
    mapstr`
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages}${(p) => `<url><loc>${domain}/${p.name}</loc></url>`}
        ${posts}${(p) => `<url><loc>${domain}/post/${p.id}</loc></url>`}
      </urlset>
    `.trim()
  );

  fs.writeFileSync(
    p`./docs/feed.xml`,
    mapstr`
      <?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0">
        <channel>
          <title>兴趣使然的无名小站</title>
          <link>${domain}</link>
          <description>兴趣使然的无名小站</description>
          ${posts}${({ id, title, description }) => `
          <item>
            <title>${title}</title>
            <description>${description}</description>
            <link>${domain}/post/${id}</link>
          </item>
          `}
        </channel>
      </rss>
    `.trim()
  );
}

console.timeEnd("generate time");
