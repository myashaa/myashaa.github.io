var GAME = {
    width: 1000,
    height: 563,
    fps: 1000 / 50,
    canvasContext: null,
    background: new Image(),
    dino: new Image(),
    cactus: new Image(),
    winninggrond: new Image(),
    score: 0,
    start: false,
    end: false,
    winning: false,
    lifes: 3,
    acceleration: 2,
    levelScore: 10,
    finishScore: 20
}

var DINO = {
    width: 80,
    height: 83,
    x: 70,
    y: 370,
    moveUp: false,
    moveDown: false,
    speed: 10
}

var CACTUS = {
    width: 50,
    height: 133,
    x: GAME.width - 100,
    y: 355,
    speed: 10,
    downedCactus: -1
}


function init() {
    GAME.background.src = "img/bg.png";
    GAME.dino.src = "img/dino.png";
    GAME.cactus.src = "img/cactus.png";
    GAME.winninggrond.src = "img/bg2.png";

    var canvas = document.getElementById("canvas");
    _initCanvas(canvas);
    _initEventsListeners(canvas);
    
    GAME.cactus.onload = function(){
        setInterval(play, GAME.fps); 
    }  
}

function _initCanvas(canvas) {
    canvas.width = GAME.width;
    canvas.height = GAME.height;
    GAME.canvasContext = canvas.getContext("2d");
}

function _initEventsListeners(canvas) {
    document.addEventListener("keydown", _onDocumentKeyDown);
}

function _onDocumentKeyDown(event) {
    //прыжок при нажатии стрелочки вверх
    if (event.key == "ArrowUp" && DINO.y == 370) {
        DINO.moveUp = true;
    }

    //начало игры при нажатии пробела
    if (event.code == 'Space' && !GAME.end) {
        GAME.start = true;
    }

    //конец игры при нажатии пробела
    if (event.code == 'Space' && GAME.end) {
        location.reload();
    }
}

function play() {
    draw();
    if (GAME.start && !GAME.end) {
        update();
    }
}

function draw() {
    //рисуем задний фон
    GAME.canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height);
    
    //если начало игры, выводим окошко с привествием
    if (!GAME.start) {
        //рисуем прямоугольник
        GAME.canvasContext.fillStyle = "black";
        GAME.canvasContext.fillRect(250, 70, 500, 250);
        
        //рисуем текст
        GAME.canvasContext.font = "30px Arial";
        GAME.canvasContext.fillStyle = "white";
        GAME.canvasContext.fillText(`Hello, dear friend!`, 380, 120);
        
        //рисуем текст 
        GAME.canvasContext.font = "20px Arial";
        GAME.canvasContext.fillText(`The dinosaur can't get home.`, 365, 200);
        
        //рисуем текст
        GAME.canvasContext.fillText(`He need your help.`, 410, 240);
        
        //рисуем текст 
        GAME.canvasContext.fillText(`Can you help him?`, 406, 280);
        
        //рисуем текст 
        GAME.canvasContext.fillStyle = "black";
        GAME.canvasContext.fillText(`Press SPACE BAR to start.`, 370, 530); 
    }

    //игра
    if (GAME.start) {
        //рисуем динозаврика
        GAME.canvasContext.drawImage(GAME.dino, DINO.x, DINO.y, DINO.width, DINO.height);  
        
        //рисуем кактус
        GAME.canvasContext.drawImage(GAME.cactus, CACTUS.x, CACTUS.y, CACTUS.width, CACTUS.height);
    
        //рисуем передний фон
        GAME.canvasContext.fillStyle = "black";
        GAME.canvasContext.fillRect(0, 370 + DINO.height, GAME.width, GAME.height - 370 - DINO.height);

        //рисуем текст 
        GAME.canvasContext.font = "40px Arial";
        GAME.canvasContext.fillStyle = "black";
        GAME.canvasContext.fillText(`Score: ${GAME.score}`, 10, 50);  

        //рисуем жизнь, если их 3
        if (GAME.lifes > 2) {
            GAME.canvasContext.beginPath();
            GAME.canvasContext.fillStyle = "red";
            GAME.canvasContext.moveTo(797.5, 20);
            GAME.canvasContext.bezierCurveTo(797.5, 18.5, 795, 12.5, 785, 12.5);
            GAME.canvasContext.bezierCurveTo(770, 12.5, 770, 31.25, 770, 31.25);
            GAME.canvasContext.bezierCurveTo(770, 40, 780, 51, 797.5, 60);
            GAME.canvasContext.bezierCurveTo(815, 51, 825, 40, 825, 31.25);
            GAME.canvasContext.bezierCurveTo(825, 31.25, 825, 12.5, 810, 12.5);
            GAME.canvasContext.bezierCurveTo(802.5, 12.5, 797.5, 18.5, 797.5, 20);
            GAME.canvasContext.fill();                                               
        }

        //рисуем жизнь, если их 2 или 3
        if (GAME.lifes > 1 ) {
            GAME.canvasContext.beginPath();
            GAME.canvasContext.fillStyle = "red";
            GAME.canvasContext.moveTo(867.5, 20);
            GAME.canvasContext.bezierCurveTo(867.5, 18.5, 865, 12.5, 855, 12.5);
            GAME.canvasContext.bezierCurveTo(840, 12.5, 840, 31.25, 840, 31.25);
            GAME.canvasContext.bezierCurveTo(840, 40, 850, 51, 867.5, 60);
            GAME.canvasContext.bezierCurveTo(885, 51, 895, 40, 895, 31.25);
            GAME.canvasContext.bezierCurveTo(895, 31.25, 895, 12.5, 880, 12.5);
            GAME.canvasContext.bezierCurveTo(872.5, 12.5, 867.5, 18.5, 867.5, 20);
            GAME.canvasContext.fill();                                               
        }

        //рисуем жизнь, если их 1, или 2, или 3
        if (GAME.lifes > 0) {
            GAME.canvasContext.beginPath();
            GAME.canvasContext.fillStyle = "red";
            GAME.canvasContext.moveTo(937.5, 20);
            GAME.canvasContext.bezierCurveTo(937.5, 18.5, 935, 12.5, 925, 12.5);
            GAME.canvasContext.bezierCurveTo(910, 12.5, 910, 31.25, 910, 31.25);
            GAME.canvasContext.bezierCurveTo(910, 40, 920, 51, 937.5, 60);
            GAME.canvasContext.bezierCurveTo(955, 51, 965, 40, 965, 31.25);
            GAME.canvasContext.bezierCurveTo(965, 31.25, 965, 12.5, 950, 12.5);
            GAME.canvasContext.bezierCurveTo(942.5, 12.5, 937.5, 18.5, 937.5, 20);
            GAME.canvasContext.fill();                                               
        }

        //рисуем текст 
        if (!GAME.end) {
            GAME.canvasContext.font = "20px Arial"; 
            GAME.canvasContext.fillStyle = "white";
            GAME.canvasContext.fillText(`Press UP ARROW to jump.`, 360, 530);
        }
    }
    
    //если выиграли, рисуем заставку
    if (GAME.end && GAME.winning) {
        //рисуем задний фон
        GAME.canvasContext.drawImage(GAME.winninggrond, 0, 0, GAME.width, GAME.height);

        //рисуем прямоугольник
        GAME.canvasContext.fillStyle = "rgba(0, 0, 0, 0.5)";
        GAME.canvasContext.fillRect(300, 100, 400, 200);
        
        //рисуем текст 
        GAME.canvasContext.font = "30px Arial";
        GAME.canvasContext.fillStyle = "white";
        GAME.canvasContext.fillText(`Congratulate!`, 410, 180);
        
        //рисуем текст 
        GAME.canvasContext.font = "20px Arial";
        GAME.canvasContext.fillText(`The dinosaur has returned home.`, 355, 230);
        
        //рисуем текст 
        GAME.canvasContext.fillText(`Press SPACE BAR to restart.`, 355, 530); 
    }

    //если проиграли, выводим окошко со счетом
    if (GAME.end && !GAME.winning) {
        //рисуем прямоугольник
        GAME.canvasContext.fillStyle = "black";
        GAME.canvasContext.fillRect(300, 100, 400, 200);
        
        //рисуем текст 
        GAME.canvasContext.font = "30px Arial";
        GAME.canvasContext.fillStyle = "white";
        GAME.canvasContext.fillText(`Game over!`, 420, 180);
        
        //рисуем текст 
        GAME.canvasContext.font = "20px Arial";
        GAME.canvasContext.fillText(`Your score ${GAME.score}.`, 440, 230);
        
        //рисуем текст 
        GAME.canvasContext.fillText(`Press SPACE BAR to restart.`, 355, 530); 
    }
}

function update() {

    var сollision = _dinoHasCollisionWithCactus(DINO, CACTUS);

    //при столкновении уменьшаем кол-во жизней
    if (сollision && GAME.score != CACTUS.downedCactus) {
        GAME.lifes--;
        CACTUS.downedCactus = GAME.score;
    }

    //конец игры, если жизни закончились
    if (GAME.lifes == 0) {
       GAME.end = true; 
    }

    // двигаем кактус на его скорость
    CACTUS.x -= CACTUS.speed;

    //перемещаем кактус в начало, т.е создаем новый
    if (CACTUS.x <= 0) {
        CACTUS.x = GAME.width - CACTUS.width;
        CACTUS.y = Math.floor(Math.random() * (355 - 325)) + 325;
        GAME.score++;
            
        //увеличиваем скорость кактуса
        if (GAME.score % GAME.levelScore == 0) {
            CACTUS.speed += GAME.acceleration;
            DINO.speed += GAME.acceleration;
        }

        //конец игры, т.к победа
        if (GAME.score == GAME.finishScore) {
            GAME.winning = true;
            GAME.end = true;
        }
    }

    //прыжок вверх
    if (DINO.moveUp) {
        DINO.y -= DINO.speed;
    }

    //верхняя точка прыжка
    if (DINO.y < 130) {
        DINO.moveUp = false;
        DINO.moveDown = true;
    }

    //спускание вниз
    if (DINO.moveDown) {
        DINO.y += DINO.speed;
    }

    //конец прыжка
    if (DINO.y >= 370) {
        DINO.moveDown = false;
        DINO.y = 370;
    }
}

function _dinoHasCollisionWithCactus(dino, cactus) {
    var xCollision = (dino.x + dino.width > cactus.x) && (dino.x < cactus.x + cactus.width);
    var yCollision = (dino.y + dino.height > cactus.y);
    return xCollision && yCollision;
}
