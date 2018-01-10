from keras.models import load_model
import os
model = load_model('./convnet/vgg_catdog_model_all.h5')

print(model.summary())

print(model.get_weights())