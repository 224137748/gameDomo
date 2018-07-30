var obstacleObj = function(){
    this.x = [];
    this.y = [];
    this.alive = [];
    this.direcType = [];
    this.picType = [];
    this.giftNum = [];  //0花 1草 2蘑菇
    this.obstacleNum = [];  //0石头 1松鼠 2兔子
    this.bornTimer = 0;

};
obstacleObj.prototype.num = 10;
obstacleObj.prototype.init = function(){
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        // this.layer[i] = false;
    }
    obstacleMonitor();
};
obstacleObj.prototype.born = function(i){
    this.alive[i] = true;
    this.y[i] = -30;
    this.direcType[i] = Math.floor(Math.random() * 3);    //随机分布，左中右  0 1 2
    switch (this.direcType[i]) {
        case 0:
            this.x[i] = 92;
            break;
        case 1:
            this.x[i] = canvasW * 0.5;
            break;
        case 2:
            this.x[i] = canvasW*0.5+space;
            break;
    }
    this.picType[i] = Math.random()*2>1 ?'obsracle':'gift';
    if(this.picType[i] == 'gift'){
        this.giftNum[i] = Math.floor(Math.random() * 3 );
    }else{
        this.obstacleNum[i] = Math.floor(Math.random() * 3 );
    }
};
obstacleObj.prototype.draw = function(){
    for(var i = 0; i<this.num;i++){
        if(this.alive[i]){
            var pic;
            if(this.picType[i] == 'gift'){
                pic = gifList[this.giftNum[i]];
            }else{
                pic = strList[this.obstacleNum[i]];
            }
            this.y[i] +=2;
            if(this.y[i]-pic.height*0.25>canvasH){
                this.alive[i] = false;
            }
            ctx1.drawImage(pic,this.x[i]-pic.width*0.25,this.y[i]-pic.height*0.25,pic.width*0.5,pic.height*0.5);
        }
    }
};
obstacleObj.prototype.dead = function(i){
    this.alive[i] = false;
}
function obstacleMonitor(){
    var num = 0;

    for(var i = 0; i<obstacle.num;i++){
        if(obstacle.alive[i]){
            num++;
        }
    }
    obstacle.bornTimer+=2;
    if(num<7 && obstacle.bornTimer>=120){
        addObstacle();
        obstacle.bornTimer%=120;
        return;
    }
}
function addObstacle(){
    for(var i = 0; i<obstacle.num;i++){
        if(!obstacle.alive[i]){
            obstacle.born(i);
            return;
        }
    }

}
