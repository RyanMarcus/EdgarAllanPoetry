import sys
import string
for arg in sys.argv[1:]:
	input_file = arg
	f = open(input_file, 'r')
	good = list("qwertyuiopasdfghjklzxcvbnm ?,")
	for line in f:
		s = line.strip()
		if len(s) != 0:
			s = line.lower()
			s = [x for x in s if x in good]
			print(("".join(s)).strip(' \t\n\r'))
	f.close()