//----------------------------------------------------//
//Variables y declaraciones para la ejecucion del juego
//----------------------------------------------------//

//Recibo los datos que se enviaron del formulario
const datosejercicio = JSON.parse(localStorage.getItem('configJuego'));
let player1=datosejercicio.jugador1;
let player2=datosejercicio.jugador2;

//Seteo la maxima cantidad de movimientos que se pueden realizar (hay 9 espacios)
let turnosMax=9; 

//Variable que usamos para cortar la ejecucion del juego en caso de haber un ganador
let partidaFinalizada=false;

//Seteo el paso actual del juego
let pasoActual=0;
document.getElementById("pasoActual").innerHTML=1;

//Voy a definir el listado de los turnos
let listadoTurnos=[];

//Contiene el listado de elementos que cambiaron su estilo a ganadora durante la ultima ronda
let listadoElementosGanadores=[];

//Defino los links de las imagenes para completar
let imagenCirculo="image/circulo.png";
let imagenCruz="image/cruz.png"

//Defino un objeto html nulo para iniciar el ejercicio solo con el fin de rellenar espacio en los contenedores
let objetoVacio= document.createElement("img");
objetoVacio.src="image/vacio.png";
objetoVacio.className="imagenobjeto";

//Defino en un objeto mi jugador 1
//formato player=nombreJugador , objetoCirculo=circulo ,el numero de jugador y lo que contiene cruz o circulo
let jugador1=[player1,imagenCirculo,"1","circulo"]; 

//Defino en un objeto mi jugador 2
//formato player=nombreJugador , objetoCruz=Cruz ,el numero de jugador y lo que contiene cruz o circulo
let jugador2=[player2,imagenCruz,"2","cruz"]; 


//Defino un listado con los jugadores
let listaJugadores=[];
listaJugadores.push(jugador1);
listaJugadores.push(jugador2);

//Inicio la deteccion de los jugadores
detectarJugadores();

//Inicio la ejecucion
iniciarJuego(); 

//----------------------------------------------------//
//Funciones para permiten el funcionamiento del juego
//----------------------------------------------------//

//Funcion que me detecta quienes son los que estan jugando
function detectarJugadores(){
 let contenedorJugadores=document.getElementById("listadojugadores");
 //Defino el jugador1
 let jugador1=document.createElement("p");
 jugador1Contenido=document.createTextNode(player1);
 jugador1.appendChild(jugador1Contenido);
 //Defino el jugador2
 let jugador2=document.createElement("p"); 
 jugador2Contenido=document.createTextNode(player2);
 jugador2.appendChild(jugador2Contenido);
 //Agrego ambos jugadores al listado
 contenedorJugadores.appendChild(jugador1);
 contenedorJugadores.appendChild(jugador2);
}


//Funcion que inicia el juego
function iniciarJuego() {
 reiniciarJuego(); //me aseguro de resetear todos los contenedores 
 pasoActual++;
 document.getElementById("pasoActual").innerHTML=pasoActual;
}

//Funcion que reinicia el juego
function reiniciarJuego() {
 pasoActual=0; //vuelvo a setear al 1er paso 
 let contenidoElemento= document.createElement("center");
 contenidoElemento.appendChild(objetoVacio);
 //Debemos vaciar todo los contenedores que conforman el juego
    for (let index = 1; index <= 9; index++) { 
     let elementoActual = "posicion"+index;
     let elemento=document.getElementById(elementoActual);
     elemento.setAttribute("estado","libre"); //vuelvo a dejar el elemento como libre 
     elemento.setAttribute("objeto",""); //vuelvo a dejar vacio ,para decir que no tiene nada puesto
     document.getElementById(elementoActual).innerHTML="";
     document.getElementById(elementoActual).appendChild(contenidoElemento);
    }
 listadoTurnos=[]; //si reinicio debo vaciar el listado de turnos sucesivos
 definirArranque(); //por lo cual debo volver a definir quien arranca
 limpiarContenedores(); //limpio los contenedores
 document.getElementById("pasoActual").innerHTML=1; //Vuelvo al paso inicial
 document.getElementById("mensajeFinal").innerHTML="<strong>La partida aun se encuentra en disputa!</strong>";
 document.getElementById("posicion9").innerHTML=""; //por algua razon en esa posicion se genera un vacio REPARAR!
} 

function definirArranque() {
 //Le vamos a dar aleatoreidad para saber cual jugador inicia
 let aleatorio1 = Math.random();
 let aleatorio2 = Math.random();

    if (aleatorio1>aleatorio2) {
     document.getElementById("mensajeInferior").innerHTML="<strong>Atencion!</strong> Aleatoriamente comienza el jugador "+listaJugadores[0][0]+" jugando con "+listaJugadores[0][3];
     document.getElementById("turnoJugador").innerHTML=listaJugadores[0][0];
     listadoTurnos.push(listaJugadores[0]);
     listadoTurnos.push(listaJugadores[1]);
    }
    else {
     document.getElementById("mensajeInferior").innerHTML="<strong>Atencion!</strong> Aleatoriamente comienza el jugador "+listaJugadores[1][0]+" jugando con "+listaJugadores[1][3];
     document.getElementById("turnoJugador").innerHTML=listaJugadores[1][0];
     listadoTurnos.push(listaJugadores[1]);
     listadoTurnos.push(listaJugadores[0]);
    } 

    //Una vez definido el arranque genero los siguientes turnos sucesivos, hasta llenar las 9 casillas del juego
    for (let index = 2; index < 9; index++) { 
      //alert("El turno anterior fue del jugador "+listadoTurnos[parseInt(index)-parseInt(1)].nro);
      //si el que encontre ante fue el jugador 1 , cargo el 2do en el siguiente turno , de lo contrario cargamos el 1er jugador al siguiente turno
       if ((listadoTurnos[parseInt(index)-parseInt(1)][2])==1) { 
         listadoTurnos.push(listaJugadores[1]);
        } else {
         listadoTurnos.push(listaJugadores[0]);
        } 
    }
 //console.log(listadoTurnos); //tengo que cargar el listado de quien sigue jugando
}


//Funcion asigna la seleccion de un elemento , asignando cruz o circulo
function seleccionElemento(elemento) {

    if (partidaFinalizada==false) {
     //Obtengo el numero de paso actual
     let nroActual=document.getElementById("pasoActual").innerHTML; //obtengo el paso actual
     let contenidoImagenPaso=listadoTurnos[parseInt(nroActual)-parseInt(1)][1]; //obtengo la imagen correspondiente al turno
     let nombreJugadorActual=listadoTurnos[parseInt(nroActual)-parseInt(1)][0]; //almaceno el nombre del jugador actual en accion
 
     //Vamos a crear la imagen para insertar el contenedor
     let imagenPaso=document.createElement("img");
     imagenPaso.src=contenidoImagenPaso;
     imagenPaso.className="imagenobjeto";
     let tipoImagen=listadoTurnos[parseInt(nroActual)-parseInt(1)][3]; //es cruz o circulo

     //Si el elemento tiene asignado el estado libre , entonces se puede seleccionar ese casillero
        if (elemento.getAttribute("estado")=="libre") {
         //Genero el contenido HTML para meter en el contenedor correspondiente al paso
         let contenidoElemento= document.createElement("center"); 
         contenidoElemento.appendChild(imagenPaso);
         //Asigno el elememento seleccion
         let elementoSeleccion=document.getElementById(elemento.id); //guardo el elemento seleccionado
         elementoSeleccion.setAttribute("estado","ocupado"); //asigno el estado del contenedor como ocupado 
         //Si es un circulo marco el atributo objeto con "circulo" , sino marco el atributo con "cruz"
            if (tipoImagen=="circulo") {
             elementoSeleccion.setAttribute("objeto","circulo");
            }
            else {
             elementoSeleccion.setAttribute("objeto","cruz");
            }
         
         elementoSeleccion.appendChild(contenidoElemento); //le inserto la imagen correspondiente , cruz o circulo
         //Veriicamos si no hemos ganado luego de hacer la seleccion , se no ser asi continuamos
            if (verificarGanador()==true) {
             //paso el nombre del ganador y con lo que estaba jugando
             mostrarMensajeFinal(nombreJugadorActual,tipoImagen); 
            }
            else {
             //Una vez que seleccione avanzo otro paso
             avanzarPaso();
            }   

            }
            //Si el elemento tiene asignado el estado ocupado , entonces no se puede completar ese casillero
            else { 
             alert("Este casillero ya se encuentra ocupado , seleccione otro");
            }  
        } 
}

//Funcion que me permite avanzar pasos en la ejecucion del juego
function avanzarPaso(){
 let nroActual=document.getElementById("pasoActual").innerHTML; //obtengo el paso actual
 nroActual++; //Avanzo el paso actual ,al paso siguiente
    if (verificarFinal(nroActual)==false) {
     document.getElementById("pasoActual").innerHTML=nroActual;
     document.getElementById("turnoJugador").innerHTML=listadoTurnos[parseInt(nroActual)-parseInt(1)][0];
    } else {
     alert("Estoy en el final del juego, se llenaron los 9 casilleros");
    }
}

//Funcion que me retorna TRUE en caso de ser el ultimo paso
function verificarFinal(nroPaso) {
    if(nroPaso<=turnosMax) {
     return false;
    }
    if(nroPaso==turnosMax) {
     return true;
    }
}

//Funcion que verifica si hay un ganador 
function verificarGanador(){
 let listadoCruz=[]; //listado para almacenar todas las marcas con cruz
 let listadoCirculo=[]; //listado para almacenar todas las marcas con circulo
 
   //Recorro todas las posiciones y controlo todas las posiciones
   for (let index = 1; index <= 9; index++) { 
     let elementoActual = "posicion"+index;
     let elemento=document.getElementById(elementoActual);
     let marcaElemento=elemento.getAttribute("objeto");
        
        //Agrego las posiciones de todos los elementos marcados con un Circulo
        if(marcaElemento=="circulo") {
         listadoCirculo.push(index)
        }
        //Agrego las posiciones de todos los elementos marcados con una Cruz
        if(marcaElemento=="cruz") {
         listadoCruz.push(index)
        }
    }
 
 let verificacionGanadorCirculos=verificarCombinaciones(listadoCirculo); //validamos si hay ganador con el circulo
 let verificacionGanadorCruz=    verificarCombinaciones(listadoCruz); //validamos si hay ganador con la cruz

    //Si hay ganador con el circulo retorno true avisando de que ya hay ganador
    if (verificacionGanadorCirculos==true) {     
     return true;
    }
    //Si hay ganador con la cruz retorno true avisando de que ya hay ganador
    if (verificacionGanadorCruz==true) {     
     return true;
    }
    //como aun no hay ganador, permito seguir avanzando
    else {
     return false;
    }   
}

//Funcion que verifica manualmente las combinaciones
function verificarCombinaciones(listado){
 //combinaciones ganadoras posibles expresadas en posiciones , recordar que es una matriz de 3x3
 //posiciones 123 ;posiciones 456 ;posiciones 789;
 //posiciones 147 ;posiciones 258 ;posiciones 369;
 //posiciones 159 ;posiciones 357;

 // posicion 1    posicion 2   posicion 3
 // posicion 4    posicion 5   posicion 6
 // posicion 7    posicion 8   posicion 9
 
 //Vamos a verificar una a una estas combinaciones con un listado pasado por parametro
 //que contiene las posiciones validadas en el metodo anterior

    if ((listado.includes(1)) && (listado.includes(2)) && (listado.includes(3))) {
     colorearGanadora(1,2,3); //coloreo los elementos ganadores
     return true;
    }
    if ((listado.includes(4)) && (listado.includes(5)) && (listado.includes(6))) {
     colorearGanadora(4,5,6); //coloreo los elementos ganadores
     return true;
    }
    if ((listado.includes(7)) && (listado.includes(8)) && (listado.includes(9))) {
     colorearGanadora(7,8,9); //coloreo los elementos ganadores
     return true;
    }
    if ((listado.includes(1)) && (listado.includes(4)) && (listado.includes(7))) {
     colorearGanadora(1,4,7); //coloreo los elementos ganadores
     return true;
    }
    if ((listado.includes(2)) && (listado.includes(5)) && (listado.includes(8))) {
     colorearGanadora(2,5,8); //coloreo los elementos ganadores
     return true;
    }
    if ((listado.includes(3)) && (listado.includes(6)) && (listado.includes(9))) {
     colorearGanadora(3,6,9); //coloreo los elementos ganadores
     return true;
    }
    if ((listado.includes(1)) && (listado.includes(5)) && (listado.includes(9))) {
     colorearGanadora(1,5,9); //coloreo los elementos ganadores
     return true;
    }
    if ((listado.includes(3)) && (listado.includes(5)) && (listado.includes(7))) {
     colorearGanadora(3,5,7); //coloreo los elementos ganadores
     return true;
    }
    else {
     return false;
    }
}

//Funcion para cambiar el background a los elementos que contienen la recta ganadora
function colorearGanadora(posicion1,posicion2,posicion3){
 //Cambiamos el background del elemento de la posicion1 pasada por parametro
 let claseAntigua1=document.getElementById("posicion"+posicion1).getAttribute("class");
 document.getElementById("posicion"+posicion1).className=claseAntigua1+" contenedorganador";

 //Cambiamos el background del elemento de la posicion2 pasada por parametro
 let claseAntigua2=document.getElementById("posicion"+posicion2).getAttribute("class");
 document.getElementById("posicion"+posicion2).className=claseAntigua2+" contenedorganador";

 //Cambiamos el background del elemento de la posicion3 pasada por parametro
 let claseAntigua3=document.getElementById("posicion"+posicion3).getAttribute("class");
 document.getElementById("posicion"+posicion3).className=claseAntigua3+" contenedorganador";

 //Los elementos que cambie, los almaceno
 var elemento1 = new Object();
 elemento1.claseAntigua=claseAntigua1;
 elemento1.id="posicion"+posicion1;
 listadoElementosGanadores.push(elemento1);

 var elemento2 = new Object();
 elemento2.claseAntigua=claseAntigua2;
 elemento2.id="posicion"+posicion2;
 listadoElementosGanadores.push(elemento2);

 var elemento3 = new Object();
 elemento3.claseAntigua=claseAntigua3;
 elemento3.id="posicion"+posicion3;
 listadoElementosGanadores.push(elemento3);
}

//Funcion para limpiar los background de los contenedores ganadores
function limpiarContenedores() {
 console.log(listadoElementosGanadores)
    for (let index = 0; index < listadoElementosGanadores.length ; index++) {
      document.getElementById(listadoElementosGanadores[index].id).className=listadoElementosGanadores[index].claseAntigua;
    }    
}

//Funcion que Imprime el mensaje final con el ganador
function mostrarMensajeFinal(nombre,jugabaCon) {
 partidaFinalizada=true; //doy por finalizado el juego
 let movimientosResultado=document.getElementById("pasoActual").innerHTML;
 let imprimirResultado="El jugador "+nombre+" fue el ganador de la partida , jugando con "+jugabaCon+" en "+movimientosResultado+" movimientos";
 document.getElementById("mensajeFinal").innerHTML=imprimirResultado;
}