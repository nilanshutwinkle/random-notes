# Lesson 2: Linear Regression

## 2.1: Intro

## 2.2: Quiz - Housing Prices

## 2.3: Solution - Housing Prices

## 2.4: Fitting a Line Through Data

* Basic intuition: all the points ask the line to move closer, iteratively

## 2.5: Moving a Line

* `y = w₁ x + w₂`
    - `w₁` is the slope
    - `w₂` is the y intercept

## 2.6: Absolute Trick

* Point `(p, q)` and line `y = w₁ x + w₂`

* Too big of a step: add `1` to `w₂` and `p` to `w₁`: `y = (w₁ + p) x + (w₂ + 1)`

* Here's the **absolute trick** with **learning rate**, `α`: add `α` to `w₂` and `pα` to `w₁`:
    ```
    y = (w₁ + pα) x + (w₂ + α)
    ```
* **Important**: if the point is *below* the line, then we must subtract `p`

## 2.7: Square Trick

* Goal is to move line more if distant between point and line is greater

* Point `(p, q)`, and point on the line `(p, q')`, with distance `q - q'`

* Must find `q'`: `q' = w₁ * p + w₂`

* New formula is:
    ```
    y = (w₁ + p α (q - q')) x + (w₂ + α (q - q'))
    ```

* Takes care of the problem of when the point is above vs below the line

* So to solve using the square trick:
    1. Given `y = w₁ x + w₂`, point `(p, q)` and learning rate `α`
    2. Find `q' = w₁ * p + w₂`
    3. New line:
        ```
        y = (w₁ + p α (q - q')) x + (w₂ + α (q - q'))
        ```

* Example: given `y = 2x + 3`, point `(5, 15)`, and `α = 0.01`
    1. Find `q'`:
        ```
        q' = 2 * 5 + 3
           = 13
        ```
    2. Find new line `y`:
        ```
        y = (2 + 5 * 0.01 * (15 - 3))x + (13 + 0.01 * (15-3))
          = (2 + 5 * 2 * 0.01)x + (13 + 2 * 0.01)
          = 2.1x + 13.02
        ```

## 2.8: Quiz - Absolute and Square Trick

## 2.9: Gradient Descent

* Intuition:
    1. Draw a line
    2. Calculate error
    3. Move line
    4. Calculate error
    5. Go back to step 3

* **Error function**: weights in x axis, error in y axis. (In reality, higher dimensions.)
    - Take derivative to find the **gradient** of the error function
    - `wᵢ -> wᵢ - α ∂/∂wᵢ Error`

* **Goal**: to reach minimum error, or at least a close enough value

## 2.10: Mean Absolute Error

* Two most common functions for linear regression:
    * Mean Absolute Error
    * Mean Squared Error

* **Mean Absolute Error**: point `(x,y)` and corresponding point on line (the prediction), `(x,ŷ)`.
    - Distance is `y - ŷ`
    - `Error = (1/m) Σ(i=1..m) |y - ŷ|`

## 2.11: Mean Squared Error

* **Mean Squared Error**: `Error = (1/2m) Σ(i=1..m) (y - ŷ)²`

* Note we can multiply this by any constant, and won't have any impact on minimization; so `1/2` doesn't have impact

## 2.12: Quiz

## 2.13: Minimizing Error Functions

* Showed that the absolute trick = gradient descent with mean absolute error

* Showed that the square trick = gradient descent with mean squared error

* Recall: `wᵢ -> wᵢ - α ∂/∂wᵢ Error`
    - `∂/∂w₁ Error = -(y - ŷ)x`
    - `∂/∂w₂ Error = -(y - ŷ)`

## 2.14: Mean vs Total Squared (Absolute) Error

* **Total Squared Error**: `Error = (1/2) Σ(i=1..m) (y - ŷ)²`
    * Just the mean squared error, but without the `1/m` multiplier

* Total squared error and mean squared error are basically the same; just result in different learning rates

## 2.15: Batch vs Stochastic Gradient Descent

* Two ways of doing gradient descent:
    * **stochastic gradient descent**: applying the squared (or absolute) trick at every point in our data one by one, and repeating this process many times.
    * **batch gradient descent**: applying the squared (or absolute) trick at every point in our data all at the same time, and repeating this process many times.

* In practice, neither of these are used. Instead, split data into many small batches, called **mini-batch gradient descent**.

## 2.16: Mini-Batch Gradient Descent

* `numpy.matmul(x1, x2)`: matrix multiplication

* Steps:
    1. Calculate `ŷ`: `ŷ = w x + wb`
    1. Calculate `w`: `w -> w - α ∂/∂wᵢ Error`, or `w -> w + α (y - ŷ)x`
    1. Calculate `b`: `b -> b - α ∂/∂wᵢ Error`, or `b -> b + α (y - ŷ)`

## 2.17: Absolute Error vs Square Error

* Mean absolute error has a problem: line can move up an down vertically between points and still give same error, meaning there are multiple answers.

* However, mean squared error will yield a single answer. It's a quadratic function, and quadratic functions have a minimum in the point in the middle.

## 2.18: Linear Regression in scikit-learn

* General pattern:
    ```python
    from sklearn.linear_model import LinearRegression

    model = LinearRegression()
    model.fit(x_values, y_values)

    model.predict([ [127], [248] ]) # [[ 438.94308857, 127.14839521]]
    ```

* E.g., [notebook with linear regression predicting life expectancy based on BMI](bmi-and-life-expectancy.ipynb)

## 2.19: Higher Dimensions

* If in two dimensions (say, housing price for size and school quality), we end up fitting a plane

* What about n-dimensional space, with n-1 variables? We have a n-1 dimensional hyperplane in n dimensions, with formula:
    ```
    ŷ = w₁x₁ + w₂x₂ + ... + wᵣ₋₁xᵣ₋₁ + xᵣ
      or
    y = m₁x₁ + m₂x₂ + ... + mᵣ₋₁xᵣ₋₁ + b
    ```

## 2.20: Multiple Linear Regression

* **predictor**: (aka, **independent variable**) variable looking at to make predictions about other variables  (e.g., BMI)

```python
from sklearn.linear_model import LinearRegression
from sklearn.datasets import load_boston

# Load the data from the boston house-prices dataset
boston_data = load_boston()
x = boston_data['data']
y = boston_data['target']

# Make and fit the linear regression model
model = LinearRegression()
model.fit(x, y)

# Make a prediction using the model
sample_house = [[2.29690000e-01, 0.00000000e+00, 1.05900000e+01, 0.00000000e+00, 4.89000000e-01,
                6.32600000e+00, 5.25000000e+01, 4.35490000e+00, 4.00000000e+00, 2.77000000e+02,
                1.86000000e+01, 3.94870000e+02, 1.09700000e+01]]

prediction = model.predict(sample_house)
```

## 2.21: Closed Form Solution

* There's a closed form solution involving systems of equations, n equations for n unknowns

* Solving this requires inverting a matrix, which is computationally expensive. Hence, we use gradiant descent, which gives an approximate solution

## 2.22: (Optional) Closed Form Solution Math

## 2.23: Linear Regression Warnings

* Linear Regression Works Best When the Data is Linear
* Linear Regression is Sensitive to Outliers

## 2.24: Polynomial Regression

* E.g.,
    ```
    ŷ = w₁x³ + w₂x² + w₃x + w₄
    ```

## 2.25: Quiz: Polynomial Regression

* `PolynomialFeatures` returns a vector of coefficients p that minimizes the squared error.

```python
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

# Assign the data to predictor and outcome variables
train_data = pd.read_csv('data.csv')
X = train_data[['Var_X']].values
y = train_data['Var_Y'].values

# Create polynomial features
poly_feat = PolynomialFeatures(3)
X_poly = poly_feat.fit_transform(X)

# Make and fit the polynomial regression model
poly_model = LinearRegression()
poly_model.fit(X_poly, y)
```

## 2.26: Regularization

* The goal is to factor in the complexity of the model into the error, in order to avoid **overfitting** the training data

* **L1 Regularization**: add the absolute value of the coefficients to the error

* **L2 Regularization**: add the squares of the coefficients

* λ parameter: if value is high, will "punish complexity"

| L1 Regularization | L2 Regularization |
| ----------------- | ----------------- |
| Computationally inefficient (unless data sparse) | Computationally efficient |
| Good for sparse outputs | Good for non-sparse outputs |
| Feature selection | No feature selection |

* Regarding "feature selection", L1 regularization is making irrelevant columns (mostly noise) zeros

## 2.27: Quiz - Regularization

```python
import numpy as np
from sklearn.linear_model import Lasso

# Assign the data to predictor and outcome variables
train_data = np.loadtxt('data.csv', delimiter = ',')
X = train_data[:, 0:6]
y = train_data[:, 6]

lasso_reg = Lasso()
lasso_reg.fit(X, y)

reg_coef = lasso_reg.coef_
print(reg_coef)
```

## 2.28: Feature Scaling

* **Feature scaling**: converting data into common range of values.

* **Standardizing**: for each value, subtract mean and divide by standard deviation. E.g.,
    ```python
    df["height_standard"] = (df["height"] - df["height"].mean()) / df["height"].std()
    ```

* **Normalizing**: data scaled between 0 and 1. E.g.,
    ```python
    df["height_normal"] = (df["height"] - df["height"].min()) /     \
                          (df["height"].max() - df['height'].min())
    ```

* Feature scaling important because:
    - Using **distance-based metrics** (e.g., SVM or k-nearest neighbors), as not scaling will lead to different results.
    - When using regularization, if features aren't scaled, then applying regularization will unfairly punish values with small range.
    - Can speed up convergence of machine learning algorithms

```python
import numpy as np
from sklearn.linear_model import Lasso
from sklearn.preprocessing import StandardScaler

# Assign the data to predictor and outcome variables
train_data = np.loadtxt('data.csv', delimiter = ',')
X = train_data[:, 0:6]
y = train_data[:, 6]

scaler = StandardScaler()
scaler.fit(X)
X_scaled = scaler.transform(X)

lasso_reg = Lasso()
lasso_reg.fit(X_scaled, y)

reg_coef = lasso_reg.coef_
print(reg_coef)
```

## 2.29: Outro
