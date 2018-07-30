var scoreObj1 = function () {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.color = [];
    this.l = [];
    this.alpha = [];
};
scoreObj1.prototype.num = 5;
scoreObj1.prototype.init = function () {
    var l = this.num;
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.l[i] = 12;
    }
};
scoreObj1.prototype.born = function (x, y) {
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            this.alive[i] = true;
            this.x[i] = x;
            this.y[i] = y;
        }
    }
};
scoreObj1.prototype.draw = function () {
    ctx3.clearRect(0,0,canvasW,canvasH);
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            this.l[i] += deltaTime * 0.02;
            if (this.l[i] > 24) {
                this.alive[i] = false;
                this.l[i] = 12;
                break;
            }
            this.alpha[i] = 1 - this.l[i] / 24;
            ctx3.beginPath();
            ctx3.font = '15px Verdana';
            ctx3.textAlign = 'center';
            ctx3.fillStyle = "rgba(255,0,0," + this.alpha[i] + ")";
            ctx3.font = this.l[i];
            ctx3.fillText('+10', this.x[i], this.y[i]-this.l[i]);
            ctx3.closePath();
        }
    }
};