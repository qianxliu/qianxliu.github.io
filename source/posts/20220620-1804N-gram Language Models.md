# N-gram Language Models

We have an arbitrary sequence of m words. 

## Joint possibility

$P(w_1, w_2, ..., w_m)$

## Conditional Possibility

$P(w_1, w_2, ..., w_m)=P(w_1)P(w_2|w_1)P(w_3|w_1, w_2)...P(w_m|w_1, ..., w_{m-1})$

## Markov Assumption

A Markov chain or Markov process is a stochastic model describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous event.

$P(w_i|w_1, ..., w_{i-1})≈P(w_i|w_{i-n+1}...w_{i-1})$

### Unigram Model(n=1)

$P(w_1, w_2, ..., w_m)=\sum_{i=1}{m}P(w_i)$

### Bigram Model(n=2)

$P(w_1, w_2, ..., w_m)=\sum_{i=1}{m}P(w_i|w_{i-1})$

### Trigram Model(n=3)

$P(w_1, w_2, ..., w_m)=\sum_{i=1}{m}P(w_i|w_{i-2}w_{i-1})$
