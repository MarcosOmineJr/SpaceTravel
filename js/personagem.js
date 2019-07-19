//Animação de abertura da página:
setTimeout(function(){document.getElementById("text").className += " animation"; document.getElementById("buttons").className += " animation";}, 600);

//deixar o canvas pronto para receber a animação:
var canvas = document.getElementById('meuCanvas');
var ctx = canvas.getContext('2d');
	  
//Variáveis de tempo:
var anterior, agora, decorrido, randomTime;
randomTime = Math.round((Math.random()*10000));
if(randomTime < 3000){
	randomTime = 3000;
}

//Seta o anterior iniciando a contagem de tempo e depois de um tempo pede um frame com a função desenhar;
anterior = new Date().getTime();
setTimeout(function(){requestAnimationFrame(desenhar);}, 3300);

//Início das animações paradas:
var inativo, tedio, contagemTempoParado, randomAnimation, timeoutTedio;
inativo = false;
tedio = false;

//Coloca os sprites em um Array só:
var charSprite = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
charSprite[0].src = 'img/char_sprites/char.png';
charSprite[1].src = 'img/char_sprites/olha_sprite.png';
charSprite[2].src = 'img/char_sprites/aparece_sprite.png';
charSprite[3].src = 'img/char_sprites/pisca_sprite.png';
charSprite[4].src = 'img/char_sprites/some_sprite.png';
charSprite[5].src = 'img/char_sprites/happy_sprite.png';
charSprite[6].src = 'img/char_sprites/sad_sprite.png';
charSprite[7].src = 'img/char_sprites/assovio_sprite.png';
charSprite[8].src = 'img/char_sprites/explode_sprite.png';
charSprite[9].src = 'img/char_sprites/angry_sprite.png';
/*charSprite[10].src = 'img/char_sprites/ .png';
charSprite[11].src = 'img/char_sprites/ .png';*/

//Sound Design:
var felizSom, bravoSom, tristeSom, shindeiruSom, assovioSom, teletransporteSom, bgentradaSom, bgSom, explosaoSom;
felizSom = new Audio('audio/feliz.mp3');
bravoSom = new Audio('audio/bravo.mp3');
tristeSom = new Audio('audio/sad.mp3');
shindeiruSom = new Audio('audio/shindeiru.mp3');
assovioSom = new Audio('audio/assovio.mp3');
teletransporteSom = new Audio('audio/aparece.mp3');
explosaoSom = new Audio('audio/explosao.mp3');

//variáveis de ativação de animação:
var entrar, aparecer, flutuar, olhar, piscar, sumir, feliz, triste, assoviar, explodir, bravo;
var animGostei, animNaoGostei, visivel;
entrar = true;
flutuar = false;
aparecer = false;
olhar = false;
piscar = false;
sumir = false;
feliz = false;
triste = false;
visivel = false;
assoviar = false;
explodir = false;
bravo = false;

//variáveis dos gráficos da animação:
var icX, charX, charY, charY_zerado, flutuarUp, charW, charH, pause, timeout, pause2, timeout2;
charW = charH = 200;
charX = (canvas.height/3) - (charW/2);
charY = (2*(canvas.height/3)) - (charW/2);
charY_zerado = charY;
flutuarUp = true;
pause = true;
pause2 = true;

//variáveis de passagem da animação:
var corte, quadro;
icX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
corte = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
quadro = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function animacao() {
	//limpa o canvas:
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//animação parado:
	if(tedio){
		disparaAnimacaoParado();
		tedio = false;
		}
	
	//animação aparecer/entrar:
	if(aparecer || entrar){
		icX[2] = 504 * corte[2];
		charSprite[3].onload = ctx.drawImage(charSprite[2], icX[2], 0, 504, 504, charX, charY, charW, charH);
		quadro[2]++;
		
		if(corte[2] == 0){
			teletransporteSom.play(); console.log('foi');
		}
		
		if(quadro[2] > 2){
			corte[2]++;
			quadro[2] = 0;
		}
		if(corte[2] == 9){
			corte[2] = 0;
			entrar = false;
			aparecer = false;
			flutuar = true;
			visivel = true;
			
			if(aparecer){
				disparaAnimacaoParado();
			} else {
				contagemTempoParado = agora;
				inativo = true;
			}
		}
	}
	
	//animação flutuar:
	if(flutuar){
		charSprite[0].onload = ctx.drawImage(charSprite[0], icX[0], 0, 504, 504, charX, charY, charW, charH);
		if(flutuarUp){
			charY -= 0.5;
			if(charY == (charY_zerado-10)){
				flutuarUp = false;
			}
		} else {
			charY += 0.5;
			if(charY == (charY_zerado+10)){
				flutuarUp = true;
			}
		}
	}
	
	//animação olhar:
	if(olhar){
		icX[1] = 504 * corte[1];
		charSprite[1].onload = ctx.drawImage(charSprite[1], icX[1], 0, 504, 504, charX, charY, charW, charH);
		quadro[1]++;
		if(quadro[1] > 5){
			corte[1]++;
			quadro[1] = 0;
		}
		if(corte[1] == 15){
		   corte[1] = 0;
		   olhar = false;
			disparaAnimacaoParado();
		}
	}
	
	//animação piscar:
	if(piscar){
		icX[3] = 504 * corte[3];
		charSprite[3].onload = ctx.drawImage(charSprite[3], icX[3], 0, 504, 504, charX, charY, charW, charH);
		quadro[3]++;
		if(quadro[3] > 2){
			corte[3]++;
			quadro[3] = 0;
		}
		if(corte[3] == 9){
		   corte[3] = 0;
		   piscar = false;
			disparaAnimacaoParado();
		   }
	}
	
	//animação sumir:
	if(sumir){
		if(charY == charY_zerado){
			flutuar = false;
			visivel = false;
			icX[4] = 504 * corte[4];
			charSprite[4].onload = ctx.drawImage(charSprite[4], icX[4], 0, 504, 504, charX, charY, charW, charH);
			quadro[4]++;
			if(corte[4] == 0){
				teletransporteSom.play();
			}
			if(quadro[4] > 2){
				corte[4]++;
				quadro[4] = 0;
			}
			if(corte[4] == 9){
				corte[4] = 0;
				sumir = false;
				setTimeout(function(){aparecer = true;}, 2000);
			}
		}
	}
	
	//animação feliz:
	if(feliz && visivel){
		clearTimeout(timeoutTedio);
		icX[5] = 504 * corte[5];
		charSprite[5].onload = ctx.drawImage(charSprite[5], icX[5], 0, 504, 504, (charX+115), (charY-95), (charW-50), (charH-50));
		if(corte[5] == 0){
			felizSom.play();
		}
		
		if(timeout){
			setTimeout(function(){corte[5]++; pause = true;},1000);
			timeout  = false;
		}
		if(corte[5] == 4 && pause){
			timeout = true;
			pause = false;
		}
		if(corte[5] !== 4){
			quadro[5]++;
		}
		if(quadro[5] > 4){
			corte[5]++;
			quadro[5] = 0;
		}
		if(corte[5] == 10){
			feliz = false;
			corte[5] = 0;
			contagemTempoParado = agora;
			inativo = true;
		}
	}

	//animação triste:
	if(triste && visivel){
		clearTimeout(timeoutTedio);
		icX[6] = 504 * corte[6];
		charSprite[6].onload = ctx.drawImage(charSprite[6], icX[6], 0, 504, 504, (charX+115), (charY-95), (charW-50), (charH-50));
		if(corte[6] == 0){
			tristeSom.play();
		}
		
		if(timeout){
			setTimeout(function(){corte[6]++; pause = true;},1000);
			timeout  = false;
		}
		if(corte[6] == 4 && pause){
			timeout = true;
			pause = false;
		}
		if(corte[6] !== 4){
			quadro[6]++;
		}
		if(quadro[6] > 4){
			corte[6]++;
			quadro[6] = 0;
		}
		if(corte[6] == 10){
			triste = false;
			corte[6] = 0;
			contagemTempoParado = agora;
		}
	}
	
	//animação assoviar:
	if(assoviar && visivel){
		clearTimeout(timeoutTedio);
		icX[7] = 504 * corte[7];
		charSprite[7].onload = ctx.drawImage(charSprite[7], icX[7], 0, 504, 504, (charX+115), (charY-95), (charW-50), (charH-50));
		if(corte[7] == 0){
			assovioSom.play();
		}
		
		if(timeout){
			setTimeout(function(){corte[7]++; pause = true;},1000);
			timeout  = false;
		}
		if(corte[7] == 4 && pause){
			timeout = true;
			pause = false;
		}
		if(corte[7] !== 4){
			quadro[7]++;
		}
		if(quadro[7] > 4){
			corte[7]++;
			quadro[7] = 0;
		}
		if(corte[7] == 10){
			assoviar = false;
			corte[7] = 0;
			contagemTempoParado = agora;
			inativo = true;
		}
	}
	
	//animação explodir:
	if(explodir && visivel && charY == charY_zerado){
		clearTimeout(timeoutTedio);
		flutuar = false;
		icX[8] = 504 * corte[8];
		charSprite[8].onload = ctx.drawImage(charSprite[8], icX[8], 0, 504, 504, charX, charY, charW, charH);
		if(corte[8] == 13){
			shindeiruSom.play();
		}
		if(corte[8] == 16){
			explosaoSom.play();
		}
		
		if(timeout){
			setTimeout(function(){corte[8]++; pause = true;}, 1000);
			timeout = false;
		}
		
		if(corte[8] == 0){
			bravo = true;
		}
		
		if(corte[8] == 3 && pause){
			timeout = true;
			pause = false;
		}
		
		if (corte[8] > 12 && corte[8] < 16 && pause){
			timeout = true;
			pause = false;
		}
		
		if(corte[8] !== 3 && corte[8] !== 13 && corte[8] !== 14 && corte[8] !== 15){
			quadro[8]++;
		}
		
		if(quadro[8] > 4){
			corte[8]++;
			quadro[8] = 0;
		}
		
		if(corte[8] == 22){
			explodir = false;
			corte[8] = 0;
			setTimeout(function(){entrar = true;}, 2000);
		}
	}
	
	//animação bravo:
	if(bravo && visivel) {
		clearTimeout(timeoutTedio);
		icX[9] = 504 *  corte[9];
		charSprite[9].onload = ctx.drawImage(charSprite[9], icX[9], 0, 504, 504, (charX+115), (charY-95), (charW-50), (charH-50));
		
		if(corte[9] == 0){
		bravoSom.play();
		}
		
		if(timeout2){
			setTimeout(function(){corte[9]++; pause2 = true;}, 1000);
			timeout2 = false;
		}
		
		if(corte[9] == 4 && pause2){
			timeout2 = true;
			pause2 = false;
		}
		
		if(corte[9] !== 4){
			quadro[9]++;
		}
		
		if(quadro[9] > 4){
			corte[9]++;
			quadro[9] = 0;
		}
		
		if(corte[9] == 10){
			corte[9] = 0;
			bravo = false;
			if(!explodir){
				contagemTempoParado = agora;
				inativo = true;
			}
		}
	}
}

function meuT(){
	pause = false;
	clearTimeout(teste);
}

function animacaoParado(){
	randomAnimation = Math.random()*3;
	if(randomAnimation <= 1) {
		olhar = true;
	} else if(randomAnimation > 1 && randomAnimation <=2){
		piscar = true;;
	} else if(randomAnimation > 2 && randomAnimation <= 3){
		sumir = true;
	}
	randomTime = Math.round((Math.random()*10000));
	if(randomTime < 3000){
		randomTime = 3000;
	}
}

//Dispara a animação parada:
function disparaAnimacaoParado(){
		timeoutTedio = setTimeout(animacaoParado, randomTime);
}

//Dispara a animação no botão "Gostei! :)":
function gostei(){
	clearTimeout(timeoutTedio);
	tedio = false;
	if(!feliz && ! triste && ! assoviar){
		animGostei = Math.random()*2;
		if(animGostei <= 1){
			feliz = true;
		} else if(animGostei > 1 && animGostei <= 2){
			assoviar = true;
		}
	}
}

//Dispara a animação no botão "Não Gostei! >:(":
function naoGostei(){
	clearTimeout(timeoutTedio);
	tedio = false;
	if(!feliz && ! triste && ! assoviar){
		animNaoGostei = Math.random()*3;
		if(animNaoGostei <= 1){
			bravo = true;
		} else if(animNaoGostei > 1 && animNaoGostei <= 2){
			triste = true;
		} else if(animNaoGostei > 2 && animNaoGostei <= 3){
			explodir = true;
		}
	}
}

//Faz a contagem de tempo, desenha no canvas e pede um frame de novo:	
function desenhar() {
	agora = new Date().getTime();
	decorrido = agora - anterior;
	if(inativo && agora > (contagemTempoParado+5000)){
		tedio = true;
		inativo = false;
		}
	
	animacao();
	
	anterior = agora;
	requestAnimationFrame(desenhar);
	}

//Testes de animações:
document.addEventListener('keydown', function(evento){
	if(evento.keyCode == 49 || evento.keyCode == 97){
		clearTimeout(timeoutTedio);
		piscar = true;
	}
	if(evento.keyCode == 50 || evento.keyCode == 98){
		clearTimeout(timeoutTedio);
		olhar = true;
	}
	if(evento.keyCode == 51 || evento.keyCode == 99){
		clearTimeout(timeoutTedio);
		sumir = true;
	}
	if(evento.keyCode == 52 || evento.keyCode == 100){
		clearTimeout(timeoutTedio);
		feliz = true;
	}
	if(evento.keyCode == 53 || evento.keyCode == 101){
		clearTimeout(timeoutTedio);
		assoviar = true;
	}
	if(evento.keyCode == 54 || evento.keyCode == 102){
		clearTimeout(timeoutTedio);
		triste = true;
	}
	if(evento.keyCode == 55 || evento.keyCode == 103){
		clearTimeout(timeoutTedio);
		bravo = true;
	}
	if(evento.keyCode == 56 || evento.keyCode == 104){
		clearTimeout(timeoutTedio);
		explodir = true;
	}
});


//Pop-Up:
function popup(){
	document.getElementById('popup').className += " aparecer";
	setTimeout(function(){document.getElementById('popup').className = "popup";}, 2000);
	
	contagemTempoParado = agora;
	inativo = true;
}

