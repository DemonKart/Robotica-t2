### CI851 Tópicos Especiais I - Introdução à Robótica Móvel

                               Trabalho de Cinemática
                      Alan Peterson Carvalho Silva GRR20110556
                           Dalmon Ian Martins Oliveira GRR20139920
                         Pedro Henrique Almeida GRR50141057
                           Universidade Federal do Paraná
                           
---

## Ferramentas utilizadas:
    C9 (IDE) para implementação do código, gitLab para acompanhamento
    coletivo do desenvolvimento do trabalho e a linguagem usada foi python.
    Algumas bibliotecas para facilitar a implementação de cálculos para o 
    movimento do robô e a biblioteca matplotlib para gerar o gráfico em png
    com o caminho feito pelo robô.
    
## Como executar:
    Para compilar/executar basta digitar ./trabalho.py será gerada uma
    tabela com os resultados no terminal e um png mostrando em forma de 
    gráfico o caminho realizado pelo robô de acordo com as entradas 
    presentes no arquivo in.txt do diretório corrente.
    Cada linha da entrada representa um ponto (x,y,tempo).
    
## Implementação:
    Basicamente criação de vetores no plano R2 de acordo com as coordenadas
    vindas do arquivo txt de entrada. Após o deslocamento entre dois pontos 
    calcular através de funções da biblioteca "math" o ângulo de rotação para
    o deslocamento até o ponto seguinte. Cada roda contribui com metade da força
    pra fazer o robô andar na velocidade total. A "plotagem" mencionada no final
    do código é para a geração do png.