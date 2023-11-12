> 本文所讲的例子，可以很好地帮助我们理解线代的第二部分。

# Fibonacci Numbers（$AX=XΛ$）

## 递归定义

$F_{k+2} = F_{k+1} + F_{k}$
$F_0 = 0$

## $F_{100}$

### 系数矩阵$X$

令通项
$u_k= \left[ \begin{matrix} 
F_{k+1} \\ 
F_{k}
\end{matrix} \right]$
此项对应系数矩阵$X$

### 转换矩阵$A$

则$u_{k+1}= \left[ \begin{matrix} 
1 & 1 \\ 
1 & 0
\end{matrix} \right]u_k$
此项对应转换矩阵$A$

方阵$A$可适用特征值

### $A-λI$特征值

$A-λI = \left[ \begin{matrix} 
1-λ & 1 \\ 
1 & -λ
\end{matrix} \right] = λ^2-λ-1$

解得 $λ=\frac{1 \pm \sqrt{5}}{2}$

### $(A-λI)X=0$求解特征向量

因为
$(A-λI)X = \left[ \begin{matrix} 
1-λ & 1 \\ 
1 & -λ
\end{matrix} \right] \left[ \begin{matrix} 
λ \\ 
1
\end{matrix} \right]= λ^2-λ-1+λ-λ$

其中$λ^2-λ-1 = 0$,则$(A-λI)X=0$，因为$λ=\frac{1 \pm \sqrt{5}}{2}$，特征向量$x_1, x_2$为
$\left[ \begin{matrix} 
\frac{1 + \sqrt{5}}{2} \\ 
1
\end{matrix} \right]$ 和 $\left[ \begin{matrix} 
\frac{1 - \sqrt{5}}{2} \\ 
1
\end{matrix} \right]$

可得$u_0 = \frac{x_1-x_2}{λ_1-λ_2}(λ_1=\frac{1 + \sqrt{5}}{2}; λ_2=\frac{1 - \sqrt{5}}{2})$

### $u_{100}$ 特征值乘特征向量

$u_{100}= \frac{(λ_1)^{100}x_1-(λ_2)^{100}x_2}{λ_1-λ_2}$
即接近于$\frac{({\frac{1+\sqrt{5}}{2}})^{100}}{\sqrt{5}}$
即$\frac{1 + \sqrt{5}}{2}$
黄金比率得证。
