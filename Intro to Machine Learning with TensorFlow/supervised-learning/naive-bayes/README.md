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
