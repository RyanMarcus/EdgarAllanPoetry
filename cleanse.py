import sys
import string
import collections

def write_roman(num):
	#roman numerals
    roman = collections.OrderedDict()
    roman[1000] = "m"
    roman[900] = "cm"
    roman[500] = "d"
    roman[400] = "cd"
    roman[100] = "c"
    roman[90] = "xc"
    roman[50] = "l"
    roman[40] = "xl"
    roman[10] = "x"
    roman[9] = "ix"
    roman[5] = "v"
    roman[4] = "iv"
    roman[1] = "i"

    def roman_num(num):
        for r in roman.keys():
            x, y = divmod(num, r)
            yield roman[r] * x
            num -= (r * x)
            if num > 0:
                roman_num(num)
            else:
                break

    return "".join([a for a in roman_num(num)])

for arg in sys.argv[1:]:
	input_file = arg
	f = open(input_file, 'r')

	#get list of Roman Numerals
	romans = []
	for i in range(1, 101):
		romans.append(write_roman(i))
	#get list of chars to keep
	good = list("qwertyuiopasdfghjklzxcvbnm -?,")
	for line in f:
		s = line.strip(' \t\n\r').replace("\t", "")
		if len(s) != 0:
			s = line.lower()
			if s not in romans:
				s = [x for x in s if x in good]
				print(("".join(s)).strip(' \t\n\r'))
	f.close()