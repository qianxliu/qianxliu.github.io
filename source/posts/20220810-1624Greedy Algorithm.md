# Greedy Algorithm

A greedy algorithm is any algorithm that follows the problem-solving heuristic of making the locally optimal choice at each stage. 
In many problems, a greedy strategy does not produce an optimal solution, but a greedy heuristic can yield locally optimal solutions that approximate a globally optimal solution in a <b>reasonable amount of time</b>. 

For example, a greedy strategy for the travelling salesman problem (which is of high computational complexity) is the following heuristic: "At each step of the journey, visit the nearest unvisited city." This heuristic does not intend to find the best solution, but it terminates in a reasonable number of steps; finding an optimal solution to such a complex problem typically requires unreasonably many steps. In mathematical optimization, greedy algorithms optimally solve combinatorial problems having the properties of matroids and give constant-factor approximations to optimization problems with the submodular structure. 

## Specifics

Greedy algorithms produce good solutions on some mathematical problems, but not on others. Most problems for which they work will have two properties: 

### Greedy choice property

A <b>locally</b> optimal solutions would never reconsiders its choices. This is the main difference from dynamic programming, which is exhaustive and is guaranteed to find the solution. <b>On every stage</b>, dynamic programming makes decision based on all the decisions made in the previous stage and may reconsider the previous stage's algorithmic path to the solution.

### Optimal substructure

"A problem exhibits optimal substructure if an optimal solution to the problem contains optimal solutions to the sub-problems." Please see dynamic program in Math.

Greedy may produce the unique worst possible result in cases of failure. 

![](https://img2022.cnblogs.com/blog/2051127/202208/2051127-20220810162703142-1143012062.png)

![](看算法导论)


## Theory

Greedy heuristics are known to produce sub-optimal results on many problems.

### Matroids

A matroid is a mathmatical structure that generalizes the notion of linear independence from vector spaces to arbitrary(任意) sets. If an optimization problem has the structure of a matroid, then the appropriate greedy algorithm will solve it optimally.

### Submodular functions

A function $f$ defined on subsets of a set $\Omega$ is called submodular if for every $S,T \subseteq \Omega$ we have that $f(S)+f(T) \ge f(S\cup T)+f(S \cap T)$.

In mathematics, a <b>submodular set function</b> (also known as a <b>submodular function</b>) is a set function whose value, informally, has the property that the difference in the incremental value of the function that a single element makes when added to and input set decreases as the size of the input set increases.

Submodular functions have a natural diminishing returns property which makes them suitable for many applications, including approximation algorithms, game theory(as functions modeling user preferences) and electrical networks. Recently, submodular functions have also found immense utility in serveral real world problems in machine learning and artifical intelligence, including automatic summarization, multi-document summarization, feature selection, active learning, sensor placement, image collection summarization and many other domains.

#### Example

Suppose one wants to find a set $S$ which maximizes $f$. The greedy algorithm, which builds up a set $S$ by incrementally adding the element which increases $f$ the most at each step, produces as output a set that is at least $(1-1/e)\max_{X\subseteq \Omega}f(X)$. That is, greedy performs within a constant factor of $(1-1/e)\approx 0.63$ as good as the optimal solution.

Similar guarantees are provable when additional constraints, such as cardinality constraints, are imposed on the output, though often slight variations on the greedy algorithm are required. 
