# Python

## Assertions

* Single unrecoverable errors
* E.g., the following shape errors would be unrecoverable:
    ```
    assert y.shape == (20,)
    assert X.shape == (20,1)
    assert np.isscalar(b)
    ```
