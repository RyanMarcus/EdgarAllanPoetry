import random

letters = list("abcdefghijklmnopqrstuvxyz\n")

for i in range(400):
    print(random.choice(letters), end="", flush=True)
