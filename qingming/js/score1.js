var scoreObj1 = function () {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.color = [];
    this.l = [];
    this.alpha = [];
    this.score = [];
    this.Stype = [];
};
scoreObj1.prototype.num = 5;
scoreObj1.prototype.init = function () {
    var l = this.num;
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.l[i] = 12;
    }
};
scoreObj1.prototype.born = function (x, y,score,type) {
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            this.alive[i] = true;
            this.x[i] = x;
            this.y[i] = y;
            this.score[i] = score;
            this.Stype[i] = type == 'gift' ? "rgba(0,255,0," : "rgba(255,0,0,";
        }
    }
};
scoreObj1.prototype.draw = function () {
    // ctx2.clearRect(0,0,canvasW,canvasH);
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            this.l[i] += 17 * 0.02;
            if (this.l[i] > 24) {
                this.alive[i] = false;
                this.l[i] = 12;
                break;
            }
            this.alpha[i] = 1 - this.l[i] / 24;
            ctx1.save();
            ctx1.beginPath();
            ctx1.font = '15px Verdana';
            ctx1.textAlign = 'center';
            ctx1.fillStyle = this.Stype[i] + this.alpha[i] + ")";
            ctx1.font = this.l[i];
            ctx1.fillText(this.score[i], this.x[i], this.y[i]-this.l[i]);
            ctx1.closePath();
            ctx1.restore();
        }
    }
};