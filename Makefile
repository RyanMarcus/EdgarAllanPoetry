TARGETS=$(shell ls corpus/* | cut -d'/' -f 2)


corpus.txt: $(TARGETS) corpus/*.txt
	cat $(TARGETS) > corpus.txt


%.txt: corpus/%.txt
	python3 cleanse.py $< > $@



.phony: clean

clean:
	rm -f *.txt
