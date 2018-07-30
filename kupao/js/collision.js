// 碰撞检测
//obstacle.MType 对障碍物和礼物分别进行碰撞检测
function collisionZA() {
    var runY_bottom = runner.y + runner.runNer.height * 0.25;
    for (var i = 0; i < obstacle.num; i++) {
        if (obstacle.alive[i]) {
            if (obstacle.picType[i] != 1) {
                if ((obstacle.y[i] + obstacle.verticalPic.height * 0.25) > canvasH * 0.5 + 15) {
                    obstacle.layer[i] = true;
                }
            }

            if (obstacle.MType[i] == 'obsracle') {
                var length = (runner.y + runner.runNer.height * 0.5) - (obstacle.y[i] + obstacle.levelPic.height * 0.5);
                switch (obstacle.picType[i]) {
                    case 1:
                        if (length < 10 && runner.jump == false && length > 0) {
                            console.log('碰到啦~！');
                            data.obstacleNum++;
                            data.addScore();
                            obstacle.dead(i);
                        }
                        if (length < 0 && (runner.y + runner.runNer.height * 0.5) > (obstacle.y[i] - obstacle.levelPic.height * 0.5) && runner.jump == false) {
                            console.log('碰到啦~！');
                            data.obstacleNum++;
                            data.addScore();
                            obstacle.dead(i);
                        }
                        break;
                    case 0:
                        var bottomL = (runner.y + runner.runNer.height * 0.25) - (obstacle.y[i] + obstacle.verticalPic.height * 0.25);
                        if (runner.jump && runner.direction == 'l') {
                            // var levelX = Math.abs(runner.x-obstacle.x[i])<(runner)
                            if (obstacle.y[i] - 10 > canvasH * 0.5 && (obstacle.y[i] - obstacle.verticalPic.height * 0.25) < runY_bottom) {
                                console.log('左边碰到啦~！');
                                data.obstacleNum++;
                                data.addScore();
                                obstacle.dead(i);
                            }
                        } else {
                            if (bottomL < 10 && runner.direction == 'l' && bottomL > 0) {
                                console.log('左边碰到啦~！');
                                data.obstacleNum++;
                                data.addScore();
                                obstacle.dead(i);
                            }
                        }
                        break;
                    default:
                        var bottomR = (runner.y + runner.runNer.height * 0.25) - (obstacle.y[i] + obstacle.verticalPic.height * 0.25);
                        if (runner.jump && runner.direction == 'r') {
                            // 添加系数做细微调整
                            if (obstacle.y[i] - 10 > canvasH * 0.5 && (obstacle.y[i] - obstacle.verticalPic.height * 0.25) < runY_bottom) {
                                console.log('右边碰到啦~！');
                                data.obstacleNum++;
                                data.addScore();
                                obstacle.dead(i);
                            }

                        } else {
                            if (bottomR < 10 && runner.direction == 'r' && bottomR > 0) {
                                console.log('右边碰到啦~！');
                                data.obstacleNum++;
                                data.addScore();
                                obstacle.dead(i);
                            }
                        }
                }
            } else {
                // 通过判断l\m\r 和 0 1 2
                var distance = calLength2(runner.x, runner.y, obstacle.x[i], obstacle.y[i]);
                // 
                if (distance < 100) {
                    if (obstacle.giftNum[i] == 0 && !runner.jump ) {
                        console.log('碰到红色,加10分');
                        data.red++;
                        data.addScore();
                        obstacle.dead(i);
                        score1.born(runner.x,runner.y-runner.runNer.height*0.5);
                    }else if(obstacle.giftNum[i] == 1 && !runner.jump ){
                        console.log('碰到绿色,加20分');
                        data.green++;
                        data.addScore();
                        obstacle.dead(i);
                        score2.born(runner.x,runner.y-runner.runNer.height*0.5);
                    }
                }
            }
        }
    }
}

function calLength2(x1, y1, x2, y2) {
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}