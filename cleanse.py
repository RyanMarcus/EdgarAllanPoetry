import sys
for arg in sys.argv[1:]:
	input_file = arg
	f = open(input_file, 'r')
	good = list("qwertyuiopasdfghjklzxcvbnm ?,")
	for line in f:
		s = line.lower()
		s = [x for x in s if x in good]
		print("".join(s))
	f.close();