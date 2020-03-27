# Python

## Assertions

* Signal unrecoverable errors
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

## List comprehensions

```python
x = [i for i in range(5)]
# [0, 1, 2, 3, 4]

y = [y for y in range(10) if y%2==0]
# [0, 2, 4, 6, 8]

z = [x.int() for x in "testing 123" if x.isdigit()]
# [1, 2, 3]
```

## Example

### Reading, writing, regular expressions

```Python
import glob
from os import path
import re
from typing import List

Dir = "csse_covid_19_daily_reports"
DailyData = "daily_observations.csv"

def load_dates() -> List[str]:
    pattern = r"(\d{2}-\d{2}-\d{4}).csv"
    src = "{}/*.csv".format(Dir)
    dates = [re.findall(pattern, f)[0] for f in glob.glob(src) if re.search(pattern, f)]
    dates.sort()
    return dates

def source_path(date: str) -> str:
    return "{}/{}.csv".format(Dir, date)

def aggregate_daily_data():
    with open(DailyData, 'w') as writer:
        writer.write("Date,Province/State,Country/Region,Last Update,Confirmed,Deaths,Recovered\n")
        for date in load_dates():
            file = source_path(date)
            has_newline = True
            with open(file) as reader:
                next(reader) # Skip header
                for line in reader:
                    line = "{},{}".format(date, line) # Prepend to line
                    writer.write(line)
                    has_newline = line.endswith("\n")
            if not has_newline:
                writer.write("\n")

if not path.exists(DailyData):
    aggregate_daily_data()
    print("Created file: {}".format(DailyData))
else:
    print("File already exists: {}".format(DailyData))
```
