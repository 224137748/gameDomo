var ctx1;
var ctx2;
var can1;
var can2;
var lastTime;
var deltaTime;

var mx, my;

var canvasW = document.documentElement.clientWidth;
var canvasH = document.documentElement.clientHeight;
var space; //左右间距
var background; //游戏背景
var person; //人物
var bodyTail = [];

var gameTimer; //游戏定时器
var obstacle; //障碍物
var obstacleTimer; //障碍物检测定时器
var gifList = []; //花草
var strList = []; //石头，障碍
var data;
var score1; //分数增加、减少动画

document.body.onload = startGame;

function startGame() {
    var startBtn = document.getElementById('startBtn');
    var facePage = document.getElementById('facePage');
    var page = document.getElementById('page2');
    startBtn.addEventListener('click', function () {
        facePage.className += " fadeOut";
        setTimeout(function () {
            facePage.style.display = "none";
            page.style.display = "block";

            //开始游戏
            game();
            // 播放音乐
            bgMusic();
        }, 800);
    }, false);
    //音乐播放添加 
    var obsM = document.getElementById('obsc');
    var gifM = document.getElementById('gift');
    document.addEventListener("WeixinJSBridgeReady", function () {
        gifM.play();
        gifM.pause();
        obsM.play();
        obsM.pause();
    }, false);
}

function game() {
    init();
    lastTime = new Date();
    deltaTime = 0;
    gameLoop();
}

function init() {
    can1 = document.getElementById('canvas1');
    // can2 = document.getElementById('canvas2');
    can1.width = canvasW;
    can1.height = canvasH;
    // can2.width = canvasW;
    // can2.height = canvasH;
    space = canvasW * 0.5 - 92;



    ctx1 = can1.getContext('2d'); //绘制背景 分数 人物  果实  障碍
    // ctx2 = can2.getContext('2d'); //绘制

    // 游戏背景
    background = new backgroundObj();
    background.init();

    //人物
    person = new personObj();
    person.init();
    for (var i = 0; i < 2; i++) {
        bodyTail[i] = new Image();
        bodyTail[i].src = "./imgs/person" + i + ".png";
    }
    //障碍物
    obstacle = new obstacleObj();
    obstacle.init();
    for (var j = 0; j < 3; j++) {
        gifList[j] = new Image();
        strList[j] = new Image();
        gifList[j].src = './imgs/flower' + j + '.png';
        strList[j].src = './imgs/stone' + j + '.png';
    }
    data = new dataObj();
    data.init();

    score1 = new scoreObj1();
    score1.init();

    // 操作
    onkeyDown();
    touchMove();

    bind();     //
}



function endGame() {
    clearInterval(gameTimer);
    document.getElementById('page3').className += ' success';
}

function gameLoop() {
    gameTimer = setInterval(function () {
        var now = new Date();
        deltaTime = now - lastTime;
        lastTime = now;
        // 游戏背景
        background.draw();
        obstacle.draw(); //障碍物动画
        collision(); //碰撞检测
        data.draw(); //时间、分数显示
        score1.draw(); //分数增加、减少动画
        obstacleMonitor(); // 更新障碍池

        // 人物动画帧
        person.draw();
    }, 17);
}



function touchMove() {
    var satrtX, startY, endX, endY;
    document.getElementById('page2').addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
    can1.addEventListener('touchstart', function (e) {
        if (!data.gameOver) {
            if (e.changedTouches || e.touches) {
                satrtX = e.changedTouches != undefined ? e.changedTouches[0].clientX : e.touches[0].clientX;
                startY = e.changedTouches != undefined ? e.changedTouches[0].clientY : e.touches[0].clientY;
            }
        } else {
            return;
        }
    }, false);
    can1.addEventListener('touchend', function (e) {
        if (!data.gameOver) {
            if (e.changedTouches || e.touches) {
                endX = e.changedTouches != undefined ? e.changedTouches[0].clientX : e.touches[0].clientX;
                endY = e.changedTouches != undefined ? e.changedTouches[0].clientY : e.touches[0].clientY;
            }
            if (Math.abs(endX - satrtX) < Math.abs(endY - startY) && (endY - startY) < 0) {
                person.jump = true;
            }
            if (Math.abs(endX - satrtX) > Math.abs(endY - startY) && (endX - satrtX) > 0) { //==>向右滑
                switch (person.direction) {
                    case 'l':
                        person.direction = 'm';
                        break;
                    case 'm':
                        person.direction = 'r';
                        break;
                }

            } else if (Math.abs(endX - satrtX) > Math.abs(endY - startY) && (endX - satrtX) < 0) { //==>向左滑动
                switch (person.direction) {
                    case 'r':
                        person.direction = 'm';
                        break;
                    case 'm':
                        person.direction = 'l';
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
                person.jump = true;
            }
            if (x == 39) { //==>向右滑
                switch (person.direction) {
                    case 'l':
                        person.direction = 'm';
                        break;
                    case 'm':
                        person.direction = 'r';
                        break;
                }

            } else if (x == 37) { //==>向左滑动
                switch (person.direction) {
                    case 'r':
                        person.direction = 'm';
                        break;
                    case 'm':
                        person.direction = 'l';
                        break;
                }
            }
        }
    };

}

// 判断分数

function bind(){
    replay();   //监听replay事件
    reback();   //监听reback事件
}
// replay函数
function replay(){
    var rpBtn1 = document.getElementById('rp');
    var rpBtn2 = document.getElementById('replay');
    var page3 = document.getElementById('page3');
    rpBtn1.onclick = fn;
    rpBtn2.onclick = fn;
    function fn(){
        lastTime = new Date();
        deltaTime = 0;
        ctx1.clearRect(0,0,canvasW,canvasH);
        page3.className = "page p3";
        data.init();
        score1.init();
        person.init();
        background.init();
        obstacle.init();
        gameLoop();
        
    }

}
function reback(){
    var rebackBtn = document.getElementById('reback');
    rebackBtn.onclick = function(){
        window.location.reload();
    };
}

// BGM
function bgMusic(){
    var $btnMusic = $('#micBtn');
    var startGameBtn  = document.getElementById('startBtn');

		function audioAutoPlay(id) {
			var audio = document.getElementById(id);
			audio.play();
			document.addEventListener("WeixinJSBridgeReady", function () {
                alert(11)
				audio.play();
			}, false);
			$btnMusic.addClass('play')
		}
		$btnMusic.click(function () {
			var audio = document.getElementById('bgm');
			if (audio.paused) {
				audio.play();
				$(this).addClass('play');
			} else {
				audio.pause();
				$(this).removeClass('play');
			}
		});
		audioAutoPlay('bgm');
} 
// gif music
function gifMusic(){
    var gifM = document.getElementById('gift');
    
    gifM.play();
}
// obs music
function obsMusic(){
    var obsM = document.getElementById('obsc');
    obsM.play();
}
