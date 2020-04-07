//Funcion para Iniciar el juego
function iniciarJuego() {
 let player1=document.getElementById('jugador1').value;
 let player2=document.getElementById('jugador2').value;
    if ((player1==" ") || (player2 ==" ")) {
     alert("No puede dejar un nombre vacio");
    }
    else {
    	alert("esta todo ok")
    }

 localStorage.setItem("configJuego",JSON.stringify({jugador1:player1,jugador2:player2}));
 window.location = "jugar.html";  
}
