var ctx1;
var ctx2;
var ctx3;
var ctx4;
var can1;
var can2;
var can3;
var can4;
var lastTime;
var deltaTime;
var mx, my;
var canvasW = document.documentElement.clientWidth;
var canvasH = document.documentElement.clientHeight;

var bgPic;
var background;
var bgTimer; //设置景物动画定时器
var obstacle; //障碍物
var obsTimer; //设置障碍物动画定时器

var runner;

var giftList = [];
var score1;  //头顶的分数显示
var score2;  //头顶的分数显示
var data;   //分数\时间显示
document.body.onload = game;

function game() {
    init();
    lastTime = new Date();
    deltaTime = 0;
    gameloop();
    startGame();
}

function startGame() {
    bgTimer = setInterval(Monitor, 1300);
    obsTimer = setInterval(obstacleMonitor, 800);
}

function endGame() {
    clearInterval(bgTimer);
    clearInterval(bgTimer);
}

function init() {
    can1 = document.getElementById('canvas1'); //背景、移动景物、障碍物
    can2 = document.getElementById('canvas2'); //人物、分数、
    can3 = document.getElementById('canvas3');  //消失分数
    can4 = document.getElementById('canvas4');
    can1.width = canvasW;
    can1.height = canvasH;
    can3.width = canvasW;
    can3.height = canvasH;
    can4.width = canvasW;
    can4.height = canvasH;

    can2.width = canvasW;
    can2.height = canvasH;

    ctx1 = can1.getContext('2d');
    ctx2 = can2.getContext('2d');
    ctx3 = can3.getContext('2d');
    ctx4 = can4.getContext('2d');
    bgPic = new Image();
    bgPic.src = './imgs/bg.jpg';
    for (var i = 0; i < 2; i++) {
        giftList[i] = new Image();
        giftList[i].src = './imgs/gift' + i + '.png';
    }

    background = new backgroundObj();
    background.init();

    obstacle = new obstacleObj();
    obstacle.init();

    runner = new runnerObj();
    runner.init();
    score1 = new scoreObj1();
    score1.init();

    score2 = new scoreObj2();
    score2.init();

    data = new dataObj();
    data.init();

    touchMove();
    onkeyDown();
}

function gameloop() {
    window.requestAnimationFrame(gameloop);
    var now = new Date();
    deltaTime = now - lastTime;
    lastTime = now;
    // console.log(deltaTime)
    if (deltaTime >= 40) {
        deltaTime = 40;
    }
    drawBackground();
    background.draw(); //绘制两边移动景物
    ctx2.clearRect(0, 0, canvasW, canvasH);
    runner.draw();
    obstacle.draw(); //绘制障碍物

    collisionZA();

    score1.draw();
    score2.draw();
    // ctx3.clearRect(0, 0, canvasW, canvasH);
    data.draw();
}

function drawBackground() {
    ctx1.drawImage(bgPic, 0, 0, canvasW, canvasH);
}

function touchMove() {
    var satrtX, startY, endX, endY;
    document.getElementById('page2').addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
    can2.addEventListener('touchstart', function (e) {
        if (!data.gameOver) {
            if (e.changedTouches || e.touches) {
                satrtX = e.changedTouches != undefined ? e.changedTouches[0].clientX : e.touches[0].clientX;
                startY = e.changedTouches != undefined ? e.changedTouches[0].clientY : e.touches[0].clientY;
            }
        } else {
            return;
        }
    }, false);
    can2.addEventListener('touchend', function (e) {
        if (!data.gameOver) {
            if (e.changedTouches || e.touches) {
                endX = e.changedTouches != undefined ? e.changedTouches[0].clientX : e.touches[0].clientX;
                endY = e.changedTouches != undefined ? e.changedTouches[0].clientY : e.touches[0].clientY;
            }
            if (Math.abs(endX - satrtX) < Math.abs(endY - startY) && (endY - startY) < 0) {
                runner.jump = true;
            }
            if (Math.abs(endX - satrtX) > Math.abs(endY - startY) && (endX - satrtX) > 0) { //==>向右滑
                switch (runner.direction) {
                    case 'l':
                        runner.direction = 'm';
                        break;
                    case 'm':
                        runner.direction = 'r';
                        break;
                }

            } else if (Math.abs(endX - satrtX) > Math.abs(endY - startY) && (endX - satrtX) < 0) { //==>向左滑动
                switch (runner.direction) {
                    case 'r':
                        runner.direction = 'm';
                        break;
                    case 'm':
                        runner.direction = 'l';
                        break;
                }
            }
        }   
    }, false);
}
// 定义鼠标移动时间
function onkeyDown(e) {
    document.onkeydown = function (e) {
        if (!data.gameOver) {
            var x = event.keyCode;
            if (x == 38) {
                runner.jump = true;
            }
            if (x == 39) { //==>向右滑
                switch (runner.direction) {
                    case 'l':
                        runner.direction = 'm';
                        break;
                    case 'm':
                        runner.direction = 'r';
                        break;
                }

            } else if (x == 37) { //==>向左滑动
                switch (runner.direction) {
                    case 'r':
                        runner.direction = 'm';
                        break;
                    case 'm':
                        runner.direction = 'l';
                        break;
                }
            }
        }
    };

}