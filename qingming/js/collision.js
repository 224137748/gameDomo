function collision(){
    for(var i = 0;i<obstacle.num;i++){
        if(obstacle.alive[i]){
            var len = calLength2(obstacle.x[i],obstacle.y[i],person.x,person.y);
            if(len<400){
                if(obstacle.picType[i]=="gift"){    //吃到果实
                    console.log('吃到果实！');
                    switch (obstacle.giftNum[i]){
                        case 0:
                            data.flower++;
                            score1.born(person.x,person.y-54,"+10",'gift');
                            break;
                        case 1:
                            data.flower++;
                            score1.born(person.x,person.y-54,"+10",'gift');
                            break;
                        case 2:
                            data.mushroom++;
                            score1.born(person.x,person.y-54,"+20",'gift');
                            break;
                    }
                    gifMusic();
                }else{
                    obsMusic();
                    console.log('碰到石头了');
                    data.obstacleNum++;
                    score1.born(person.x,person.y-54,"-30",'obsracle');
                }
                obstacle.dead(i);
                data.addScore();
            }

        }
    }
}
function calLength2(x1, y1, x2, y2) {
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}