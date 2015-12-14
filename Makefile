.PHONY: labirinto

all: clean labirinto
labirinto:
	mv java/*.java ./
	javac *.java
	echo Main-Class: Main > MANIFEST.MF
	jar -cvmf MANIFEST.MF labirinto.jar *.class
	rm -rf MANIFEST.MF *.class
	mv ./*.java java/
	touch labirinto
	chmod +x labirinto
	echo "#!/bin/bash" > labirinto
	echo "java -jar labirinto.jar" >> labirinto
	echo "firefox index.html &" >> labirinto
clean:
	rm -rf labirinto labirinto.jar MANIFEST.MF *.class
