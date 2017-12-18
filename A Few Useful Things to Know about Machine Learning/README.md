# A Few Useful Things to Know about Machine Learning

Pedro Domingos

## 2: Learning = Representation + Evaluation + Optimization
* **Representation**: the formal language that the computer can handle. Limits the set of classifiers that can possibly learn.
    - E.g., K-nearest neighbors, Support vector machines, Naive Bayes, Logistic regression, Decision trees, Neural networks, etc.
* **Evaluation**: the evaluation function is needed to distinguish good classifiers from bad ones.
    - E.g., Precision and recall, Squared error, Posterior probability, Information gain, etc.
* **Optimization**: method to search among the classifiers in the language for the highest-scoring one.
    - E.g., Greedy search, Gradient descent, etc.
* Discrete representations go with combinatorial optimization; continuous ones with continuous optimization.
* No simple recipe for choosing each component.

## 3: It's Generalization That Counts
* Most common mistake among ML beginners is to test on the training data and have illusion of success.
* **Cross-validation**: randomly dividing data into say ten subsets, holding out each one while training on the rest, and averaging results

## 4: Data Alone is Not Enough
* Wolpert's "no free lunch theorems": no learner can beat random guessing over all possible functions to be learned.

## 5: Overfitting has Many Faces
* **Variance** (spread) vs **bias** (accuracy)
* Strong false assumptions can be better than weak true ones, since the latter requires more data.
* Adding a **regularization term** to evaluation function can also combat overfitting.
* The opposite of overfitting (variance) is underfitting (bias), and there is no single technique that will always balance the two the best.

## 6: Intuition Fails in High Dimensions
* **Curse of dimensionality**: generalizing correctly becomes exponentially hard as dimensionality grows, as a fixed-size training set covers a dwindling fraction of input space.
* Similarity-based reasoning that ML algorithms depend on break down in high dimensions; the noise from other features swamps the signal.
* The benefit of additional features may be outweighed by the curse of dimensionality.
* Algorithms for explicitly reducing dimensionality can be used.

## 8: Feature Engineering is the Key
* One of the holy grails of ML is to automate more and more of the feature engineering process. Sometimes done by generating large number of features and pruning based on information gain, but this can miss features that are relevant in combination.

## 9: More Data Beats a Cleverer Algorithm
* Quickest path to success is often to just get more data.
* Very different frontiers (functions) can yield similar class predictions; powerful learners can be unstable but still accurate. The effect is even stronger in high dimensions.
* Try simplest learners first.
* Naive Bayes asymptotes at around 70%.
* Greedy search falls into local optima.
* Human effort saved and insight gained are often most important outcomes.

## 10: Learn Many Models, Not Just One
* Best learner varies from application to application.
* Instead of selecting best variation fund, combine many variations, and the result are better--often much better
* **Model ensembles** are now the standard.
    - **Bagging**: generate random variations of the training set by resampling, learner classifier on each, combine results by voting. (Greatly reduces variance while only slightly increasing bias.)
    - **Boosting**: using weights to correct examples that previous classifiers got wrong.
    - **Stacking**: Outputs of individual classifiers are inputs to "higher-level" learners, which figures out how to combine them.

## 12: Representable Does Not Imply Learnable
* Given finite data, time, and memory, standard learners can learn only tiny subset of all possible functions, and these subsets are different for learners with different representations.
* It pays to try different learners.

## 13: Correlation Does Not Imply Causation
* Short of doing an experiment, its difficult to tell whether correlation is causation.
* Goal is to predict the effects of our actions, not just corrections between observable variables. If you can obtain experimental data, then by all means do so.
