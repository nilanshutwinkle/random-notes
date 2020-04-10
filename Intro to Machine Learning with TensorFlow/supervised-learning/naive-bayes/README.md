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

* **ham**: a message that's not "spam"

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

## 12. Naive Bayes Algorithm 2

Say `P(spam|'easy','money')` = 1/12, and `P(ham|'easy','money')` = 1/40.

How do you make the probabilities add up to one? You divide each by the sum of both:

```
P(spam|'easy','money')  = (1/12) / (1/12 + 1/40)
                        = (1/12) / (40/480 + 12/480)
                        = (1/12) / (52/480)
                        = (1) / (52/40)     # multiply numerator & denominator by 12
                        = 40 / 52
                        = 10/13

P(ham|'easy','money')   = (1/40) / (1/12 + 1/40)
                        = (1/40) / (52/480)
                        = (1) / (52/12)     # multiply numerator & denominator by 40
                        = 12/52
                        = 3/13
```

The **Naive Bayes Algorithm**. Given want to find `P(spam|'easy','money',...,'cheap')` and `P(ham|'easy','money',...,'cheap')`:

1. Apply Bayes Rule:
    ```
    P(spam|'easy','money',...,'cheap')
        = P('easy','money',...,'cheap'|spam) P(spam) / P('easy','money',...,'cheap')
    ```
1. Drop the numerator; now it's just a proportion:
    ```
    P(spam|'easy','money',...,'cheap') ∝ P('easy','money',...,'cheap'|spam) P(spam)
    ```
1. Apply naive assumption of independence to break into simple factors:
    ```
    P(spam|'easy','money',...,'cheap') ∝ P('easy'|spam) P('money'|spam) ... P('cheap'|spam) P(spam)
    ```
1. Calculate the probabilities for both `P(spam|'easy','money',...,'cheap')` and `P(ham|'easy','money',...,'cheap')`
1. The above probabilities will not add to 1; normalize probabilities to add to 1.

## 13. Quiz: Bayes Rule

Q: Suppose you have a bag with three standard 6-sided dice with face values [1,2,3,4,5,6] and two non-standard 6-sided dice with face values [2,3,3,4,4,5]. Someone draws a die from the bag, rolls it, and announces it was a 3. What is the probability that the die that was rolled was a standard die?

A: Given we want to find `P(standard|roll 3)` and `P(non-standard|roll 3)`:

1. Apply Bayes Rule:
    ```
    P(standard|roll 3) = P(roll 3|standard) P(standard) / P(roll 3)

    P(non-standard|roll 3) = P(roll 3|non-standard) P(non-standard) / P(roll 3)
    ```
1. Drop the numerator; now it's just a proportion:
    ```
    P(standard|roll 3) ∝ P(roll 3|standard) P(standard)

    P(non-standard|roll 3) ∝ P(roll 3|non-standard) P(non-standard)
    ```
1. Apply naive assumption of independence to break into simple factors. (Nothing to do, as already have simplest possible factors)
1. Calculate the probabilities for both `P(standard|roll 3)` and `P(non-standard|roll 3)`:
    ```
    P(standard|roll 3)  ∝ P(roll 3|standard) P(standard)
                        ∝ (1/6) (3/5)
                        ∝ 3/30

    P(non-standard|roll 3)  ∝ P(roll 3|non-standard) P(non-standard)
                            ∝ (1/3) (2/5)
                            ∝ 2/15
    ```
1. The above probabilities will not add to 1; normalize probabilities to add to 1:
    ```
    P(standard|roll 3)  = (3/30) / (3/30 + 2/15)
                        = (3/30) / (7/30)
                        = 3/7
    P(non-standard|roll 3)  = (2/15) / (7/30)
                            = (4/30) / (7/30)
                            = 4/7
    ```

## 14. Practice Project: Building a spam classifier

## 15. Spam Classifier - Workspace

* **Bag of Words (BoW)**: count the frequency of the words in given text

* Creating a bag of words using [sklearn.feature_extraction.text.CountVectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.CountVectorizer.html#sklearn.feature_extraction.text.CountVectorizer):
    ```python
    import pandas as pd
    from sklearn.feature_extraction.text import CountVectorizer

    documents = ... # [[string]]

    count_vector = CountVectorizer()
    count_vector.fit(documents)
    doc_array = count_vector.transform(documents).toarray() # [[b]], where b ∈ {0, 1}

    frequency_matrix = pd.DataFrame(doc_array)
    frequency_matrix.columns = count_vector.get_feature_names()

    frequency_matrix.head()

    #   are	call	from	hello	home	how	me	money	now	tomorrow	win	you
    #0	1	0	0	1	0	1	0	0	0	0	0	1
    #1	0	0	1	0	1	0	0	1	0	0	2	0
    #2	0	1	0	0	0	0	1	0	1	0	0	0
    #3	0	1	0	2	0	0	0	0	0	1	0	1
    ```

* The **multinomial Naive Bayes** algorithm is suitable for classification with discrete features (such as word counts for text classification), whereas the **Gaussian Naive Bayes** is better suited for continuous data as it assumes that the input data has a Gaussian (normal) distribution.

* Model performance evaluation metrics:
    - **Accuracy** is the ratio of the number of correct predictions to the total number of predictions.
    - **Precision** is the ratio of true positives to all positives.
    - **Recall (sensitivity)** is the ratio of true positives to all the words that were positives (true positives + false negatives)
    - **F1 score** is the weighted average of the precision and recall

* Using `sklearn.naive_bayes.MultinomialNB`:
    ```python
    from sklearn.naive_bayes import MultinomialNB
    from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

    naive_bayes = MultinomialNB()
    naive_bayes.fit(training_data, y_train)
    predictions = naive_bayes.predict(testing_data)

    print('Accuracy score: ', format(accuracy_score(predictions, y_test)))
    print('Precision score: ', format(precision_score(predictions, y_test)))
    print('Recall score: ', format(recall_score(predictions, y_test)))
    print('F1 score: ', format(f1_score(predictions, y_test)))
    ```
