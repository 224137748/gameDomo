var dataObj = function(){
    this.obstacleNum;   //碰到障碍数量
    this.flower;   //碰到花数量 10分
    this.mushroom;  //碰到蘑菇数量  20分
    this.score;
    this.scorePic = new Image();
    this.gameOver;
    this.alpha;
    this.timePic = new Image();
    this.time;
};
dataObj.prototype.init = function(){
    this.gameOver = false;
    this.score = 0;
    this.obstacleNum = 0;
    this.mushroom = 0;
    this.flower = 0;
    this.time = 30;
    this.alpha = 0;
    this.scorePic.src = './imgs/score_bg.png';
    this.timePic.src = "./imgs/timer_bg.png";
};
dataObj.prototype.draw = function(){
    var w  = canvasW * 0.5;
    var h = canvasH * 0.5;
    this.time = (parseFloat(this.time) - deltaTime * 0.001).toFixed(2);
    if(parseFloat(this.time) <= 0){
        this.time = 0;
        if(!this.gameOver){
            setTimeout(endGame,1500);   //游戏结束
        }
        this.gameOver = true;
         
    }
    ctx1.drawImage(this.scorePic,110-this.scorePic.width*0.25,35-this.scorePic.height*0.25,this.scorePic.width*0.5,this.scorePic.height*0.5);
    ctx1.drawImage(this.timePic,259-this.timePic.width*0.25,35-this.timePic.height*0.25,this.timePic.width*0.5,this.timePic.height*0.5);
    ctx1.save();
    ctx1.fillStyle = 'white';
    ctx1.font = '16px Verdana';
    ctx1.textAlign = 'center';
    ctx1.shadowOffsetX = 1;
    ctx1.shadowOffsetY = 1;
    ctx1.shadowColor = 'white';
    ctx1.beginPath();
    ctx1.fillText(this.score,120,42);
    ctx1.fillText(this.time,270,42);
    ctx1.closePath();
    
    if(this.gameOver){
        this.alpha += deltaTime * 0.001;
        if(this.alpha>1){
            this.alpha = 1;
        }
        ctx1.save();
        ctx1.font = "30px Verdana";
        ctx1.shadowBlur = 20;
        ctx1.shadowColor = 'black';
        ctx1.fillStyle = "rgba(0,255,0,"+this.alpha+")";
        ctx1.textAlign = 'center';
        ctx1.beginPath();
        ctx1.fillText('GAME OVER',w,h);
        ctx1.closePath();
        ctx1.restore();
    }
    ctx1.restore();
};
dataObj.prototype.addScore = function(){
    if(!this.gameOver){
        this.score = this.obstacleNum * (-30) + this.flower *10 +this.mushroom * 20;
    }
};
