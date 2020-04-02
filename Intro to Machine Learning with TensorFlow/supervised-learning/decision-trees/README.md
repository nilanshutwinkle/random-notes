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
    Entropy = - m / (m - n) log₂(m / (m + n)) - n / (m + n) log₂(n / (m + n))
    ```

## 11. Quiz - Do you know your entropy?
