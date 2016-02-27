

from __future__ import print_function
from keras.models import Sequential
from keras.layers.core import Dense, Activation, Dropout
from keras.layers.recurrent import LSTM
from keras.datasets.data_utils import get_file
import numpy as np
import random
import sys
import json
import pickle


char_indices = pickle.load(open("model/char_indic.json", "r"))
indices_char = pickle.load(open("model/indic_char.json", "r"))

maxlen = 20

model = Sequential()
model.add(LSTM(512, return_sequences=True, input_shape=(maxlen, len(char_indices))))
model.add(Dropout(0.2))
model.add(LSTM(512, return_sequences=False))
model.add(Dropout(0.2))
model.add(Dense(len(char_indices)))
model.add(Activation('softmax'))

model.compile(loss='categorical_crossentropy', optimizer='rmsprop')
model.load_weights("model/weights.h5")




def sample(a, temperature=1.0):
    # helper function to sample an index from a probability array
    a = np.log(a) / temperature
    a = np.exp(a) / np.sum(np.exp(a))
    return np.argmax(np.random.multinomial(1, a, 1))

text = "one dark and stormy night"
generated = ''
start_index = 0
sentence = text[start_index: start_index + maxlen]
generated += sentence


for i in range(4000):
    x = np.zeros((1, maxlen, len(char_indices)))
    for t, char in enumerate(sentence):
        x[0, t, char_indices[char]] = 1.

    preds = model.predict(x, verbose=0)[0]
    diversity = 0.5
    next_index = sample(preds, diversity)
    next_char = indices_char[next_index]
    
    generated += next_char
    sentence = sentence[1:] + next_char

    sys.stdout.write(next_char)
    sys.stdout.flush()
