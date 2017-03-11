/**
 * Created by Administrator on 2017/3/10 0010.
 */
!function () {
    var start = document.getElementById('start');
    var box = document.getElementById('box');
    var progress = document.getElementById('progress');
    var x =180;
    var timeId = null;
    var i = 0;
    var score = 0;
    var positions = [        //巧妙之处，将位置加入到一个数组之中，然后随机。
        {l: "98px", t: "113px"},
        {l: "21px", t: "158px"},
        {l: "187px", t: "140px"},
        {l: "103px", t: "191px"},
        {l: "17px", t: "219px"},
        {l: "200px", t: "211px"},
        {l: "30px", t: "292px"},
        {l: "119px", t: "272px"},
        {l: "206px", t: "294px"}
    ];
    start.onclick = function () { //进度条动画
        start.style.display = 'none';
       timeId = setInterval(function () {
            x-=5;
           progress.style.width = x+'px';
           if( x==-5 ){
                alert('游戏结束!');
                window.location.reload();
            }
       },1000);
        setInterval(randomWolf,1500);
    };

function randomWolf () {        //随机灰太狼
        var randomNumx = Math.floor(Math.random()*100);
        var randomNum = Math.floor(Math.random()*9);
        var type = (randomNumx >= 80) ?'x':'h';   //完美利用随机数分出小灰灰和灰太狼。
        var imgx = document.createElement('img');
        imgx.src = 'img/'+type+'0.png';
        imgx.style.left = positions[randomNum].l;
        imgx.style.top = positions[randomNum].t;
        box.appendChild(imgx);
        var up = 0;
        var downtimer = null;
        uptimer = setInterval(function () {    //通过改变img中的数让灰太狼上升
            up++;
            imgx.src = 'img/'+type+up+'.png';
            if(up == 5){
                clearInterval(uptimer);          //通过改变img中的数让灰太狼下降
                var down =4;
                downtimer = setInterval(function () {
                    down--;
                    imgx.src = 'img/' + type + down + '.png';
                        if(down == 0){
                            box.removeChild(imgx);
                            clearInterval(downtimer);
                        }
                },150)
            }
        },150);
        imgx.onclick = function () {              //打击动画，独立于上下动画之外，可以使任何时间都能打击。
            var scoreDiv = document.getElementById('score');
            clearInterval(uptimer);
            clearInterval(downtimer);
            var isHit = false;    //阻止连续打击
            if(isHit==false){
                isHit = true;
            }else {
                return;
            }
            if(type == 'h'){     //分数
                score+=10;
            }else {
                if(score==0){
                    score = 0;
                }else {
                    score-=10;
                }
            }
            scoreDiv.innerText = score;
            var hit = 6;
            var hitTimer = setInterval(function () {
                hit++ ;
                imgx.src = 'img/' + type + hit + '.png';
                if (hit==9){
                    clearInterval(hitTimer);
                    box.removeChild(imgx);
                }
            },150)
        };
    }
}();