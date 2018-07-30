var personObj = function(){
    this.x;
    this.y;
    this.direction;
    this.angle;
    this.bodyTimer = 0;
    this.bodyCount = 0;
    this.jump;
};
personObj.prototype.init = function(){
    this.x = canvasW/2;
    this.y = 888/2;
    this.direction = 'm';
    this.jump = false;
};
personObj.prototype.draw = function(){
    switch (this.direction) {
        case 'l':
            this.x = lerpDistance(92, this.x, 0.92);
            break;
        case 'r':
            this.x = lerpDistance(canvasW*0.5+space, this.x, 0.92);
            break;
        case 'm':
            this.x = lerpDistance(canvasW*0.5 , this.x, 0.92);
            break;
        default:
            break;
    }
    this.bodyTimer+=14;
    if(this.bodyTimer>200){
        this.bodyCount = (this.bodyCount+1) % 2;
        this.bodyTimer%=200;
    }
    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.drawImage(bodyTail[this.bodyCount],-bodyTail[this.bodyCount].width*0.25,-bodyTail[this.bodyCount].height*0.25,bodyTail[this.bodyCount].width/2,bodyTail[this.bodyCount].height/2);
    ctx1.restore();
};
function lerpDistance(aim, cur, ratio) {
    var delta = cur - aim;
    return aim + delta * ratio;
}