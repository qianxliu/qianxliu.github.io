```
tags: Tutorials
```

```python

class _BaseRidge(LinearModel, metaclass=ABCMeta):
    @abstractmethod
    @_deprecate_positional_args
    def __init__(self, alpha=1.0, *, fit_intercept=True, normalize=False,
                 copy_X=True, max_iter=None, tol=1e-3, solver="auto",
                 random_state=None):
        self.alpha = alpha
        self.fit_intercept = fit_intercept
        self.normalize = normalize
        self.copy_X = copy_X
        self.max_iter = max_iter
        self.tol = tol
        self.solver = solver
        self.random_state = random_state

    def fit(self, X, y, sample_weight=None):

        # all other solvers work at both float precision levels
        _dtype = [np.float64, np.float32]
        _accept_sparse = _get_valid_accept_sparse(sparse.issparse(X),
                                                  self.solver)
        X, y = self._validate_data(X, y,
                                   accept_sparse=_accept_sparse,
                                   dtype=_dtype,
                                   multi_output=True, y_numeric=True)
        if sparse.issparse(X) and self.fit_intercept:
            if self.solver not in ['auto', 'sparse_cg', 'sag']:
                raise ValueError(
                    "solver='{}' does not support fitting the intercept "
                    "on sparse data. Please set the solver to 'auto' or "
                    "'sparse_cg', 'sag', or set `fit_intercept=False`"
                    .format(self.solver))
            if (self.solver == 'sag' and self.max_iter is None and
                    self.tol > 1e-4):
                warnings.warn(
                    '"sag" solver requires many iterations to fit '
                    'an intercept with sparse inputs. Either set the '
                    'solver to "auto" or "sparse_cg", or set a low '
                    '"tol" and a high "max_iter" (especially if inputs are '
                    'not standardized).')
                solver = 'sag'
            else:
                solver = 'sparse_cg'
        else:
            solver = self.solver

        if sample_weight is not None:
            sample_weight = _check_sample_weight(sample_weight, X,
                                                 dtype=X.dtype)

        # when X is sparse we only remove offset from y
        X, y, X_offset, y_offset, X_scale = self._preprocess_data(
            X, y, self.fit_intercept, self.normalize, self.copy_X,
            sample_weight=sample_weight, return_mean=True)

        if solver == 'sag' and sparse.issparse(X) and self.fit_intercept:
            self.coef_, self.n_iter_, self.intercept_ = _ridge_regression(
                X, y, alpha=self.alpha, sample_weight=sample_weight,
                max_iter=self.max_iter, tol=self.tol, solver='sag',
                random_state=self.random_state, return_n_iter=True,
                return_intercept=True, check_input=False)
            # add the offset which was subtracted by _preprocess_data
            self.intercept_ += y_offset

        else:
            if sparse.issparse(X) and self.fit_intercept:
                # required to fit intercept with sparse_cg solver
                params = {'X_offset': X_offset, 'X_scale': X_scale}
            else:
                # for dense matrices or when intercept is set to 0
                params = {}

            self.coef_, self.n_iter_ = _ridge_regression(
                X, y, alpha=self.alpha, sample_weight=sample_weight,
                max_iter=self.max_iter, tol=self.tol, solver=solver,
                random_state=self.random_state, return_n_iter=True,
                return_intercept=False, check_input=False, **params)
            self._set_intercept(X_offset, y_offset, X_scale)

        return self

```

RidgeClassifier机器学习模型(和logistic(sigmoid)激励函数不同，非logistic类模型)继承于此类 _BaseRidge，在其中fix中使用的solver(即我们常说的优化器算法)为sag，即
    
```bash
    SAG stands for Stochastic Average Gradient: the gradient of the loss is
    estimated each sample at a time and the model is updated along the way with
    a constant learning rate.
```

后续会更新R语言实现的数学表示。