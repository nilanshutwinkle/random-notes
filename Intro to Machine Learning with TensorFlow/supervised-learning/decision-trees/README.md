# Decision Trees

## 1. Intro

## 2. Recommending Apps 1

## 3. Recommending Apps 2

## 4. Recommending Apps 3

## 5. Quiz - Student Admissions

* Decision trees can be used for categorical and continuous features

## 6. Solution - Student Admissions

## 7. Entropy

* Three phases of water:
    - ice: low entropy
    - water: medium entropy
    - vapor (gas): high entropy (high freedom to move around)

* Buckets with colored balls:
    - 4 red balls: low entropy (1 way to organize balls)
    - 3 red, 1 blue balls: medium entropy (4 ways to organize balls)
    - 2 red, 2 blue balls: high entropy (6 ways to organize balls)

* Rule of thumb #1: the more rigid or homogeneous a set is, the less entropy it has

* Rule of thumb #2: the more knowledge you have about a random member of the set, the less entropy it has

## 8. Entropy Formula 1

* If you're gambling, low entropy favors the gambler

## 9. Entropy Formula 2

* For independent events (e.g., drawing a ball from a box with replacement), the probability of getting a specific sequence is the product of the independent probabilities:
    ```
    P(ABCD) = P(A) * P(B) * P(C) * P(D)
    ```

## 10. Entropy Formula 3

* To avoid products, we'll use logs, given this property of logarithms:
    ```
    log(ab) = log(a) + log(b)
    ```
* The general formula for picking `m` red balls and `n` blue balls from a box with replacement:
    ```
    Entropy = - m / (m + n) log₂(m / (m + n)) - n / (m + n) log₂(n / (m + n))
    ```

## 11. Quiz - Do you know your entropy?

* Trick:
    ```
    logₐ(x) = ln(x) / ln(a)
    ```

* What's the entropy of a bucket containing 4 red balls and 10 blue balls?
    ```
    m = 4   n = 10
    Entropy = - m / (m + n) log₂(m / (m + n)) - n / (m + n) log₂(n / (m + n))
            = - 4 / (4 + 10) log₂(4 / (4/4 + 10)) - 10 / (4+10) log₂(4/ (4+10))
            = - 2/7 log₂(2/7) - 5/7 log₂(5/7)
            = -2/7 * ln(2/7) / ln(2) - 5/7 * ln(5/7) / ln(2)
            = 0.863
    ```
## 12. Multiclass Entropy

* There's a cleaner way to define two-class entropy:
    ```
    p₁ = m / (m + n)
    p₂ = n / (m + n)
    Entropy = - p₁ log₂(p₁) - p₂ log₂(p₂)
    ```
* The general multi-class entropy definition:
    ```
    Entropy = - Σ(i=1..m) pᵢ log₂(pᵢ)
    ```
* E.g., iff we have a bucket with eight red balls, three blue balls, and two yellow balls, what is the entropy of the set of balls?
    | balls | count | probability |
    | ----- | ----- | ----------- |
    | red | 8 | 8/13 |
    | blue | 3 | 3/13 |
    | yellow | 2 | 2/13 |

    ```
    Entropy = -(8/13 log₂(8/13) + 3/13 log₂(3/13) + 2/13 log₂(2/13))
            = -(8/13 * ln(8/13) / ln(2) + 3/13 * ln(3/13) / ln(2) + 2/13 * ln(2/13) / ln(2))
            = 1.335
    ```

## 13. Quiz - Information Gain

## 14. Solution - Information Gain

* **Information gain** is the difference between the entropy of the parent and a weighted average of it's children:
    ```
    Info Gain = Entropy(parent) - [p₁ Entropy(child₁) + p₂ Entropy(child₂)]
    ```

## 15. Maximizing Information Gain

* Our algorithm:
    1. Calculate entropy for all possible remaining splits
    2. Calculate the information gain of each split, and select the one with the largest information gain
    3. For each child node, go back to step 1

## 16. Calculating Information Gain on a dataset

We want to classify insects into two imaginary categories ("Mobug" or "Lobug"), using color or length. Here's the data:

|Species|Color|Length (mm)|
|-------|-----|-----------|
|Mobug|Brown|11.6|
|Mobug|Blue|16.3|
|Lobug|Blue|15.1|
|Lobug|Green|23.7|
|Lobug|Blue|18.4|
|Lobug|Brown|17.1|
|Mobug|Brown|15.7|
|Lobug|Green|18.6|
|Lobug|Blue|22.9|
|Lobug|Blue|21.0|
|Lobug|Blue|20.5|
|Mobug|Green|21.2|
|Mobug|Brown|13.8|
|Lobug|Blue|14.5|
|Lobug|Green|24.8|
|Mobug|Brown|18.2|
|Lobug|Green|17.9|
|Lobug|Green|22.7|
|Mobug|Green|19.9|
|Mobug|Blue|14.6|
|Mobug|Blue|19.2|
|Lobug|Brown|14.1|
|Lobug|Green|18.8|
|Mobug|Blue|13.1|

Which splitting criteria provides most information gain for identifying bug type?

Step 1: What is the entropy of the parent?

| Bug | Count | pᵢ | pᵢ log₂(pᵢ) |
| --- | ----- | -- | ----------- |
| Lobug | 14 | 14/24 = 7/12 | -0.4536044209 |
| Mobug | 10 | 10/24 = 5/12 | -0.5262643358 |

```
Entropy = - Σ(i=1..m) pᵢ log₂(pᵢ)
        = 0.5262643358 + 0.4536044209
        = 0.9798687567
```

Step 2: What's the entropy if split on...?

| Split on... | Insect | count | pᵢ | pᵢ log₂(pᵢ) |
| ----------- | ------ | ----- | -- | ----------- |
| brown             | Lobug | 2  | 2/6   | -0.5283208336 |
| brown             | Mobug | 4  | 4/6   | -0.3899750005 |
| not brown         | Lobug | 12 | 12/18 | -0.3899750005 |
| not brown         | Mobug | 6  | 6/18  | -0.5283208336 |
| blue              | Lobug | 6  | 6/10  | -0.4421793565 |
| blue              | Mobug | 4  | 4/10  | -0.528771238 |
| not blue          | Lobug | 8  | 8/14  | -0.4613456697 |
| not blue          | Mobug | 6  | 6/14  | -0.5238824663 |
| green             | Lobug | 6  | 6/8   | -0.3112781245 |
| green             | Mobug | 2  | 2/8   | -0.5 |
| not green         | Lobug | 8  | 8/16  | -0.5 |
| not green         | Mobug | 8  | 8/16  | -0.5 |
| length < 17.0mm   | Lobug | 3  | 3/9   | -0.5283208336 |
| length < 17.0mm   | Mobug | 6  | 6/9   | -0.3899750005 |
| length ≥ 17.0mm   | Lobug | 11 | 11/15 | -0.3281365831 |
| length ≥ 17.0mm   | Mobug | 4  | 4/15  | -0.5085041588 |
| length < 20.0mm   | Lobug | 8  | 8/17  | -0.5117472194 |
| length < 20.0mm   | Mobug | 9  | 9/17  | -0.485755327 |
| length ≥ 20.0mm   | Lobug | 6  | 6/7   | -0.1906220754 |
| length ≥ 20.0mm   | Mobug | 1  | 1/7   | -0.4010507032 |

| Split on... | pᵢ | Entropy(childᵢ) | pᵢ Entropy(childᵢ) |
| ----------- | -- | --------------- | ------------------ |
| brown       | 6/24  | 0.9182958341   | 0.2295739585 |
| non-brown   | 18/24 | 0.9182958341   | 0.6887218756 |
| blue        | 10/24 | 0.9709505945   | 0.4045627477 |
| not blue    | 14/24 | 0.985228136    | 0.5747164127 |
| green       | 8/24  | 0.8112781245   | 0.2704260415 |
| not green   | 16/24 | 1.0            | 0.6666666667 |
| l < 17.0mm  | 9/24  | 0.9182958341   | 0.3443609378 |
| l ≥ 17.0mm  | 15/24 | 0.8366407419   | 0.5229004637 |
| l < 20.0mm  | 17/24 | 0.9975025464   | 0.7065643037 |
| l ≥ 20.0mm  | 7/24  | 0.5916727786   | 0.1725712271 |

```
Entropy = - Σ(i=1..m) pᵢ log₂(pᵢ)
Info Gain = Entropy(parent) - [p₁ Entropy(child₁) + p₂ Entropy(child₂)]
```

| Split on... | Entropy(parent) | p₁ Entropy(child₁) | p₂ Entropy(child₂) | Info Gain |
| ----------- | --------------- | ------------------ | ------------------ | --------- |
| brown       | 0.9798687567    | 0.2295739585       | 0.6887218756       | 0.0615729226 |
| blue        | 0.9798687567    | 0.4045627477       | 0.5747164127       | 0.0005895963 |
| green       | 0.9798687567    | 0.2704260415       | 0.6666666667       | 0.0427760485 |
| l < 17.0mm  | 0.9798687567    | 0.3443609378       | 0.5229004637       | 0.1126073552 |
| l < 20.0mm  | 0.9798687567    | 0.7065643037       | 0.1725712271       | 0.1007332259 |

Our first split should be on length 17.0mm.

## 17. Hyperparameters

* Hyperparameters used in decision trees:
    - Maximum depth
    - Minimum number of samples to split
    - Minimum number of samples per leaf

| Feature | May result in ... |
| Small maximum depth | Underfitting |
| Large maximum depth | Overfitting |
| Small minimum samples per split | Overfitting |
| Large minimum samples per split | Underfitting |

## 18. Decision trees in sklearn

* To use the `DecisionTreeClassifier`:
    ```python
    from sklearn.tree import DecisionTreeClassifier

    # Using default hyperparameters
    model = DecisionTreeClassifier()

    # Or specifying hyperparameters
    model = DecisionTreeClassifier(max_depth = 7, min_samples_leaf = 10)

    model.fit(x_values, y_values)
    print(model.predict([ [0.2, 0.8], [0.5, 0.4] ])) # [[ 0., 1.]]
    ```

* Commonly-used hyperparameters for `DecisionTreeClassifier`:
    - `max_depth`
    - `min_samples_leaf`
    - `min_samples_split`

* Example program:
    ```python
    # Import statements
    from sklearn.tree import DecisionTreeClassifier
    from sklearn.metrics import accuracy_score

    # Read the data...
    X = ...
    y = ...

    # Fit a decision tree
    model = DecisionTreeClassifier()
    model.fit(X, y)

    # Make predictions, using the training data X.
    y_pred = model.predict(X)

    # Calculate the accuracy
    acc = accuracy_score(y, y_pred)
    ```

## 19. Titanic Survival Model with Decision Trees

* Data that is **paired** means the features at `X.loc[i]` is associated with the label at `y.loc[i]`

* **One-hot encoding** changes categorical data to numeric data

* To one-hot encode, after dropping columns with unique values, use `pandas.get_dummies`:
    ```python
    one_hot_features = pd.get_dummies(features.drop(['Name'], axis=1))
    one_hot_features = one_hot_features.fillna(0.0)
    ```

* To split the data into training and test datasets:
    ```python
    from sklearn.model_selection import train_test_split

    X_train, X_test, y_train, y_test = train_test_split(features, outcomes, test_size=0.2, random_state=42)
    ```

```python
import numpy as np
import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

full_data = pd.read_csv('titanic_data.csv')

# Split data into features and labels
y = full_data['Survived']
X = full_data.drop('Survived', axis = 1)

# Prep data, including one-hot encoding
X = X.drop(['Name'], axis=1)
X = pd.get_dummies(X).fillna(0.0)

# Split training and test data
X_train, X_test, y_train, y_test = \
    train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = DecisionTreeClassifier(max_depth=6, min_samples_leaf=5)
model.fit(X_train, y_train)

# Make predictions
y_train_pred = model.predict(X_train)
y_test_pred = model.predict(X_test)

# Calculate the accuracy
train_accuracy = accuracy_score(y_train, y_train_pred)
test_accuracy = accuracy_score(y_test, y_test_pred)
print('The training accuracy is', train_accuracy)
print('The test accuracy is', test_accuracy)
```

## 20. [Solution] Titanic Survival Model with Decision Trees

## 21. Outro
