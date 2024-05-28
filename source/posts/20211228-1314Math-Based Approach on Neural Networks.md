```
tags: top
```

> 自变量（Independent variable）一词来自数学。也叫实验刺激(inputs)。——qianxin

# Math-Based Approach on Neural Networks

## Perceptrons

### algebraic terms

with inputs $x_1, x_2, ...$, weights $w_1, w_2, ...$, and bias $b$ is
$$
output=\left\{\begin{matrix}
0\ if\ \sum_{j}w_jx_j \le thresold \\
1\ if\ \sum_{j}w_jx_j \gt thresold 
\end{matrix}\right.
$$

### dot product with bias as thresold

$$
output=\left\{\begin{matrix}
0\ if\ w\cdot x+b \le 0 \\
1\ if\ w\cdot x+b \gt 0
\end{matrix}\right.
$$

## Sigmoid Neuron

### Sigmoid Function

$$\sigma(z) \equiv \frac{1}{1+e^{-z}}$$

with inputs $x_1, x_2, ...$, weights $w_1, w_2, ...$, and bias $b$ is

$$output \equiv \sigma(z) \equiv \frac{1}{1+e^{-\sum_{j}w_jx_j-b}}$$ 

### $\Delta output$

$$\Delta{output}\approx \sum_{j}\frac{\partial output}{\partial w_j}\Delta{w_j}+\frac{\partial output}{\partial b}\Delta{b}$$

## Gradient descent

### Cost function

In this formula, $y(x) \equiv output$,
$$C(w,b) \equiv \frac{1}{2n}\sum_{x}||y(x)-a||^2$$






# ChangeLog

- 12月28日 12:59 1847年，柯西发明了梯度下降法
