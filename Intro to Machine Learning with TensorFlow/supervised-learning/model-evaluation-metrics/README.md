# Model Evaluation Metrics

## 1. Intro

* Two question we want to answer:
    1. How well is our model doing?
    2. How do we improve our model?

## 2. Outline

## 3. Testing your models

* Splitting data into training and testing sets

* Overfit models may have less error on the training data, but they generalize poorly and have more error error on testing data

* Thou shalt never use your testing data for training

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
# sklearn 0.18 and later:
#   from sklearn.model_selection import train_test_split
from sklearn.cross_validation import train_test_split
import pandas as pd
import numpy as np

data = np.asarray(pd.read_csv('data.csv', header=None))

X = data[:,0:2]
y = data[:,2]

X_train, X_test, y_train, y_test = \
    train_test_split(X, y, test_size = 0.25, random_state = 42)

model = DecisionTreeClassifier()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

acc = accuracy_score(y_test, y_pred)
print(acc)
```

## 4. Confusion matrix

## 5. Confusion matrix 2

## 6. Accuracy

## 7. Accuracy 2

## 8. When accuracy won't work

## 9. False Negatives and Positives

## 10. Precision and Recall

## 11. Precision

## 12. Recall

## 13. F1 Score

## 14. F-beta Score

## 15. ROC Curve

## 16. Sklearn Practice (Classification)

## 17. Regression Metrics

## 18. Sklearn Practice (Regression)

## 19. Text: Recap

## 20. Summary
