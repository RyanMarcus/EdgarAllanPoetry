TARGETS=$(shell ls corpus/* | cut -d'/' -f 2)

.INTERMEDIATE: $(TARGETS)

corpus.txt: $(TARGETS) corpus/*.txt
	cat $(TARGETS) > corpus.txt


%.txt: corpus/%.txt cleanse.py
	python3 cleanse.py $< > $@



.phony: clean

clean:
	rm -f *.txt
