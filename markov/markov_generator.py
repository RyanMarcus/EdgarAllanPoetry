import nltk
import pickle

def to_ngrams(tokens, n=4):
    ngrams = []
    head = 0
    while len(tokens) - head >= n:
        if len(tokens) - head % 1000 == 0:
            print(len(tokens))
        ngrams.append(tokens[head:head+n])
        head += 1
    return ngrams



n  = 3
kb = {}
with open("corpus.txt", "r") as f:
    print("Getting file...")
    all_text = f.read()
    print("Read in file!")
    tokens = nltk.word_tokenize(all_text)
    print("Tokenized!")
    grams_for_line = to_ngrams(tokens, n)
    print("Got NGrams")
    for gram in grams_for_line:
        prefix = " ".join(gram[0:n-1])
        nxt = gram[-1]
            
        if prefix in kb:
            if nxt in kb[prefix]:
                kb[prefix][nxt] += 1
            else:
                kb[prefix][nxt] = 1
        else:
            kb[prefix] = {}
            kb[prefix][nxt] = 1

    print("Database created")



import random


lengths = [1, 2, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12]

def generate_poem(length=1000):
    data = random.choice(list(kb.keys()))
    while len(data) < 1000:

        tokens = nltk.word_tokenize(data)[-(n-1):]
        tokens = " ".join(tokens)
        options = kb[tokens]
        freq = []
        for k, v in options.items():
            freq.extend([k]*v)
        data += " " + random.choice(freq)

    tokens = nltk.word_tokenize(data)
    print(" ".join(tokens).replace(" ,", ",\n").replace("--", "--\n"))
    #while len(tokens) > 0:
    #    this_line = min(random.choice(lengths), len(tokens))

    #    print(" ".join(tokens[0:this_line]))
    #    tokens = tokens[this_line:]
    


while True:
    generate_poem()
    
    
    
