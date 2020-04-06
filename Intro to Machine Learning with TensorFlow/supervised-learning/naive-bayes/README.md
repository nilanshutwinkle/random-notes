# Naive Bayes

## 1. Intro

* Probabilistic algorithm based on conditional probability
* Easy to implement and fast to train

## 2. Guess the Person

Say we work with Alex and Brenda. Someone walks past us, but we don't know who it is. Can we infer?

Say Alex and Brenda work same number of hours each week. Our **prior** will be:

|       | P(Alex) | P(Brenda) |
| ----- | ------- | --------- |
| **Prior** | 0.5     | 0.5       |

However, say we noticed that the person was wearing a red sweater. Alex typically wears a red sweater twice a week, and Brenda wears one three times a week. We now have a **posterior**:

|       | P(Alex) | P(Brenda) |
| ----- | ------- | --------- |
| **Prior** | 0.5     | 0.5       |
| **Posterior** | 0.4 | 0.6       |

## 3. Known and Inferred

* Bayes Theorem goes from the known to the inferred. E.g.,

| Known | Inferred |
| ----- | -------- |
| P(Alex) = 0.5<br><br> P(wears red\|Alex) = 0.4 | P(Alex\|wears red) |
| P(Brenda) = 0.5<br><br> P(wears red\|Brenda) = 0.6 | P(Brenda\|wears red) |

* In general, Bayes Theorem enables us to infer:

| Known | Inferred |
| ----- | -------- |
| P(A)<br><br>P(R\|A) | P(A\|R) |

## 4. Guess the Person Now

## 5. Bayes Theorem

* Given two events, `A` and `B`, along with `R`:
    ```
    Given:
        P(A ∩ B) = P(A) P(R|A)
        P(B ∩ B) = P(B) P(R|A)

    P(A|R) = P(A) P(R|A) / [P(A) P(R|A) + P(B) P(R|B)]
           = P(A) P(R|A) / P(R)
    ```

## 6. Quiz: False Positives

Given test that is 99% accurate, and illness with 1 out of 10,000 people being sick. Odds of being sick if positive?

```
P(S|Positive) = P(Sick) P(Positive|Sick) / P(Positive)
                 = .0001 * .99 / P(Positive)
```

What's `P(Positive)`?:

```
P(Positive) = P(Positive|Sick) * P(Sick) + P(Positive|Not Sick) * P(Not Sick)
            = .99 * .0001 + .01 * .9999

P(Sick|Positive) = .0001 * .99  / (.99 * .0001 + .01 * .9999)
                 = 0.009803921569
```

## 7. Solution: False Positives

## 8. Bayesian Learning 1

## 9. Bayesian Learning 2

Say:

```
P('easy'|spam) = 1/3
P('money'|spam) = 2/3
```

Can infer `P(spam|"easy")` and `P(spam|"money")`.

## 10. Bayesian Learning 3

## 11. Naive Bayes Algorithm 1

* Why is it called "naive"?
    - `P(A ∩ B) = P(A)P(B)` only true if independent
    - `P(A|B) P(B) = P(B|A) P(A)`, but we can ignore `P(B)` and say `P(A|B) ∝ P(B|A) P(A)`

* We want to find `P(spam |'easy','money')`
    ```
    P(spam|'easy','money')
        ∝ P('easy','money'|spam) P(spam)
        ∝ P('easy'|spam) P('money'|spam) P(spam)
    ```

* And ditto for `P(ham|'easy','money')`
