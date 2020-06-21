# Create Your Own Image Classifier

## 1. Project Intro

## 2. Introduction to GPU Workspaces

* Workspace goes to sleep after 30 minutes. Can prevent this using:
    ```python
    from workspace_utils import active_session, keep_awake

    for i in keep_awake(range(5)):
        # do long-running stuff

    with active_session():
        # ... do long-running stuff; e.g., training model
    ```

## 3. Image Classifier - Part 1 - Development

* Download notebook as HTML; will include it with files submit in next part of project

* To save space, avoid wide dense layers, and instead use more hidden layers

## 4. Image Classifier - Part 1 - Workspace

```python
# Import TensorFlow
import tensorflow as tf
import tensorflow_datasets as tfds
import tensorflow_hub as hub

#
# Other imports
#
import json
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
from tensorflow.keras import Sequential
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from tensorflow.keras.layers import Dense, Dropout

#
# Global constants
#
BATCH_SIZE = 64
DROPOUT_RATE = 0.2
EARLY_STOPPING_PATIENCE = 5
EPOCHS = 25
IMAGE_CLASSIFIER_PATH = './image_classifier.2020-06-21.h5'
IMG_SIZE=224
MODEL_URL = "https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4"

#
# Useful utilities
#
def display_image(image, label):
    plt.imshow(image, cmap = plt.cm.binary)
    plt.title(f'Image with label "{label}"')
    plt.show()

def normalize_image_values(image, label=None):
    image = tf.cast(image, tf.float32)
    image /= 255 # values between 0-1
    return image, label

def normalize_image_size(image, label=None):
    # TODO: better to clip or skew?
    # Set consistent size (will skew)
    image = tf.image.resize(image, (IMG_SIZE, IMG_SIZE), antialias=True)
    return image, label

def build_pipeline(dataset, batch_size = BATCH_SIZE):
    return dataset.cache() \
        .shuffle(num_train//4) \
        .map(normalize_image_values) \
        .map(normalize_image_size) \
        .batch(batch_size) \
        .prefetch(1)

def plot_complexity_graphs(history):
    training_accuracy = history.history['accuracy']
    validation_accuracy = history.history['val_accuracy']

    training_loss = history.history['loss']
    validation_loss = history.history['val_loss']

    epochs_range=range(len(training_accuracy))

    plt.figure(figsize=(8, 8))
    plt.subplot(1, 2, 1)
    plt.plot(epochs_range, training_accuracy, label='Training Accuracy')
    plt.plot(epochs_range, validation_accuracy, label='Validation Accuracy')
    plt.legend(loc='lower right')
    plt.title('Training and Validation Accuracy')

    plt.subplot(1, 2, 2)
    plt.plot(epochs_range, training_loss, label='Training Loss')
    plt.plot(epochs_range, validation_loss, label='Validation Loss')
    plt.legend(loc='upper right')
    plt.title('Training and Validation Loss')
    plt.show()

def load_image_as_nparray(path):
    im = Image.open(path)
    return np.asarray(im)

def display_two_images(img_1, img_1_title, img_2, img_2_title):
    fig, (ax1, ax2) = plt.subplots(figsize=(10,10), ncols=2)
    ax1.imshow(img_1)
    ax1.set_title(img_1_title)
    ax2.imshow(img_2)
    ax2.set_title(img_2_title)
    plt.tight_layout()
    plt.show()

# download data to default local directory "~/tensorflow_datasets"
!python -m tensorflow_datasets.scripts.download_and_prepare --register_checksums=True --datasets=oxford_flowers102

#
# load dataset
#
dataset, dataset_info = tfds.load('oxford_flowers102', # already split into test/train/validate
                                  as_supervised=True,
                                  with_info=True)

training_set = dataset['train']
validation_set = dataset['validation']
test_set = dataset['test']

# useful stats on dataset
num_test = dataset_info.splits['test'].num_examples # 6149
num_train = dataset_info.splits['train'].num_examples # 1020
num_validation = dataset_info.splits['validation'].num_examples # 1020
num_classes = dataset_info.features['label'].num_classes # 102

print(f'\u2022 |test| = {num_test}, |train| = {num_train}, |validation| = {num_validation}')
print(f'\u2022 |classes| = {num_classes}')

# shape and corresponding label of 3 images in the training set.
for image, label in training_set.take(3):
    print('Sample:')
    print('\u2022 label:', label.numpy())
    print('\u2022 dtype:', image.dtype) # <dtype: 'uint8'>
    print('\u2022 shape:', image.shape) # heterogeneous
    print()

# display image with numeric label
for image, label in training_set.take(1):
    display_image(image, label.numpy())

with open('label_map.json', 'r') as f:
    class_names = json.load(f)

def get_label(label: int) -> str:
    key = str(label)
    return class_names[key] if key in class_names else 'unknown'

for image, label in training_set.take(1):
    label = get_label(label.numpy())
    display_image(image, label)

#
# create pipelines
#
training_batches = build_pipeline(training_set)
validation_batches = build_pipeline(validation_set)
test_batches = build_pipeline(test_set, num_test) # Large batch, but simplifies model checking

#
# build model
#
feature_extractor = hub.KerasLayer(MODEL_URL, input_shape=(IMG_SIZE, IMG_SIZE, 3))

feature_extractor.trainable = False  # freeze weights and biases during training

model = tf.keras.Sequential([
    feature_extractor,
    Dense(num_classes, activation = 'softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

#
# train model
#
early_stopping = EarlyStopping(monitor='val_loss', patience=EARLY_STOPPING_PATIENCE)

save_best = ModelCheckpoint('./best_model.h5',
                            monitor='val_loss',
                            save_best_only=True)

history = model.fit_generator(training_batches,
                              epochs=EPOCHS,
                              validation_data=validation_batches,
                              callbacks=[early_stopping, save_best])

plot_complexity_graphs(history)

# There's only one test data batch; see "Create Batch" above
for image_batch, label_batch in test_batches.take(1):
    loss, accuracy = model.evaluate(image_batch, label_batch)
    print(f'loss={loss} accuracy={accuracy}') # should be around 78%

#
# save trained model
#
model.save(IMAGE_CLASSIFIER_PATH)
print('Saved.')

#
# load trained model
#
model = tf.keras.models.load_model(IMAGE_CLASSIFIER_PATH, custom_objects={'KerasLayer':hub.KerasLayer})
print('Loaded.')

# normalizes image (specified as nparray)
def process_image(image):
    t = tf.convert_to_tensor(image)
    t, _ = normalize_image_size(t)
    t, _ = normalize_image_values(t)
    return t.numpy()

test_image = load_image_as_nparray('./test_images/hard-leaved_pocket_orchid.jpg')

display_two_images(
    img_1 = test_image,
    img_1_title = 'Original Image',
    img_2 = process_image(test_image),
    img_2_title = 'Processed Image'
)

# utility for finding top k predictions for a flower image
def predict(image_path, model, top_k):
    img = load_image_as_nparray(image_path)
    img = process_image(img)
    batch = tf.expand_dims(img, 0)          # wrap in "array" (3 dim -> 4 dim)
    ps = model.predict(batch)
    ps = ps[0]                              # extract from "array" of "arrays" (4 dim -> 3 dim)
    ps = [(i+1,x) for i,x in enumerate(ps)] # (label, prob). note label = idx + 1
    ps = sorted(ps, key=lambda t: t[1])     # sort
    ps = ps[::-1]                           # reverse
    ps = ps[0:top_k]                        # just top k
    return (
        list(map(lambda t: t[1], ps)),
        list(map(lambda t: get_label(t[0]), ps))
    )

# utility for validating predict method
def test_predict(path, expected_label, top_k=5, debug=True):
    probs, classes = predict(path, model, top_k)
    if debug:
        print(f'probs = {probs}')
        print(f'classes = {classes}')
        print()
    assert len(probs) == top_k
    assert len(classes) == top_k
    assert classes[0] == expected_label

test_predict('./test_images/cautleya_spicata.jpg', 'cautleya spicata')
test_predict('./test_images/hard-leaved_pocket_orchid.jpg', 'hard-leaved pocket orchid')
test_predict('./test_images/orange_dahlia.jpg', 'orange dahlia')
test_predict('./test_images/wild_pansy.jpg', 'wild pansy')
```

## 5. Image Classifier - Part 2 - Command Line App

* Usage:
    ```
    $ python predict.py /path/to/image saved_model [OPTIONS...]

    Options:
        --top_k             return the top K most likely classes
        --category_names    path to a JSON file mapping labels to flower names
    ```

* Use [argparse library](https://docs.python.org/3/library/argparse.html)

* Install dependencies:
    ```sh
    $ pip install -q -U "tensorflow-gpu==2.0.0b1"
    $ pip install -q -U tensorflow_hub
    ```

* Test images:
    * `./test_images/cautleya_spicata.jpg`
    * `./test_images/hard-leaved_pocket_orchid.jpg`
    * `./test_images/orange_dahlia.jpg`
    * `./test_images/wild_pansy.jpg`

## 6. Image Classifier - Part 2 - Workspace

```python
import argparse
import json
import numpy as np
from PIL import Image
import tensorflow as tf
import tensorflow_hub as hub

# disable (some of) libcuda errors
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

#
# constants
#
IMG_SIZE=224

#
# utils
#
def load_model(path):
    return tf.keras.models.load_model(path, custom_objects={'KerasLayer':hub.KerasLayer})

def load_image_as_nparray(path):
    im = Image.open(path)
    return np.asarray(im)

def normalize_image_values(image, label=None):
    image = tf.cast(image, tf.float32)
    image /= 255 # values between 0-1
    return image, label

def normalize_image_size(image, label=None):
    # TODO: better to clip or skew?
    # Set consistent size (will skew)
    image = tf.image.resize(image, (IMG_SIZE, IMG_SIZE), antialias=True)
    return image, label

def process_image(image):
    t = tf.convert_to_tensor(image)
    t, _ = normalize_image_size(t)
    t, _ = normalize_image_values(t)
    return t.numpy()

def get_label(names, label: int) -> str:
    key = str(label)
    return names[key] if key in names else 'unknown'

def predict(image_path, model, top_k, category_names):
    with open(category_names, 'r') as f:
        names = json.load(f)
    img = load_image_as_nparray(image_path)
    img = process_image(img)
    batch = tf.expand_dims(img, 0)          # wrap in "array" (3 dim -> 4 dim)
    ps = model.predict(batch)
    ps = ps[0]                              # extract from "array" of "arrays" (4 dim -> 3 dim)
    ps = [(i+1,x) for i,x in enumerate(ps)] # (label, prob). note label = idx + 1
    ps = sorted(ps, key=lambda t: t[1])     # sort
    ps = ps[::-1]                           # reverse
    ps = ps[0:top_k]                        # just top k
    return (
        list(map(lambda t: t[1], ps)),
        list(map(lambda t: get_label(names, t[0]), ps))
    )

#
# exec
#
def get_args():
    parser = argparse.ArgumentParser(description='Given a photo of a flower and a trained Keras neural network, identifies the species of flower.')
    parser.add_argument('img_path', metavar='path/to/image', type=str, help='path to the image of a flower to identify')
    parser.add_argument('model_path', metavar='path/to/model', type=str, help='path to the trained Keras model')
    parser.add_argument('--top_k', default=5, type=int, help='the number of potential matches to return')
    parser.add_argument('--category_names', default='./label_map.json', type=str, help='path to JSON file mapping numberic labels to strings')
    return parser.parse_args()

def main():
    args = get_args()
    model = load_model(args.model_path)
    probs, classes = predict(args.img_path, model, args.top_k, args.category_names)
    assert len(probs) == args.top_k
    assert len(classes) == args.top_k
    print()
    for i in range(0, args.top_k):
        print(f'\u2022 {classes[i]} - {probs[i] * 100:.2f}%')
    print()

if __name__ == '__main__':
    main()
```

## 7. Rubric

## 8. Project
