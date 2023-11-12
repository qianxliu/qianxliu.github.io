> 数学建模是使一个数学家化身为物理学家，生物学家，社会学家，医学家，从而有益于人类的过程。————qianxin

# SIR, Susceptible-Infected-Recovered (SIR) epidemic model

## independent and dependent variables

### independent variable

As the first step in the modeling process, we identify the independent and dependent variables. The independent variable is time t,  measured in days. We consider two related sets of dependent variables.

作为建模过程的第一步，我们确定自变量和因变量。自变量是时间 t，以天为单位。我们考虑两个相关的因变量集合。

### dependent variables

#### The first set of dependent variables

which counts people in each of the groups, each as a function of time(t):

| **S = S(t)** | is the number of susceptible individuals,  |（无法免疫的人）
| **I = I(t)** | is the number of infected individuals, and |
| **R = R(t)** | is the number of recovered individuals.    |

Strictly speaking, what we mean by "infected" is really "infectious," that is, capable of spreading the disease to a susceptible person. A "recovered" person can still feel miserable, and might even die from pneumonia later.
严格来说，我们所说的“感染者”其实是“传染性的”，也就是能够将疾病传染给易感者。“痊愈”的人仍然会感到痛苦，甚至可能在以后死于肺炎。

#### The second set of dependent variables

which represents the fraction of the total population in each of the three categories, and N is the total population.

| **s(t) = S(t)/N** | the susceptible fraction of the population,  |
| **i(t) = I(t)/N** | the infected fraction of the population, and |
| **r(t) = R(t)/N** | the recovered fraction of the population.    |

## Equations

### The Susceptible Equation

-b means immunity(one to one) fraction decrease

$$\frac{dS}{dt}=-bs(t)I(t)$$

$$\frac{ds}{dt}=-bs(t)i(t)$$

### The Recovered Equation

k means recovered(one) fraction increase

$$\frac{dR}{dt}=kI(t)$$

$$\frac{dr}{dt}=ki(t)$$

### The Infected Equation

$$\frac{ds}{dt}+\frac{di}{dt}+\frac{dr}{dt}=0$$

$$\frac{di}{dt}=bs(t)i(t)-ki(t)$$

### Initial conditions

$$s(0), i(0), r(0)$$

## Reference

- https://www.maa.org/
