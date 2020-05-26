# Training Neural Networks

## 1. Instructor

## 2. Training Optimization

## 3. Testing

* Recap: choosing a better model by splitting data into training and testing data

## 4. Overfitting and Underfitting

* With neural networks, overfitting (larger network) is better than underfitting (smaller network); we'll find techniques that will help us deal with overfitting

## 5. Early Stopping

* **model complexity graph**: graphing the error (y-axis) for both training and testing against the model complexity (x-axis; e.g., number of epochs for NN).
    ![](images/model-complexity-graph-1.png)

* See how this neural network identifies a sweet spot between underfitting and overfitting (right before the testing error starts to increase):
    ![](images/model-complexity-graph-2.png)

* **early stopping**: training the neural network up until the testing error starts to increase

## 6. Regularization

## 7. Regularization 2

* Even for equations that are scalar multiples, formula with larger coefficients give smaller errors:
    ![](images/regularization-1.png)

* However, smaller isn't always better! It seems like this model may be overfitting.

* It's harder to do gradient descent on models with very narrow error:
    ![](images/regularization-2.png)

* Bad models can be very certain, whereas good models full of doubt.
    - Kind of similar to people, right?
    - "The fundamental cause of the trouble is that in the modern world the stupid are cocksure while the intelligent are full of doubt." - Bertrand Russel, "The Triumph of Stupidity"

* The idea is to add a new term to our error function that penalizes larger coefficients:
    ![](images/regularization-3.png)

* **λ**: small letter lambda

* **L1 regularization**: adding λ(|w₁| + ... + |wᵢ|) term to error function
    - Good for feature selection, as tends to lead towards sparse matrix, e.g., (1, 0, 0, 1, 0)

* **L2 regularization**: adding λ(w₁² + ... + wᵢ²) term to error function
    - Normally better for training models

## 8. Dropout

## 9. Local Minima

## 10. Random Restart

## 11. Vanishing Gradient

## 12. Other Activation Functions

## 13. Batch vs Stochastic Gradient Descent

## 14. Learning Rate Decay

## 15. Momentum

## 16. Error Functions Around the World
