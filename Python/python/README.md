# Python

## Assertions

* Signal unrecoverable errors
* E.g., the following shape errors would be unrecoverable:
    ```python
    assert y.shape == (20,)
    assert X.shape == (20,1)
    assert np.isscalar(b)
    ```

## Files

### Globbing

```python
import glob

files = glob.glob("data/*.csv")
```

### Files

```python
from os import path

if path.exists(file):
    process(file)
```

### Reading file

```python
with open(file, 'r') as reader:
    next(reader) # Skip line
    for line in reader: # Read remaining lines
        print(line)
```

### Writing file

```python
with open(file, 'w') as writer:
    writer.write(str) # Doesn't automatically add newline
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

## List comprehensions

```python
x = [i for i in range(5)]
# [0, 1, 2, 3, 4]

y = [y for y in range(10) if y%2==0]
# [0, 2, 4, 6, 8]

z = [x.int() for x in "testing 123" if x.isdigit()]
# [1, 2, 3]
```

## Regular expressions

```python
import re

pattern = r"(\d{2}-\d{2}-\d{4}).csv"
dates = [re.findall(pattern, f)[0] for f in files if re.search(pattern, f)]
```

## Type hints

```python
from typing import List

def load_data(file_name: str) -> List[str]:
    pass
```

## Examples

* [collate_covid19_daily_observation_summaries.py](collate_covid19_daily_observation_summaries.py): regex, globbing, file I/O, type hints, list comprehensions.
