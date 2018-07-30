var dataObj = function(){
    this.obstacleNum;   //碰到障碍数量
    this.red;   //碰到礼物数量
    this.green;  //0代表10分，1代表20分
    this.score;
    this.gameOver;
    this.alpha;
    this.time;
};
dataObj.prototype.init = function(){
    this.gameOver = false;
    this.score = 0;
    this.obstacleNum = 0;
    this.red = 0;
    this.green = 0;
    this.time = 30;
    this.alpha = 0;
};
dataObj.prototype.draw = function(){
    var w  = canvasW * 0.5;
    var h = canvasH * 0.5;
    this.time = (parseFloat(this.time) - deltaTime * 0.001).toFixed(2);
    if(parseFloat(this.time) <= 0){
        this.time = 0;
        this.gameOver = true;
    }
    ctx1.save();
    ctx1.fillStyle = 'balck';
    ctx1.font = '25px Verdana';
    ctx1.textAlign = 'center';
    ctx1.shadowOffsetX = 1;
    ctx1.shadowOffsetY = 1;
    ctx1.shadowColor = 'black';
    ctx1.beginPath();
    ctx1.fillText('Score:'+this.score,w,50);
    ctx1.fillText('Time:'+this.time,w,100);
    ctx1.closePath();
    ctx1.restore();
    if(this.gameOver){
        this.alpha += deltaTime * 0.001;
        if(this.alpha>1){
            this.alpha = 1;
        }
        ctx2.save();
        ctx2.font = "30px Verdana";
        ctx2.shadowBlur = 20;
        ctx2.shadowColor = 'black';
        ctx2.fillStyle = "rgba(0,0,0,"+this.alpha+")";
        ctx2.textAlign = 'center';
        ctx2.beginPath();
        ctx2.fillText('GAME OVER',w,h);
        ctx2.closePath();
        ctx2.restore();
    }
};
dataObj.prototype.addScore = function(){
    if(!this.gameOver){
        this.score = this.obstacleNum * (-40) + this.red *10 +this.green * 20;
    }
};
