var runnerObj = function () {
    this.x;
    this.y;
    this.direction;     //左右移动
    this.jump;    //是否跳跃
    this.angle;
    this.runNer = new Image();
};
runnerObj.prototype.init = function () {
    this.x = canvasW * 0.5;
    this.y = canvasH * 0.5;
    this.direction = 'm';
    this.jump = false;
    this.angle = 0;
    this.runNer.src = './imgs/runner.png';
};
runnerObj.prototype.draw = function () {
    if(this.jump){
        this.angle += 0.005 *deltaTime;
        
        if(this.angle>Math.PI){
            this.angle = Math.PI;
            this.jump = false;
            this.angle = 0;
        }
        var sin = Math.sin(this.angle);
        this.y = canvasH * 0.5 - 80 *sin;
    }
    switch (this.direction) {
        case 'l':
            this.x = lerpDistance(canvasW * 0.5 - 80, this.x, 0.9);
            break;
        case 'r':
            this.x = lerpDistance(canvasW * 0.5 + 80, this.x, 0.9);
            break;
        case 'm':
            this.x = lerpDistance(canvasW * 0.5 , this.x, 0.8);
            break;
        default:
            break;
    }
    ctx2.save();
    // 整个图像的中心在移动
    ctx2.translate(this.x, this.y);
    ctx2.drawImage(this.runNer,-this.runNer.width*0.5,-this.runNer.height*0.5);
    ctx2.restore();


};

function lerpDistance(aim, cur, ratio) {
    var delta = cur - aim;
    return aim + delta * ratio;
}