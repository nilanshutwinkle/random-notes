# Python

## Assertions

* Single unrecoverable errors
* E.g., the following shape errors would be unrecoverable:
    ```
    assert y.shape == (20,)
    assert X.shape == (20,1)
    assert np.isscalar(b)
    ```

## Lambdas

```
import numpy as np
a = np.fromfunction(lambda x, y: 10*x+y, (5,4), dtype=int)
# a = array([[ 0,  1,  2,  3],
             [10, 11, 12, 13],
             [20, 21, 22, 23],
             [30, 31, 32, 33],
             [40, 41, 42, 43]])
```
