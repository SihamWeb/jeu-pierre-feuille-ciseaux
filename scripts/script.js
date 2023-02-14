document.addEventListener('DOMContentLoaded', function(){

	// Balises principales

	//START
	var boutonStart=document.getElementById("start");
	var ecranStart=document.getElementById("ecran_start");
	var retourStart = document.getElementById("retour_start");

	//PSEUDO
	var pseudoForm=document.getElementById("pseudo_joueur");
	var pseudoJoueur=document.getElementById("pseudo");
	var boutonContinuer1=document.getElementById("continuer1");
	var warning_pseudo=document.getElementById("warning_pseudo");

	//CHOIX LEVEL
	var choixLevel=document.getElementById("choix_level");
	var retourPseudo=document.getElementById("retour_pseudo");
	var choixClassique=document.getElementById("classique");
	var choixDifficile=document.getElementById("difficile");

	//REGLES LEVEL
	var afficheClassique=document.getElementById("regle_classique");
	var afficheDifficile=document.getElementById("regle_difficile");
	var retourModes1=document.getElementById("retour_mode1");
	var retourModes2=document.getElementById("retour_mode2");

	//EVENTS
	boutonStart.addEventListener('click', showPseudo); // affiche l'étape pseudo
	boutonContinuer1.addEventListener('click', verifPseudo); // vérifie si le format du pseudo est correcte
	retourStart.addEventListener('click', retourPageStart); // retourne à la première page
	retourPseudo.addEventListener('click', retourpagePseudo); // retourne à l'étape pseudo
	choixClassique.addEventListener('click', regleClassique); // affiche les régles du mode classique
	choixDifficile.addEventListener('click', regleDifficile); // affiche les règles du mode difficile
	retourModes1.addEventListener('click', retourChoix1);
	retourModes2.addEventListener('click', retourChoix2);

	//Son par défaut
	var boutonsDefault = document.querySelectorAll(".son-default");

	boutonsDefault.forEach(function (btn){
		btn.addEventListener('click',function (){

			var audioDefault = new Audio("audios/accueil-son.wav");
			audioDefault.play();

		});
	});

	// Evenements déclenchés
	function showPseudo(){

		//Son START
		var audioSTART = new Audio("audios/start-son.wav");
		audioSTART.play();

		ecranStart.style.display="none";
		pseudoForm.style.display="block";
	};

	function verifPseudo(){

		var format_pseudo =/^[0-9A-Z]{3}$/i;
		if(pseudoJoueur.value=="" || !format_pseudo.test(pseudoJoueur.value)){
			pseudoJoueur.style.backgroundColor="#f16881"
			warning_pseudo.style.display="block";

		}else{
			pseudoForm.style.display="none";
			choixLevel.style.display="block";
		};

		if(localStorage){
			localStorage.setItem("pseudoJoueur", pseudoJoueur.value);
		}

	};

	function retourPageStart(){
		pseudoForm.style.display="none";
		ecranStart.style.display = "block";
	};

	function retourpagePseudo(){
		choixLevel.style.display="none";
		pseudoForm.style.display="block";
	};

	function regleClassique(){
		choixLevel.style.display="none";
		afficheClassique.style.display="block";
		
		var xhr=new XMLHttpRequest();

  		xhr.open("GET","regles/regles.xml", true)

  		xhr.onreadystatechange=function(){
    		if (xhr.readyState==4 && xhr.status==200){
      			var affiche_regles=xhr.responseXML;
      			var affiche_classique = affiche_regles.getElementsByTagName("classique");
      			document.getElementById('retour_classique').innerHTML=affiche_classique[0].textContent;
      		}
    	}
  		xhr.send(null);

	};

	function regleDifficile(){
		choixLevel.style.display="none";
		afficheDifficile.style.display="block";

		var xhr2=new XMLHttpRequest();

  		xhr2.open("GET","regles/regles.xml", true)

  		xhr2.onreadystatechange=function(){
    		if (xhr2.readyState==4 && xhr2.status==200){
      			var affiche_regles=xhr2.responseXML;
      			var affiche_difficile = affiche_regles.getElementsByTagName("difficile");
      			document.getElementById('retour_difficile').innerHTML=affiche_difficile[0].textContent;
      		}
    	}
  		xhr2.send(null);
	};

	function retourChoix1(){
		choixLevel.style.display="block";
		afficheClassique.style.display="none";
	};

	function retourChoix2(){
		choixLevel.style.display="block";
		afficheDifficile.style.display="none";
	};

});
