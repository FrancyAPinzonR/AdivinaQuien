
if(!localStorage.getItem('session-game')){
	location.href ="../pages/login.html";
}
//document.oncontextmenu = function(){return false}
let avatar = document.getElementById('avatar');
let adivinar = document.getElementById('adivinar');
const list_items = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');
let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let aciertoRender = document.getElementById('acierto')
let desaciertoRender = document.getElementById('desacierto')
let datos = document.getElementById('datos');
let salir = document.getElementById('salir');
const personaje = [];
let indicePersonaje;
let longitud;
let contador = 0;
let acierto = 0;
let desacierto = 0;
let juegoTmp = {};

let audio = document.getElementById("audio");



audio.play();
personaje.push({
	nombre: 'Ferney',
	apellido: 'Rodriguez',
	imagen: 'adivina.jpg',
	estado: false
});

personaje.push({
	nombre: 'Leidy',
	apellido: 'Cuellar',
	imagen: 'adivina1.jpg',
	estado: false
});

personaje.push({
	nombre: 'Julian',
	apellido: 'Valero',
	imagen: 'avatar4.jpg',
	estado: false
});

personaje.push({
	nombre: 'Alejandra',
	apellido: 'Pinzon',
	imagen: 'avatar3.jpg',
	estado: false
});



longitud = personaje.length-1;
indicePersonaje = Math.round(Math.random()*longitud)

cargarImagen(indicePersonaje);


/*if(personaje[indicePersonaje].estado === false)	{
	avatar.src = personaje[indicePersonaje].imagen
}
console.log('Indice personaje:'+ indicePersonaje);
*/
let draggedItem = null;

for (let i = 0; i < list_items.length; i++) {
	const item = list_items[i];

	item.addEventListener('dragstart', function () {
		draggedItem = item;
		setTimeout(function () {
			item.style.display = 'none';
		}, 0)
	});

	item.addEventListener('dragend', function () {
		setTimeout(function () {
			draggedItem.style.display = 'block';
			draggedItem = null;
		}, 0);
	})

	for (let j = 0; j < lists.length; j ++) {
		const list = lists[j];

		list.addEventListener('dragover', function (e) {
			e.preventDefault();
		});
		
		list.addEventListener('dragenter', function (e) {
			e.preventDefault();
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
		});

		list.addEventListener('dragleave', function (e) {
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		});

		list.addEventListener('drop', function (e) {
			console.log('drop');
			this.append(draggedItem);
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		});
	}
}

function cargarImagen(indice){
	let contador = 0

	if(finJuego()){
		guardarJuegoTemporal();
		let session_game = JSON.parse(localStorage.getItem('session-game'));
		//console.log(session_game[0].nombre);
		//console.log(session_game[0].password);
		guardarJuego(session_game);
		
		//guardarJuego(usr);
		swal("OK", "Eres un crack ganaste !!!", "success");
	}else{
		do{
			indicePersonaje = Math.round(Math.random()*longitud)
			if(personaje[indicePersonaje].estado === false)	{
				avatar.src = '../src/'+personaje[indicePersonaje].imagen
				contador++;
			}
		}while(contador<1)
	}
	
	
	
	console.log('Indice personaje:'+ indicePersonaje);
}

function guardarJuegoTemporal() {
	let session_game = JSON.parse(localStorage.getItem('session-game'));
	juegoTmp = {
		acierto: acierto,
		desacierto: desacierto
	}
	session_game.push(juegoTmp);
	localStorage.setItem('session-game', JSON.stringify(session_game));

}

function finJuego(){
	let contador = 0;
	for(let i=0; i<personaje.length; i++) {
		if(personaje[i].estado === false){
			contador++;
		}
	}
	if(contador=== 0){
		return true;
	}
}


function verificar(nombre, apellido, indice){
	if(personaje[indice].nombre === nombre && personaje[indice].apellido === apellido){
		personaje[indice].estado = true;
		swal("OK", "Muy bien, Vamos que se puede !!!", "success");
		acierto++;
		aciertoRender.innerText = acierto;
		
		cargarImagen(indicePersonaje);
	}else {
		if(contador>2){
			alert('Perdiste pasaste el limite de intentos')
		}else{
			swal("Error", "Fallaste", "error");
			contador++;
			desacierto++;
			desaciertoRender.innerText = desacierto;
		}
		
		
	}
}

function guardarJuego (usr) {
	let reg = JSON.parse(localStorage.getItem('usuarios'));
    //console.log(reg)
    let usuario = -1;


    if(consultarRegistro(usr)){
        for (let i = 0; i < reg.length; i++) {
            if (reg[i].nombre == usr[0].nombre ) {
                usuario = i;
            }
        }
     
        if(usuario > -1) {
            if(JSON.stringify(reg[usuario].password) === JSON.stringify(usr[0].password)){
				reg[usuario].juego.push(usr[1]);
				localStorage.setItem('usuarios', JSON.stringify(reg));
                /*console.log('ingreso sesion');
                session_activa = {
                    nombre: usr.nombre,
                    password: usr.password,
                }
                localStorage.setItem('session-game', JSON.stringify(session_activa));
                location.href ="index.html";
                swal("OK", "Vamos a Jugar!!", "success");*/
            }else {
                swal("Error", "Error de Credenciales", "error");
            }
        }
    }else {
        
        //swal("Error", "Error de Credenciales", "error");
    }
}



const consultarRegistro = (usr) => {
    let reg = JSON.parse(localStorage.getItem('usuarios'));
    let contador = 0;
    for (let i = 0; i < reg.length; i++) {
        if (reg[i].nombre == usr[0].nombre) {
            contador++;
        }
    }

    if (contador > 0) {
        return true;
    } else {
        return false;
    }

}



function traerDatos () {

}

//estadisticaJuego();
function estadisticaJuego(){
	let usr = JSON.parse(localStorage.getItem('session-game'));
	console.log('session game'+JSON.stringify(usr));
	let reg = JSON.parse(localStorage.getItem('usuarios'));
	//console.log(reg)
    //console.log(reg)
    let usuario = -1;


    //if(consultarRegistro(usr)){
        for (let i = 0; i < reg.length; i++) {
			if (reg[i].nombre == usr[0].nombre) {
                usuario = i;
            }
        }
     
        if(usuario > -1) {
			console.log('datos de juego '+reg[usuario].juego);
            if(JSON.stringify(reg[usuario].password) === JSON.stringify(usr[0].password)){
				datos.innerHTML = `
					<tr>
						<td colspan="3">Datos Juego</td>
					</tr>
					<tr>
						<td>Aciertos</td>
						<td>Desaciertos</td>
						<td>Numero de juego</td>
					</tr>		
				`
				for(let i=0; i<reg[usuario].juego.length; i++){
					datos.innerHTML += '<tr>';
					datos.innerHTML += '<td>'+reg[usuario].juego[i].acierto+'</td>';
					datos.innerHTML += '<td>'+reg[usuario].juego[i].desacierto+'</td>';
					datos.innerHTML += '<td>'+i+'</td>';
					datos.innerHTML += '</tr>';
				}
                /*console.log('ingreso sesion');
                session_activa = {
                    nombre: usr.nombre,
                    password: usr.password,
                }
                localStorage.setItem('session-game', JSON.stringify(session_activa));
                location.href ="index.html";
                swal("OK", "Vamos a Jugar!!", "success");*/
            }else {
                swal("Error", "Error de Credenciales", "error");
            }
        }
    }/*else {
        
        //swal("Error", "Error de Credenciales", "error");
    }*/

adivinar.addEventListener('click', ()=>{
	verificar(nombre.textContent, apellido.textContent, indicePersonaje)
})

salir.addEventListener('click', ()=>{
	localStorage.removeItem('session-game');
	location.href ="../pages/login.html";

})