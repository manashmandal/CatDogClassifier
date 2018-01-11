from flask import Flask, jsonify, request
import cv2
import numpy as np
import os
from flask_cors import CORS
from keras.models import load_model
from tensorflow import keras as K
import tensorflow as tf

UPLOAD_FOLDER = os.path.basename('upload')

app = Flask(__name__)
CORS(app)

# Application configs
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def img_to_array(raw_file, shape=150):
  """
  Converts raw file to numpy array
  """
  NUM_CHANNEL = 3
  img = np.asarray(bytearray(raw_file.read()), dtype=np.uint8)
  img = cv2.imdecode(img, cv2.IMREAD_COLOR)
  img = cv2.resize(img, (shape, shape), interpolation=cv2.INTER_CUBIC)
  return img.reshape(1, shape, shape, NUM_CHANNEL)


@app.route('/test', methods=['GET'])
def test():
    return "<h1>Testing App</h1>"


@app.route('/upload', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':

        img = img_to_array(request.files['image'])

        global model
        result = model.predict(img)

        if (result.ravel()[0] > 0.5):
            print("Dog")
            return "Dog"
        else:
            print("Cat")
            return "Cat"

    return "Nothing"


if __name__ == '__main__':
    
    # Loading the model
    model = load_model('./convnet/vgg_catdog_model_all.h5')
    # Keras session bugfix - predicting something on loading the model 
    print(model.predict(np.random.randn(1, 150, 150, 3)))


    app.run(debug=False)