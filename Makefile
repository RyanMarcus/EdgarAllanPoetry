TARGETS=$(shell ls corpus/* | cut -d'/' -f 2)

%.txt: corpus/%.txt
	python3 cleanse.py $< > $@

corpus.txt: $(TARGETS) corpus/*.txt
	cat $(TARGETS) > corpus.txt
