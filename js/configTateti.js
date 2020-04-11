//Funcion para Iniciar el juego 1 VS 1
function iniciarJuego() {
 let player1=document.getElementById('jugador1').value;
 let player2=document.getElementById('jugador2').value;
  if ((player1=="") || (player2 =="")) {
   alert("No puede dejar un nombre vacio");
  }
  else {
   localStorage.setItem("configJuego",JSON.stringify({jugador1:player1,jugador2:player2,modo:"1VS1"}));
   window.location = "jugar.html"; 
   }      
}

//Funcion para iniciar el juego VS la IA
function iniciarDesafio(){
 localStorage.setItem("configJuego",JSON.stringify({jugador1:"UsuarioReal",jugador2:"CPU",modo:"CPU"}));
 window.location = "jugar.html"; 
}
