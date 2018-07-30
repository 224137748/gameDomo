var obstacleObj = function () {
    this.x = [];
    this.y = [];
    this.picType = []; //0-left 1-mid   2-right
    this.l = [];
    this.spd = 1;
    this.levelPic = new Image();
    this.verticalPic = new Image();
    this.alive = [];
    this.layer = [];
    this.giftNum = [];
    this.MType = [];
};
obstacleObj.prototype.num = 8;
obstacleObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.layer[i] = false;
    }
    obstacleMonitor();
    this.levelPic.src = './imgs/level.png';
    this.verticalPic.src = './imgs/vertical.png';
};
obstacleObj.prototype.born = function (i) {
    this.alive[i] = true;
    this.l[i] = 0.3;
    this.y[i] = 220;
    this.picType[i] = Math.floor(Math.random() * 3);
    switch (this.picType[i]) {
        case 0:
            this.x[i] = canvasW * 0.5 - 50;
            break;
        case 1:
            this.x[i] = canvasW * 0.5;
            break;
        case 2:
            this.x[i] = canvasW * 0.5 + 50;
            break;
    }
    this.MType[i] = Math.random()*2>1 ?'obsracle':'gift';
    if(this.MType[i] == 'gift'){
        this.giftNum[i] = Math.floor(Math.random() * 2 );
    }
};
obstacleObj.prototype.draw = function () {
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            var pic;
            if (this.picType[i] == 0 || this.picType[i] == 2) {
                if(this.MType[i] == 'obsracle'){
                    pic = this.verticalPic;
                }else{
                    pic = giftList[this.giftNum[i]];
                }
            } else {
                if(this.MType[i] == 'obsracle'){
                    pic = this.levelPic;
                }else{
                    pic = giftList[this.giftNum[i]];
                }
            }
            var picWidth = pic.width * this.l[i];
            var picHeight = pic.height * this.l[i];
            if (!this.layer[i]) {
                ctx1.drawImage(pic, this.x[i] - picWidth * 0.5, this.y[i] - picHeight * 0.5, picWidth, picHeight);
            } else {
                ctx2.drawImage(pic, this.x[i] - picWidth * 0.5, this.y[i] - picHeight * 0.5, picWidth, picHeight);
            }
            switch (this.picType[i]) {
                case 0:
                    this.x[i] -= 0.02 * deltaTime;
                    break;
                case 2:
                    this.x[i] += 0.02 * deltaTime;
                    break;
                default:
                    break;
            }

            this.y[i] += 0.1 * deltaTime;
            if (this.y[i] > (canvasH + pic.height)) {
                this.alive[i] = false;
                this.layer[i] = false;

            }
            this.l[i] += 0.0002 * deltaTime;
            if (this.l[i] >= 1) {
                this.l[i] = 1;
            }
        }
    }
};
obstacleObj.prototype.dead = function(i){
    this.alive[i] = false;
    this.layer[i] = false;
};

function obstacleMonitor() {
    var num = 0;
    for (var i = 0; i < obstacle.num; i++) {
        if (obstacle.alive[i]) {
            num++;
        }
    }
    if (num < 5) {
        addObstacle();
        return;
    }
}

function addObstacle() {
    for (var i = 0; i < obstacle.num; i++) {
        if (!obstacle.alive[i]) {
            obstacle.born(i);
            return;
        }
    }
}