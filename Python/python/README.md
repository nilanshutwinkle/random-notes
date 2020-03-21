# Python

## Assertions

* Single unrecoverable errors
* E.g., the following shape errors would be unrecoverable:
    ```python
    assert y.shape == (20,)
    assert X.shape == (20,1)
    assert np.isscalar(b)
    ```

## Lambdas

```python
import numpy as np
a = np.fromfunction(lambda x, y: 10*x+y, (5,4), dtype=int)
# a = array([[ 0,  1,  2,  3],
#            [10, 11, 12, 13],
#            [20, 21, 22, 23],
#            [30, 31, 32, 33],
#            [40, 41, 42, 43]])
```

## List comprehension

```python
x = [i for i in range(5)]
# [0, 1, 2, 3, 4]

y = [y for y in range(10) if y%2==0]
# [0, 2, 4, 6, 8]

z = [x.int() for x in "testing 123" if x.isdigit()]
# [1, 2, 3]
```
