$(document).ready(function () {
    $('#exampleModalCenter').modal('toggle')
});

const nameperson = document.getElementById('nameperson')

const sesion = JSON.parse(localStorage.getItem('session-game'))
nameperson.innerText = sesion[0].nombre

// for (let i = 0; i < tablaStorage.length; i += 1) {
//     nameperson.innerText = tablaStorage[i].nombre
//     console.log(nameperson)
// }