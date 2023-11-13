# Road To Reality(Multiple valuedness, natural logarithms)(with explaination)

## Easy way(Taylor Series, Mathematical Analysis, My method)

$e^z=\sum_{k=0}^{\infty}\frac{z^k}{k!}$
let $z = ix$, $e^{ix}=\sum_{k=0}^{\infty}\frac{(ix)^k}{k!}$

$\cos{x}=\sum_{k=0}^{\infty}\frac{(-1)^k}{2k!}x^{2k}$

$\sin{x}=\sum_{k=0}^{\infty}\frac{(-1)^k}{(2k+1)!}x^{2k+1}$

$i\sin{x}=i\sum_{k=0}^{\infty}\frac{(-1)^k}{(2k+1)!}x^{2k+1}$

Hence,

$e^z=i\sin{x}+cos{x}$

## Physics?

### Addition-to-multiplication

$e^{a+b}=e^ae^b$
the inverse of the exponential function:

$z=\ln{w}$

if $w = e^z$

Hence:

$\ln{ab}=\ln{a}+\ln{b}$

### A special Cartesian form ($z=x+iy$)

$z=\ln{w}=\ln{r}+i\theta$

Because $w=e^z$, hence

$e^{2\pi i}=1$

$e^{\pi i} + 1 = 0$

why $e^{\pi}$ is not 1? because we just do a Taylor series expansion:

$e^x=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\frac{x^4}{4!}...$
$e^{ix}=1+ix+\frac{-1}{2!}+\frac{-i}{3!}+\frac{1}{4!}...$

wrong proof, but we also could use the one-to-one (injective, but also remember the periodic), the properties of exponential functions, the $e^{\pi i}$ could not as same as $e^{2\pi i}$

and other ways:

Differential Approach: Assume $e^\pi i = e^{2\pi} i = 1$, hence, implying the derivative along this path is zero, which contradicts the non-zero derivative we know it has.

($e^z \neq 0$, where
$z \in C$)

Holomorphicity and Analytic Continuation: Because $e^z$ is a holomorphic function, holomorphicity is a concept from complex analysis, a branch of mathematics that deals with functions of a complex variable. A function is said to be holomorphic at a point if it is complex differentiable at that point, and it's said to be holomorphic on an open set if it is complex differentiable at every point in that set. while $e^{iθ}$ is holomorphic for all real $θ$, the periodic behaviour of the complex exponential function gives us $e^{2π i}=1$. Holomorphic functions have many wonderful properties, so the $e^\pi$ could not be 1.

### The intuitive part and some application

$w=e^z=e^{\ln{r}+i\theta}=re^{i\theta}$,

let $r = 1$,$e^{i\theta}=\cos\theta+i\sin\theta$

let $\theta = \alpha+\beta$, $e^{\alpha+\beta}=e^{\alpha}*e^{\beta}$
$\cos{(\alpha+\beta)}+i\sin{(\alpha+\beta)}=(\cos\alpha+i\sin\alpha)(\cos\beta+i\sin\beta)$

we could get some triangle formulas, maybe more.
