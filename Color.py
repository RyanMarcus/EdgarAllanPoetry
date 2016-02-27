import indicoio as ind
from sys import stdin
ind.config.api_key = 'b88a14d4a97b56a6ed8f65efee05f9c4'
str = stdin.read()
print(str)
print(ind.sentiment(str))