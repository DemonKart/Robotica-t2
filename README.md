### CI851 Tópicos Especiais I - Introdução à Robótica Móvel

                            Trabalho de Cinemática e Spline
                        Alan Peterson Carvalho Silva GRR20110556
                        Dalmon Ian Martins Oliveira GRR20139920
                        Marcos Vinicius Ferretti GRR20113748
                        Pedro Henrique Almeida GRR50141057
                        Vinicius Moisés Botto GRR20096649
                            Universidade Federal do Paraná
                           
---
## Arquivos e pastas:
    ./css/css.css:
        Arqivo de estilos para a página HTML.
        
    ./images/car.png
        Imagem usada para representar robô na simulação
    
    ./java/Main.java
        Arquivo java contendo a Classe Main.
     
     ./java/Point.java:
		Arquivo java contendo a Classe Point para representação dos pontos lidos.   
    
    ./js/funcoes.js:
        Arquivo javascript que contém funções para representar resultados obtidos pelos arquivos java. 
    
    ./maps:
        Pasta contendo mapas .in, que representam mapas usados para criar o labirinto para simulação.
    
    ./index.html:
        Pagina HTML que mostra a simulação graficamente.
        
    ./README.md:
		Este arquivo.
		
	./Makefile:
		O arquivo Makefile está preparado para compilar todos os arquivos .java citados acima.
		Gera os arquivos .class de cada classe para poder gerar o executável.
		Gera o arquivo MANIFEST.MF contendo as informações java necessárias para o gerar o executável.
		Gera o arquivo labirinto.jar, o executável java. Após isso os arquivos .class e o arquivo MANIFEST.MF serão excluídos.
		Os arquivos java são movidos para a pasta /java.
		O executável labirinto é criado como bash com as linhas de comando:
		    echo "#!/bin/bash" > labirinto
	        echo "java -jar labirinto.jar" >> labirinto
	        echo "firefox index.html &" >> labirinto
	    para ao ser executado, executar o labirinto.jar e abrir o firefox em seguida para mostrar o resultado obtido.
	    
    Execução Makefile:
	1) $ make:
		Compila todos os .java e gera o .jar
	2) $ make clean:
		Limpa o diretório deixando somente os .java e o Makefile.
	3) $ make all:
		executa o make clean e em seguida o make.
		
    Execução do Programa:
	1) ./labirinto < maps/mapa.in
		(sendo mapa um dos arquivos .in contidos na pasta maps)
		
		Exemplo de mapa do VRI, contido no arquivo vri.in:
		+-+-+-+-+-+
        | |       |
        + + +-+-+ +
        | | | | |F|
        + + + + +-+
        |       | |
        +-+-+-+ + +
        |         |
        + +-+-+-+-+
        |        C|
        +-+-+-+-+-+

## Implementação:

	Este trabalho foi implementado em Java, com um arquivo HTML e css para representar graficamente os resultados obtidos e um arquivo em javascript para mostrar a animação do robô e o caminho percorrido dentro do labirinto.
	Na classe Main, lemos o arquivo que foi passado na execução do programa (em texto), e com ele formamos uma matriz "maze". Logo depois, procura-se os pontos de entrada e saída do labirinto (C e F respectivamente no texto), e armazena-os em variáveis "Point". A função SolveMaze inicia a resolução recursiva do labirinto, mostrando qual caminho o robô deve percorrer para chegar até a saída.
	Também é executada a função solveCinematica, que calcula o ângulo do robô em cada ponto do caminho, e sua velocidade naquele ponto. No final da execução, a função retorna o vetor points, que contém cada ponto do caminho usado pelo robô, cada um com a velocidade, tempo de chegada no ponto, e o ângulo do robô.
	Depois, o resultado dos pontos percorridos pelo robô e os pontos do mapa são enviados para o arquivo input.js, que é inicializado juntamente com o arquivo funcoes.js, pelo arquivo index.html. Essa página HTML é aberta imediatamente após a execução do Java, e exibe, com as informações contidas em input.js, o desenho do mapa e o caminho do robô. O arquivo funcoes.js é o responsável por juntar essas informações e implementar a animação do caminho do robô, mostrando também as informações de velocidade das rodas, ângulo, tempo decorrido e sua coordenada X e Y.
	
	
