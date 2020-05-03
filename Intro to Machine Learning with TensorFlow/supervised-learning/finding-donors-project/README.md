# CharityML: Finding Donors Project

## Logarithmic transformation

* **logarithmic transformation**: Significantly reduces range of data to prevent negative impact on performance of models

```python
skewed = ['capital-gain', 'capital-loss']
features_log_transformed = pd.DataFrame(data = features_raw)
features_log_transformed[skewed] = features_raw[skewed].apply(lambda x: np.log(x + 1))
```

## Normalizing numerical data

```python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler() # defaults to (0, 1)
numerical = ['age', 'education-num', 'capital-gain', 'capital-loss', 'hours-per-week']

features_log_minmax_transform = pd.DataFrame(data = features_log_transformed)
features_log_minmax_transform[numerical] = scaler.fit_transform(features_log_transformed[numerical])
```

## Naive predictor

* **naive predictor**: Purpose is to establish baseline performance of a model without intelligence.

* E.g., given unbalanced classes of data, this model could simply predict the more common class 100% of the time (e.g., does not have rare disease) and achieve high accuracy
