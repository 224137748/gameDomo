var scoreObj2 = function () {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.color = [];
    this.l = [];
    this.alpha = [];
};
scoreObj2.prototype.num = 5;
scoreObj2.prototype.init = function () {
    var l = this.num;
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.l[i] = 12;
    }
};
scoreObj2.prototype.born = function (x, y) {
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            this.alive[i] = true;
            this.x[i] = x;
            this.y[i] = y;
        }
    }
};
scoreObj2.prototype.draw = function () {
    ctx4.clearRect(0,0,canvasW,canvasH);
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            this.l[i] += deltaTime * 0.02;
            if (this.l[i] > 24) {
                this.alive[i] = false;
                this.l[i] = 12;
                break;
            }
            this.alpha[i] = 1 - this.l[i] / 24;
            ctx4.beginPath();
            ctx4.font = '15px Verdana';
            ctx4.textAlign = 'center';
            ctx4.fillStyle = "rgba(0,255,0," + this.alpha[i] + ")";
            ctx4.font = this.l[i];
            ctx4.fillText('+20', this.x[i], this.y[i]-this.l[i]);
            ctx4.closePath();
        }
    }
};