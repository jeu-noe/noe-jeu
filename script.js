<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Jeu de Noé 🎮</title>

<style>
body{
  margin:0;
  font-family:Arial;
  text-align:center;
  background:turquoise;
  overflow:hidden;
}

/* MENU */
#menu{
  position:absolute;
  top:20%;
  left:50%;
  transform:translate(-50%,-50%);
}

/* UI */
#ui{
  display:none;
  font-size:20px;
}

/* BOUTONS */
button{
  font-size:30px;
  padding:20px;
  border-radius:10px;
  position:absolute;
}
.good{background:lightgreen;color:lightblack;}
.bad{background:red;color:white;}
.bonus{background:darkgreen;color:white;}
/* EXPLOSION SIMPLE */
#boom{
  position:absolute;
  width:80px;
  height:80px;
  border-radius:50%;
  background:orange;
  display:none;
}
</style>

</head>

<body>

<div id="menu">
<h1> Jeu de Noé 🎮</h1>
<button id="start">Jouer</button>
</div>

<div id="ui">
Score: <span id="score">0</span> |
Temps: <span id="temps">15</span> |
❤️ Vies: <span id="vies">2</span>
</div>

<button id="good" class="good">+1</button>
<button id="bad" class="bad">-1</button>

<div id="boom"></div>

<!-- MUSIQUE INTERNET -->
<audio id="audio" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop></audio>

<script>
let score=0, temps=15, vies=2, jeu=false, timer;

const good=document.getElementById("good");
const bad=document.getElementById("bad");
const start=document.getElementById("start");
const boom=document.getElementById("boom");
const scoreEl=document.getElementById("score");
const tempsEl=document.getElementById("temps");
const viesEl=document.getElementById("vies");
const audio=document.getElementById("audio");
const menu=document.getElementById("menu");
const ui=document.getElementById("ui");

function move(el){
  let x=Math.random()*(window.innerWidth-120);
  let y=Math.random()*(window.innerHeight-150);
  el.style.left=x+"px";
  el.style.top=y+"px";
}

function update(){
  scoreEl.textContent=score;
  tempsEl.textContent=temps;
  viesEl.textContent=vies;
}

function explosion(){
  boom.style.display="block";
  boom.style.left=(window.innerWidth/2-40)+"px";
  boom.style.top=(window.innerHeight/2-40)+"px";
  setTimeout(()=>{boom.style.display="none";},300);
}

function endGame(){
  clearInterval(timer);
  jeu=false;
  good.style.display="none";
  bad.style.display="none";
  explosion();
  alert("Fin ! Score: "+score);
  menu.style.display="block";
  ui.style.display="none";
}

start.onclick=function(){
  menu.style.display="none";
  ui.style.display="block";

  score=0;
  temps=15;
  vies=2;
  jeu=true;

  update();

  good.style.display="block";
  bad.style.display="block";

  move(good);
  move(bad);

  // musique depuis internet
  audio.currentTime=0;
  audio.play().catch(()=>{});

  timer=setInterval(()=>{
    temps--;
    update();
    if(temps<=0 || vies<=0){endGame();}
  },1000);
};

good.onclick=function(){
  if(!jeu) return;
  score++;;;;
  update();
  move(good);
  document.body.style.backgroundColor="#"+Math.floor(Math.random()*16777215).toString(16);
};

bad.onclick=function(){
  if(!jeu) return;
  vies--;
  update();
  move(bad);
};
</script>

</body>
</html>
