var backgroundObj = function () {
    this.x = [];
    this.x2 = [];
    this.y = [];
    this.l = []; //图片大小系数
    this.alive = [];
    this.stone = new Image(); //石头
    this.shu = new Image(); //仙人掌
    this.spd; //移动速度增长系数
    this.picType = [];

};
backgroundObj.prototype = {
    num: 10,
    changeType: true,
    init: function () {
        for (var i = 0; i < this.num; i++) {
            this.alive[i] = false;
        }
        Monitor();
        this.spd = 1;
        this.stone.src = './imgs/stone.jpg';
        this.shu.src = './imgs/shu.jpg';
    },
    draw: function () {

        for (var i = 0; i < this.num; i++) {
            if (this.alive[i]) {
                var pic;
                if (this.picType[i] == 'stone') {
                    pic = this.stone;
                } else {
                    pic = this.shu;
                }
                
                var picWidth = pic.width * this.l[i];
                var picHeight = pic.height * this.l[i];

                ctx1.drawImage(pic, this.x[i] - picWidth * 0.5, this.y[i] - picHeight, picWidth, picHeight);
                ctx1.drawImage(pic, this.x2[i] - picWidth * 0.5, this.y[i] - picHeight, picWidth, picHeight);
                this.x[i] -= 0.05 * deltaTime;
                this.x2[i] += 0.05 * deltaTime;
                this.y[i] += 0.1 * deltaTime;
                if (this.x[i] < -pic.width) {
                    this.alive[i] = false;
                }
                this.l[i] += 0.0002*deltaTime;
                if (this.l[i] >= 1) {
                    this.l[i] = 1;
                }
            }
        }

    },
    born: function (i) {
        this.x[i] = canvasW * 0.5 - 100;
        this.x2[i] = canvasW * 0.5 + 100;
        this.y[i] = 200;
        this.l[i] = 0.3;
        this.alive[i] = true;
        if (this.changeType) {
            this.picType[i] = 'shu';
            this.changeType = !this.changeType;
        } else {
            this.picType[i] = 'stone';
            this.changeType = !this.changeType;
        }
    },
    dead: function (i) {
        this.alive[i] = false;
    }
};
 function addPic() {
    for (var i = 0; i < background.num; i++) {
        if (!background.alive[i]) {
            background.born(i);
            return;
        }
    }
}
function Monitor() {
    var num = 0;
    for (var i = 0; i < background.num; i++) {
        if (background.alive[i]) {
            num++;
        }
        // console.log(num)
    }
    if (num < 5) {
        addPic();
        return;
    }

}