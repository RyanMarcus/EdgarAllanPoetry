import indicoio as ind
from sys import stdin
ind.config.api_key = 'b88a14d4a97b56a6ed8f65efee05f9c4'
happy_thresh = 0.75
sad_thresh = 0.25
str = stdin.read()
val = ind.sentiment_hq(str)
if val > sad_thresh:
	if val < happy_thresh:
		print("m")
	else:
		print("t")
else:
	print("f")
print(val)