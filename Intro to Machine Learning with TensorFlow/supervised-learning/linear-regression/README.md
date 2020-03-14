# Lesson 2: Linear Regression

## 2.1: Intro

## 2.2: Quiz - Housing Prices

## 2.3: Solution - Housing Prices

## 2.4: Fitting a Line Through Data

* Basic intuition: all the points ask the line to move closer, iteratively

## 2.5: Moving a Line

* `y = w1 x + w2`
    - `w1` is the slope
    - `w2` is the y intercept

## 2.6: Absolute Trick

* Point `(p, q)` and line `y = w1 x + w2`

* Too big of a step: add `1` to `w2` and `p` to `w1`: `y = (w1 + p) x + (w2 + 1)`

* Here's the **absolute trick** with **learning rate**, `α`: add `α` to `w2` and `pα` to `w1`:
    ```
    y = (w1 + pα) x + (w2 + α)
    ```
* **Important**: if the point is *below* the line, then we must subtract `p`

## 2.7: Square Trick

* Goal is to move line more if distant between point and line is greater

* Point `(p, q)`, and point on the line `(p, q')`, with distance `q - q'`

* Must find `q'`: `q' = w1 * p + w2`

* New formula is:
    ```
    y = (w1 + p α (q - q')) x + (w2 + α (q - q'))
    ```

* Takes care of the problem of when the point is above vs below the line

* So to solve using the square trick:
    1. Given `y = w1 x + w2`, point `(p, q)` and learning rate `α`
    2. Find `q' = w1 * p + w2`
    3. New line:
        ```
        y = (w1 + p α (q - q')) x + (w2 + α (q - q'))
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
