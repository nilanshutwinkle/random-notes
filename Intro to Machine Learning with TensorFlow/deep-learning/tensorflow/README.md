# Deep Learning with TensorFlow

## 1. Welcome!

* **transfer learning**: using pre-trained networks to improve the performance of your models

## 2. Pre-Notebooks

## 3. Notebooks

## 4. Introduction to TensorFlow

* Going to use TensorFlow version `tensorflow-gpu=2.0.0b1`

* Recap of neural networks:
    ![](images/simple_neuron.png)

* **tensors**: an n-dimensional array. This is a generalization of vectors and matrices.

## 5. Single Layer Neural Network

* In TensorFlow, tensors are `tf.Tensor` objects

* Creating a single-layer neural network:
    ```python
    tf.random.set_seed(7)

    # Create 5 random input features
    #   1 row, 5 columns
    features = tf.random.normal((1, 5))
    weights = tf.random.normal((1, 5))
    bias = tf.random.normal((1, 1))

    def sigmoid_activation(x):
        return 1/(1 + tf.exp(-x))

    # Element-wise solution. NOT efficient.
    #   We really want tf.matmul()
    h = tf.reduce_sum(tf.multiply(features, weights)) + bias
    y = sigmoid_activation(h)

    # Matrix solution. GPU accelerated.
    #   Note there's also a transpose_a parameter.
    h = tf.matmul(features, weights, transpose_b = True) + bias
    y = sigmoid_activation(h)
    ```

## 6. Multi-Layer Neural Network

* Matrix representation of multi-layer neural network:
    ![](images/multilayer-network-01.png)
    ![](images/multilayer-network-02.png)
    ![](images/multilayer-network-03.png)

* Calcuting output of multi-layer neural network with TensorFlow:
    ```python
    # Set the random seed so things are reproducible
    tf.random.set_seed(7)

    features = tf.random.normal((1,3))

    # hyperparameters (size of our network)
    n_input = features.shape[1]
    n_hidden = 2
    n_output = 1

    # weights
    W1 = tf.random.normal((n_input,n_hidden))
    W2 = tf.random.normal((n_hidden, n_output))

    # biases
    B1 = tf.random.normal((1,n_hidden))
    B2 = tf.random.normal((1, n_output))

    # (1,3) . (3,2) + (1,2)
    h1 = tf.matmul(features, W1) + B1
    # (1,2)
    y1 = sigmoid_activation(h1)
    # (1,2) . (2,1) + (1,1)
    h2 = tf.matmul(y1, W2) + B2
    # (1, 1)
    output = sigmoid_activation(h2)

    print(output)
    ```

## 7. NumPy to TF and back

```python
tf.random.set_seed(7)

# numpy array
a = np.random.rand(4,3)

# convert to TensorFlow
b = tf.convert_to_tensor(a)

# convert back to TensorFlow
c = b.numpy()

# doesn't impact a or c
b = b * 40

# doesn't impact b or c
a = a + 1
```

## 8. MNIST

* **Keras**: an interface for TensorFlow (and other libraries) for working with deep neural networks

* **`tensorflow_datasets`** contains a [bunch of different datasets](https://www.tensorflow.org/datasets/catalog/overview), including the MNIST dataset

* `tqdm` is a progress bar library used by `tensorflow_databases`

* **MNIST dataset**: dataset containing 28x28 pixel images of handwritten digits

* Loading MNIST dataset and viewing useful metadata:
    ```python
    training_set, dataset_info = tfds.load('mnist', split = 'train', as_supervised = True, with_info = True)

    # 10
    num_classes = dataset_info.features['label'].num_classes
    print('There are {:,} classes in our dataset'.format(num_classes))

    # 60,000
    num_training_examples = dataset_info.splits['train'].num_examples
    print('\nThere are {:,} images in the training set'.format(num_training_examples))

    for image, label in training_set.take(1):
        print('The images in the training set have:')
        print('\u2022 dtype:', image.dtype) # <dtype: 'uint8'>
        print('\u2022 shape:', image.shape) # (28, 28, 1)

        print('\nThe labels of the images have:')
        print('\u2022 dtype:', label.dtype) # <dtype: 'int64'>
    ```

* Rendering MNIST images:
    ```python
    for image, label in training_set.take(1):
        # squeeze converts from (28, 28, 1) -> (28, 28)
        #   as it remove single dimensional entries from array
        image = image.numpy().squeeze()
        label = label.numpy()

    plt.imshow(image, cmap = plt.cm.binary)
    plt.colorbar()
    plt.show()

    print('The label of this image is:', label)
    ```

## 9. Creating Pipelines

* Example pipeline:
    ```python
    def normalize(image, label):
        image = tf.cast(image, tf.float32)
        image /= 255
        return image, label

    batch_size = 64

    training_batches = training_set.cache()
        .shuffle(num_training_examples//4)
        .batch(batch_size)
        .map(normalize)
        .prefetch(1)

    for image_batch, label_batch in training_batches.take(1):
        # do something with image & label
    ```

* Useful resources:
    - [Better performance with the tf.data API](https://www.tensorflow.org/guide/data_performance)
    - [Dataset methods](https://www.tensorflow.org/api_docs/python/tf/data/Dataset#methods_2)

## 10. Implementing Softmax

* **flattening**: converting a multidimensional array (e.g., 28x28 pixel image) to a one-dimensional array (e.g., 784 pixel array)

* **dense network**: a network that is fully connected

* Getting output (without final activation function):
    ```python
    def activation(x):
        return 1/(1+tf.exp(x))

    # (64, 784)
    inputs = tf.reshape(images, [images.shape[0], -1])

    w1 = tf.random.normal((784,256))
    b1 = tf.random.normal((1,256))

    w2 = tf.random.normal((256,10))
    b2 = tf.random.normal((1,10))

    # (64, 784) . (784, 256) + (1, 256) = (64, 256)
    h = activation(tf.matmul(inputs, w1) + b1)

    # (64, 256) . (256, 10) + (1, 10) = (64, 10)
    output = tf.matmul(h, w2) + b2
    ```

* Now, applying softmax activation function:
    ```python
    # (64, 10) -> (64, 10)
    def softmax(x):
        # (64, 10) / (64, 1) = (64, 10)
        return tf.exp(x) / tf.reduce_sum(tf.exp(x), axis = 1, keepdims = True)

    # (64, 10)
    probabilities = softmax(output)
    ```

## 11. Neural Networks with TensorFlow

* The same as above, but with Keras:
    ```python
    model = tf.keras.Sequential([
        # input layer
        tf.keras.layers.Flatten(input_shape = (28,28,1)),
        # hidden layer
        tf.keras.layers.Dense(256, activation = 'sigmoid'),
        # output layer
        tf.keras.layers.Dense(10, activation = 'softmax')
    ])
    ```

* Note that each layer (besides input layer) have shape inference

* **Exercise**. Build the following network:
    ![](images/keras-exercise-1.png)
    ```python
    my_model_1 = tf.keras.Sequential([
        tf.keras.layers.Flatten(input_shape = (28,28,1)),
        tf.keras.layers.Dense(128, activation = 'relu'),
        tf.keras.layers.Dense(64, activation = 'relu'),
        tf.keras.layers.Dense(10, activation = 'softmax')
    ])

    my_model_1.summary()
    ```

* Some activation functions:
    ![](images/activation-functions-01.png)

## 12. Looking at Weights and Biases

* Note Keras automatically attaches weights and biases to layers

* To retrieve weights and biases for a layer:
    ```python
    # first input layer:
    weights = model.get_layer(index=1).get_weights()[0]
    biases = model.get_layer(index=1).get_weights()[1]
    ```

## 13. Making Predictions

```python
for image_batch, label_batch in training_batches.take(1):
    ps = model.predict(image_batch)
    first_image = image_batch.numpy().squeeze()[0]
```

## 14. Subclassing

* For fully customizable models, need to subclass the `ts.keras.Model` class. E.g.,
    ```python
    class Network(tf.keras.Model):
        def __init__(self, num_classes = 2):
            super().__init__()
            self.num_classes = num_classes

            # Define layers
            self.input_layer = tf.keras.layers.Flatten()
            self.hidden_layer = tf.keras.layers.Dense(256, activation = 'relu')
            self.output_layer = tf.keras.layers.Dense(self.num_classes, activation = 'softmax')

        # Define forward Pass   
        def call(self, input_tensor):
            x = self.input_layer(input_tensor)
            x = self.hidden_layer(x)
            x = self.output_layer(x)

            return x

    subclassed_model = Network(10)

    # initialize model params (weights and biases)
    subclassed_model.build((None, 28, 28, 1))

    subclassed_model.summary()
    ```

* **Exercise**. Create the following network using subclassing:
    ![](images/keras-exercise-2.png)
    ```python
    class Network(tf.keras.Model):
        def __init__(self, num_classes = 2):
            super().__init__()
            self.num_classes = num_classes

            # layers
            self.input_layer = tf.keras.layers.Flatten()
            self.hidden_layer_1 = tf.keras.layers.Dense(128, activation = 'relu')
            self.hidden_layer_2 = tf.keras.layers.Dense(64, activation = 'relu')
            self.output_layer = tf.keras.layers.Dense(self.num_classes, activation = 'softmax')

        def call(self, input_tensor):
            x = self.input_layer(input_tensor)
            x = self.hidden_layer_1(x)
            x = self.hidden_layer_2(x)
            x = self.output_layer(x)

    my_model_2 = Network(10)
    my_model_2.build((None, 28, 28, 1))
    my_model_2.summary()

    w1 = my_model_2.hidden_layer_1.get_weights()[0]
    b1 = my_model_2.hidden_layer_1.get_weights()[1]

    print('\nThis layer has a total of {:,} weights and {:,} biases'.format(w1.size, b1.size))
    ```

## 15. Adding Layers with .add

```python
from tensorflow.keras.layers import Flatten, Dense

layer_neurons = [512, 256, 128, 56, 28, 14]

model = tf.keras.Sequential()
model.add(Flatten(input_shape = (28,28,1)))

for neurons in layer_neurons:
    model.add(Dense(neurons, activation='relu'))

model.add(Dense(10, activation='softmax'))

model.summary()          
```

## 16. Clearing the Graph

```python
tf.keras.backend.clear_session()
```

## 17. Getting the Model Ready for Training

* To recap, backpropagation is about apply partial derivates backwards through the graph:
    ![](images/backprop-pass-1.png)

* To prepare the model for training, we must compile it.
    ```python
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    ```

* More information:
    - [List of optimizers](https://www.tensorflow.org/versions/r2.0/api_docs/python/tf/keras/optimizers#classes)
    - [List of loss functions](https://www.tensorflow.org/versions/r2.0/api_docs/python/tf/keras/losses#classes)
    - [List of metrics](https://www.tensorflow.org/versions/r2.0/api_docs/python/tf/keras/metrics#classes)

* To calculate loss and accuracy before training:
    ```python
    for image_batch, label_batch in training_batches.take(1):
        loss, accuracy = model.evaluate(image_batch, label_batch)
    ```

## 18. Training the Model

* Train model with `.fit` method:
    ```python
    EPOCHS = 5

    history = model.fit(training_batches, epochs = EPOCHS)

    for image_batch, label_batch in training_batches.take(1):
        ps = model.predict(image_batch)
        # ... do something with prediction

    for image_batch, label_batch in training_batches.take(1):
    loss, accuracy = model.evaluate(image_batch, label_batch)
    # loss around 0.086 and accuracy around 96.875%
    ```

* **Exercise**. Create a network with 784 input units, a hidden layer with 128 units, then a hidden layer with 64 units, then a hidden layer with 32 units and finally an output layer with 10 units. Use a ReLu activation function for all the hidden layers and a softmax activation function for the output layer. Then compile the model using an adam optimizer, a sparse_categorical_crossentropy loss function, and the accuracy metric.

    ```python
    from tensorflow.keras.layers import Flatten, Dense

    EPOCHS = 5

    model = tf.keras.Sequential()
    model.add(Flatten(input_shape = (28,28,1)))

    for neurons in [128, 64, 32]:
        model.add(Dense(neurons, activation='relu'))

    model.add(Dense(10, activation='softmax'))

    model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

    history = model.fit(training_batches, epochs = EPOCHS)

    for image_batch, label_batch in training_batches.take(1):
        loss, accuracy = model.evaluate(image_batch, label_batch)

    print('\nLoss after training: {:,.3f}'.format(loss))
    print('Accuracy after training: {:.3%}'.format(accuracy))
    ```

## 19. Automatic Differentiation

* TensorFlow automatically watches parameters to perform automatic differentiation

* Here's how you can programmatically perform differentiation using `tf.GradientTape`:
    ```python
    tf.random.set_seed(7)

    # create random tensor
    x = tf.random.normal((2,2))

    # Calculate gradient
    with tf.GradientTape() as g:
        g.watch(x)
        y = x ** 2

    dy_dx = g.gradient(y, x)

    print('Value found by tf.GradientTape:\n', dy_dx)

    print('\nExpected value:\n', 2 * x)
    ```

## 20. Fashion-MNIST

## 21. Inference & Validation

## 22. Early Stopping

## 23. Dropout

## 24. Dropout Solution

## 25. Saving & Loading

## 26. Loading Images with TensorFlow

## 27. Data Augmentation

## 28. Data Augmentation Solution

## 29. Pre-Notebooks with GPU

## 30. GPU-enabled Workspace

## 31. A Note on Transfer Learning

## 32. Transfer Learning

## 33. Transfer Learning II

## 34. Transfer Learning Solution

## 35. Recap
