<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="why are you running? - game " content="“Why are you running?” - a game inspired by the funny nollywood meme “why are you running” and Chrome Dinosaur Game.  Press spacebar to jump and play! Can Monica run away from Mr man?  
  Nollywood/nigerian film “Pretty Liars 1” - mobile version">
  <title>Why are you running?</title>
  <link rel="icon" type="image/x-icon" href="/imgs/woman-stationary.png">
  <link rel="stylesheet" href="mobile.css">
  <script src="mobileScript.js" type="module"></script>
</head>
<body>
    <div class="world" data-world>
        <div class="score-name">score</div>
        <div class="dollars" >$</div>
        <div class="score" data-score>0</div>
        <div class="money-name" data-money-name>0</div>
        <div class="highscore" data-highscore>0</div>
        <div class="end-screen" data-end-screen></div>
        <img src="imgs/ground.png" class="ground" data-ground>
        <img src="imgs/ground.png" class="ground" data-ground>
        <img src="imgs/woman-stationary.png" class="woman" data-woman>
      </div>
  <div class="info">
    <h1 class ="start-screen"data-start-screen>WHY ARE YOU RUNNING ?</h1>
    <h2 class = "start1-screen"data-start-screen2>Press jump to start playing</h2>
  </div>
  <button id="jump-btn" onclick="mobJump()">JUMP</button>
  <script src="mobileWoman.js"></script>
    <div class="footer">
      <a href="mailto:nbihstudios@gmail.com" target="_blank">contact</a>
      <a href="https://www.nobadideashere.com" target="_blank">made by nbih</a> 
      <a href="https://twitter.com/intent/tweet?text=Hello%20world">share on twitter</a>
    </div>
    <script>
      var i = 0;
      function change() {
        var doc = document.getElementById("background");
        var color = ["#cceafa", "#feeddc","#d0ffd4", "#fbddec"];
        document.body.style.backgroundColor = color[i];
        i = (i + 1) % color.length;
      }
      setInterval(change, 20000);
      </script>
</body>

</a>
</html>
