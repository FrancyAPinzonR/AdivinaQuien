let avatar = document.getElementById('avatar');
let adivinar = document.getElementById('adivinar');
const list_items = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');
let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
const personaje = [];
let indicePersonaje;
let longitud;
let contador = 0;

let audio = document.getElementById("audio");

// audio.play();
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


longitud = personaje.length - 1;
indicePersonaje = Math.round(Math.random() * longitud)

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

    for (let j = 0; j < lists.length; j++) {
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

function cargarImagen(indice) {
    let contador = 0

    if (finJuego()) {
        alert('Fin del juego');
    } else {
        do {
            indicePersonaje = Math.round(Math.random() * longitud)
            if (personaje[indicePersonaje].estado === false) {
                avatar.src = "../src/" + personaje[indicePersonaje].imagen
                contador++;
            }
        } while (contador < 1)
    }



    console.log('Indice personaje:' + indicePersonaje);
}

function finJuego() {
    let contador = 0;
    for (let i = 0; i < personaje.length; i++) {
        if (personaje[i].estado === false) {
            contador++;
        }
    }
    if (contador === 0) {
        return true;
    }
}


function verificar(nombre, apellido, indice) {
    if (personaje[indice].nombre === nombre && personaje[indice].apellido === apellido) {
        personaje[indice].estado = true;
        alert('ganaste');
        cargarImagen(indicePersonaje);
    } else {
        if (contador > 2) {
            alert('Perdiste pasaste el limite de intentos')
        } else {
            alert('Opciones incorrectas')
            contador++;
        }


    }
}


adivinar.addEventListener('click', () => {
    verificar(nombre.textContent, apellido.textContent, indicePersonaje)
})