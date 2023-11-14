"use strict";

var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?4414af73e28ddef24a92155bf3c5f89b";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

history.scrollRestoration = "auto"; // Restone position when page resume
let avatar = `/*{avatar}*/`;
document.head.insertAdjacentHTML("beforeend", `/*{head}*/`);
document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("beforeend", `/*{extra}*/`);
  /*{script}*/
});
