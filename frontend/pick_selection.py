from os import listdir
import os
import random

files = os.listdir('../corpus')
openthis = random.choice(files)
txt = open('../corpus/' + openthis)
lines = txt.readlines()
start = random.randrange(0,len(lines))

print(''.join(lines[start:start+12]))
