from flask import Flask, jsonify, request
import cv2
import numpy as np
import os
from flask_cors import CORS
from keras.models import load_model
from tensorflow import keras as K



UPLOAD_FOLDER = os.path.basename('upload')

app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def url_to_image(url, resize=224):
  """
  downloads an image from url, converts to numpy array,
  resizes, and returns it
  """
  response = urllib.urlopen(url)
  img = np.asarray(bytearray(response.read()), dtype=np.uint8)
  img = cv2.imdecode(img, cv2.IMREAD_COLOR)
  img = cv2.resize(img, (resize, resize), interpolation=cv2.INTER_CUBIC)
  return img


"""
if request.method == 'POST' and 'photo' in request.files:
        photo = request.files['photo']
        in_memory_file = io.BytesIO()
        photo.save(in_memory_file)
        data = np.fromstring(in_memory_file.getvalue(), dtype=np.uint8)
        color_image_flag = 1
        img = cv2.imdecode(data, color_image_flag)

        https://shuaiw.github.io/2017/02/01/deep-learning-model-as-rest-api.html
        https://medium.com/@antoinegrandiere/image-upload-and-moderation-with-python-and-flask-e7585f43828a
        https://stackoverflow.com/questions/22181384/javascript-no-access-control-allow-origin-header-is-present-on-the-requested
"""



@app.route('/test', methods=['GET'])
def test():
    return "Hello world"

@app.route('/upload', methods=['GET', 'POST'])
def predict():

    #if request.method == 'POST':
        # pass
    # print(app.config['UPLOAD_FOLDER'])
    if request.method == 'POST':
        # print(request.files['image'].read())
        model = load_model('./convnet/vgg_catdog_model_all.h5')

        print(request.files)
        img_array = np.asarray(bytearray(request.files['image'].read()), dtype=np.uint8)

        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (150, 150), interpolation=cv2.INTER_CUBIC)

        # cv2.imwrite('img.png', img)
        img = img.reshape(1, 150, 150, 3)
        print(img.shape)

        # print(model.predict(img.reshape((1, 150, 150, 3))))
        print(model.predict(img))

        K.backend.clear_session()

        # print(img_array.shape)
        return "Nothing"

    return "Nothing"


if __name__ == '__main__':
    
    # import os
    
    # model._make_predict_function()
    

    # print(model.summary())

    # print(model.get_weights())

    app.run(debug=False)