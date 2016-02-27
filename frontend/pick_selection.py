import random

txt = open('../corpus.txt')
lines = txt.readlines()
start = random.randrange(0,len(lines))

print("".join(lines[start:(start+12)]))
