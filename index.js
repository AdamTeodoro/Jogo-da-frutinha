
/**
 * Módulo para calculos e geração de números pseudoaleatórios
 */
function GameMathModule() {
    return {
        generateRandomPosition: () => ((Math.floor(Math.random() * 50) * 10) + 10),
    }
}

/**
 *
 * Função para criação do player
 * 
 * @param {*} name - nome do jogador
 * @param {*} color - cor do jogador
 * @param {*} points - pontuação do jogador
 * @param {*} posX - posição do eixo x
 * @param {*} posY - posição do eixo y
 * @param {*} id - id do player no html e no código
 * @param {*} stylePlayer - estilo no id do html
 */
function Player(
    name,
    color,
    posX,
    posY,
    id,
) {
    let score = 0;
    let stylePlayer = document.getElementById('player-' + id).style;
    let idScore = document.getElementById("score-p" + id);
    idScore.innerHTML = `<h4>${score}</h4>`;

    /**
     * Define uma posição no eixo X e também desenha o player na posição ordenada
     */
    function setPosX(value) {
        if (value && typeof value == "number") {
            posX = value;
            stylePlayer.left = value;
        }
    }
        
    /**
     * Define uma posição no eixo Y e também desenha o player na posição ordenada
     */
    function setPosY(value) {
        if (value && typeof value == "number") {
            posY = value;
            stylePlayer.top = value;
        }
    }
        
    /**
     * Incrementa 10 pontos quando acionado e também atualiza o template
     */
    function incrementScore() {
        score += 10;
        idScore.innerHTML = "<h4>" + score + "</h4>";
    }
    
    /**
     * Zera a pontuação do jogador quando a função é acionada e também 
     * atualiza no template;
     */
    function resetScore() {
        score = 0;
        idScore.innerHTML = "<h4>" + score + "</h4>";
    }
    
    /**
     * Inicia a posição x e y do player
     */
    setPosX(posX);
    setPosY(posY);

    return {

        /**
         * -----------------------------------------------
         * Início - Encapsulando das variáveis de entrada
         */
        getName: () => {
            return name;
        },

        getId: () => {
            return id;
        },

        getColor: () => {
            return color;
        },

        getScore: () => {
            return score;
        },

        getPosX() {
            return posX;
        },

        getPosY()  {
            return posY;
        },

        /**
         *  Fim - Encapsulando das variáveis de entrada    |
         *  -----------------------------------------------
         */
        incrementScore,

        //função para inserir a posição x e também atualizar no template
        setPosX,

        //função para inserir a posição y e também atualizar no template
        setPosY,
        
        /**
         * Incrementa 10px na posição X e se ele sair pra fora da tela
         * força a travessia do mapa
         */
        moveLeft: () => {
            if (posX < 20) {
                return setPosX(500);
            }
            setPosX(posX -= 10);
        },
        
        /**
         * Decrementa 10px na posição X e se ele sair pra fora da tela
         * força a travessia do mapa
         */
        moveRight: () => {
            if (posX > 490) {
                return setPosX(10);
            }
            setPosX(posX += 10);
        },
        
        /**
         * Incrementa 10px na posição Y e se ele sair pra fora da tela
         * força a travessia do mapa
         */
        moveUp: () => {
            if (posY < 20) {
                return setPosY(500);
            }
            setPosY(posY -= 10);
        },
        
        /**
         * Decrementa 10px na posição Y e se ele sair pra fora da tela
         * força a travessia do mapa
         */
        moveDown: () => {
            if (posY > 490) {
                return setPosY(10);
            }
            setPosY(posY += 10);
        },

        resetScore
    }
}

/**
 * Executa a função de um player quando uma tecla é pressionada.
 * 
 * @param {*} player - Classe do tipo jogador
 */
 function ControllModule(player, keyMap) {
    try {
        const {
            keyMoveRight,
            keyMoveLeft,
            keyMoveUp,
            keyMoveDown,
        } = keyMap;
        return {
            [keyMoveRight]: () => {
                player.moveRight();
            },

            [keyMoveLeft]: () => {
                player.moveLeft();
            },

            [keyMoveUp]: () => {
                player.moveUp();
            },

            [keyMoveDown]: () => {
                player.moveDown();
            },
        }
    } catch(error) {
        return;
    }
}

/**
 * Módulo de criação da frutinha no jogo, inicia o contador 
 * de tempo que define o tempo em que a frutinha ficará desenhada na tela
 *
 * @param {*} timeP - Tempo de exibição da frutinha, quando 
 * o tempo é esgotado a frutinha recebe uma nova posição
 */
function FruitModule(timeP) {
    let time = timeP;
    let styleFruit = document.getElementById('fruit').style;
    let posX = GameMathModule().generateRandomPosition();
    let posY = GameMathModule().generateRandomPosition();
    let timeOut = 0; // timer da frutinha
    
    /**
     * Inicia a frutinha com uma posição aleatória no mapa e 
     * inicia a contagem do timeP
     */
    function startFruit() {
        setPosX(GameMathModule().generateRandomPosition());
        setPosY(GameMathModule().generateRandomPosition());
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            startFruit();
        }, time);
    }
    
    /**
     * Desenha e a frutinha em uma posição passada como parâmetro;
     */
    function setPosX(value) {
        if (value && typeof value == "number") {
            posX = value;
            styleFruit.left = value;
        }
    }
    
    /**
     * Desenha e a frutinha em uma posição passada como parâmetro;
     */
    function setPosY(value) {
        if (value && typeof value == "number") {
            posY = value;
            styleFruit.top = value;
        }
    }
 
    setPosX(posX);
    setPosY(posY);

    return {
        getTime: () => time,
        getPosX: () => posX,
        getPosY: () => posY,
        setPosX,
        setPosY,
        startFruit,
        timeOut,
    }
}

/**
 * Verifica se a posição do player no mapa é igual a posição 
 * da frutinha e incrementa a pontuação ou se
 * o score de um dos jogadores for 100 pontos exibe um alerta com 
 * uma mensagem avisando qual player venceu!
 * e depois de fechar o alerta reseta a pontuação e o game
 * 
 */
function verifyPoints(player, fruit) {
    if (player.getPosX() === fruit.getPosX() && player.getPosY() === fruit.getPosY()) {
        //increment score
        player.incrementScore();
        clearTimeout(fruit.timeOut);
        fruit.startFruit();
        if (player.getScore() === 100) {
            alert("Vencedor: " + player.getName());
            player2.resetScore();
            player1.resetScore();
        }
    }
}

function openMenu() {
    //pegando elementos
    const howToPlayElement = document.getElementById('how-to-play');
    howToPlayElement.style.display = 'block';
    howToPlayElement.style.marginLeft = '3%';
}

function closeMenu() {
    const howToPlayElement = document.getElementById('how-to-play');
    howToPlayElement.style.marginLeft = '100%';
}

const player2 = new Player(
    "Player 2",
    "white",
    GameMathModule().generateRandomPosition(),
    GameMathModule().generateRandomPosition(),
    2
);

const player1 = new Player(
    "Player 1",
    "black",
    GameMathModule().generateRandomPosition(),
    GameMathModule().generateRandomPosition(),
    1
); 

let fruit = new FruitModule(5000);

const keyMapP1 = {
    keyMoveLeft: 'ArrowLeft',
    keyMoveRight: 'ArrowRight',
    keyMoveDown: 'ArrowDown',
    keyMoveUp: 'ArrowUp'
};
const keyMapP2 = {
    keyMoveLeft: 'a',
    keyMoveRight: 'd',
    keyMoveDown: 's',
    keyMoveUp: 'w'
};
const controlP2 = ControllModule(player2, keyMapP2);
const controlP1 = ControllModule(player1, keyMapP1);

console.log("Desenvolvido por: Adam Teodoro");

/**
 * Inicia o observador dos controles do player 2
 */
document.addEventListener('keyup', (event) => {
    try {
        controlP2[event.key.toLocaleLowerCase()]();
        verifyPoints(player2, fruit);
    } catch {
        return;
    }
});

/**
 * Inicia o observador dos controles do player 1
 */
document.addEventListener('keyup', (event) => {
    try {
        controlP1[event.key]();
        verifyPoints(player1, fruit);
    } catch {
        return;
    }
});
