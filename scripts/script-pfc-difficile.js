document.addEventListener('DOMContentLoaded', function(){

	// Lancement expressions
	var marqueL = document.querySelectorAll('.lancement')[0];
	var pretL = document.querySelectorAll('.lancement')[1];;
	var partezL = document.querySelectorAll('.lancement')[2];

	// Lancement Game 
	var ciseauxL = document.getElementById("ciseaux");
	var pierreL = document.getElementById("pierre");
	var papierL = document.getElementById("papier");
	var ghostL = document.getElementById("ghost");
	var scoreJL = document.querySelectorAll(".score_joueur")[0];
	var scoreOL = document.querySelectorAll(".score_joueur")[1];

	// Timer 
	//var timerL = document.getElementById('timer');

	// Fonctions lancement : rendre visible les expressions les unes après les autres
	lancementPromesseGame()		
	
	// Jeu pierre feuille ciseaux

	const boutons = document.querySelectorAll(".choix img");
	const scoreJoueur = document.getElementById('scoreJoueur');
	const scoreOrdinateur = document.getElementById('scoreOrdinateur');
	const nbHighscore = document.getElementById('highscore_nb');
	const nbScore = document.getElementById('score_nb');
	var imageOrdi = document.getElementById('ghost');

	let ordinateurScore = 1;
	let joueurScore = 1;
	let scoreNombre = 1;

	var affichage_resultat = this.getElementById("resultat");

	const imagesAleatoires = ["images/computer_pierre.png", "images/computer_ciseaux.png", "images/computer_puit.png", "images/computer_bombe.png"];

	
	boutons.forEach(function (btn){
		btn.addEventListener('click',function (e){

			//restartTimer();

			//Son du click sur pierre/papier/ciseaux
			var clickPPC = new Audio("audios/click-son.mp4");
		  	clickPPC.play();

			let numAleatoire = Math.floor(Math.random() * imagesAleatoires.length);
			imageOrdi.src = imagesAleatoires[numAleatoire];

			var choixOrdi = imageOrdi.src.replace(/(.*)\//g, '').replace('computer_', '').replace('.png', '');

			let imageJoueur = e.target;
			choixJoueur = imageJoueur.id;
			
			//S'il y a égalité
			if (choixOrdi == choixJoueur){
				affichage_resultat.innerHTML="Egalite";
				affichage_resultat.style.display="block";
			}

			//S'il n'y a pas égalité
			else if (((choixJoueur == "pierre" && choixOrdi == "ciseaux") || (choixJoueur == "papier" && choixOrdi == "pierre") || 
					(choixJoueur == "ciseaux" && choixOrdi == "papier") || (choixJoueur == "papier" && choixOrdi == "puit") || 
					(choixJoueur == "ciseaux" && choixOrdi == "bombe"))){
				affichage_resultat.innerHTML="Gagne";
				affichage_resultat.style.display="block";
				scoreJoueur.innerHTML = joueurScore;
				joueurScore++;
			} else if ((choixJoueur == "pierre" && choixOrdi == "papier") || (choixJoueur == "papier" && choixOrdi == "ciseaux") || 
				(choixJoueur == "ciseaux" && choixOrdi == "pierre") || (choixJoueur == "pierre" && choixOrdi == "puit") || 
				(choixJoueur == "ciseaux" && choixOrdi == "puit") || (choixJoueur == "pierre" && choixOrdi == "bombe")  || 
				(choixJoueur == "papier" && choixOrdi == "bombe")){
				affichage_resultat.innerHTML="Perdu";
				affichage_resultat.style.display="block";
				scoreOrdinateur.innerHTML = ordinateurScore;
				ordinateurScore++;
			};

			//Score
			if (joueurScore == 4 || ordinateurScore == 4){
				newManche();
			};
		});
	});

	// Fonction lancement Game
	function lancementPromesseGame() {
		var promesse = new Promise(function(resolved, rejected) {

		var delai  = 0; 
		if (delai<4000) { 
			setTimeout(function() {
				resolved();
			}, delai); 
		} else {
			setTimeout(function() {
				rejected();
			}, delai);
		}
		});

		promesse.then(() => {
			setTimeout(() => showMarque(), 0);
		})
		.then(() => {
			setTimeout(() => showPret(), 1000);
		})
		.then(() => {
			setTimeout(() => showPartez(), 2000);
		})
		.then(() => {
			setTimeout(() => showGame(), 3000);	
		})
		.catch(() => {
			console.log("Promesse non retenue !")
		})
	};

	function showMarque () {
		marqueL.style.display = "";
		pretL.style.display = 'none';
		partezL.style.display = "none";
		scoreJL.style.display = "none";
		scoreOL.style.display = "none";
	};

	function showPret () {
		marqueL.style.display = 'none';
		pretL.style.display = "";
	};

	function showPartez () {
		pretL.style.display = 'none';
		partezL.style.display = "";
	};

	function showGame (){
		partezL.style.display = "none";		
		ciseauxL.style.display = "flex";
		//timer();
		pierreL.style.display = "flex"; 
		papierL.style.display = "flex";
		ghostL.style.display = "flex";   
		scoreJL.style.display = "block";
		scoreOL.style.display = "block";
	};

	// Compte à rebours 
	/**function timer(){
		timerL.style.display="flex";
		var nombreDepart = 2;
		cpteRebours = setInterval(() => {
			console.log(nombreDepart)
		  	timerL.innerHTML = nombreDepart;
		  	timerL.style.color = "#FFFFFE";

		  	if (nombreDepart===0) {
			  	timerL.innerHTML="Temps écoulé !";
			  	timerL.style.color="#F16881";
			  	affichage_resultat.innerHTML="Perdu";
				affichage_resultat.style.display="block";
				scoreOrdinateur.innerHTML = ordinateurScore;
	       		ordinateurScore++;
		  		nombreDepart = 2;
		  	} else {
		  		nombreDepart = nombreDepart - 1;
		  	};

		  	if (ordinateurScore == 4){
				newManche();
			};
			
		}, 1000)
	};

	function restartTimer() {
		clearInterval(cpteRebours);
		timer();
	};**/

	function newManche() {
		//clearInterval(cpteRebours);
		//timerL.style.display="none";
		if (joueurScore > ordinateurScore){
			affichage_resultat.innerHTML="Manche gagnee ! <span>Nouvelle manche ?</span>";
			affichage_resultat.style.display="block";
			nbScore.innerHTML = scoreNombre;
			scoreNombre++;

			//Son de partie remportée
			var audioV = new Audio("audios/victoire-son.wav");
		  	audioV.play();

		}else{
			affichage_resultat.innerHTML="Manche perdue...  <span>Nouvelle manche ?</span>";
			affichage_resultat.style.display="block";
			if (nbScore.textContent > nbHighscore.textContent){
				nbHighscore.innerHTML = nbScore.textContent;
			};

			nbScore.innerHTML = "0";
			scoreNombre = 1;

			//Son de partie perdue
			var audioV = new Audio("audios/defaite-son.wav");
		  	audioV.play();
		};

		ordinateurScore = 1;
		joueurScore = 1;

		boutons.forEach(function (hide){
			hide.style.visibility = 'hidden';
		});

		var nouvManche = document.querySelector("#resultat span");
		nouvManche.addEventListener('click',function (){
			//restartTimer();
			scoreJoueur.innerHTML = 0;
			scoreOrdinateur.innerHTML = 0;
			affichage_resultat.style.display = "none";
			//timerL.style.display="flex";
			boutons.forEach(function (hide){
				hide.style.visibility = 'visible';
			});
		});	
	};
});
