//swal("Hello world!");
let usuario = document.getElementById('user');
let pass = document.getElementById('pass');
let passv = document.getElementById('passv');
let registrar = document.getElementById('guardar');
//let contador = 0;
let tablaStorage = 'usuarios';




registrar.addEventListener('click', (e) => {
    e.preventDefault()
    validar(usuario);
    validar(pass);
    validar(passv);
    if (validar(usuario) && validar(pass) && pass.value === passv.value) {
        //console.log('Puedes seguir'+ pass.value + usuario.value);
        let passCode = CryptoJS.SHA3(pass.value);
        //console.log(passCode);
        const tabla = {
            nombre: usuario.value,
            password: passCode,
            juego: []
        }

        if (localStorage.getItem(tablaStorage) == null) {
            crearTabla(tabla);
        } else {
            console.log(consultarRegistro(tabla));
            if (consultarRegistro(tabla)) {
                swal("Error", "El usuario ya existe", "error");
            } else {
                agregarRegistroTabla(tabla);
                swal("OK", "Usuario creado exitosamente", "success");
                location.href ="../pages/login.html";
            }

        }

    } else {
        if (pass.value !== passv.value) {
            swal("Error", "Password no son similares", "error");
        }
    }

})

const validar = (txtInput) => {
    if (txtInput.value === '') {
        txtInput.placeholder = "Campo Vacio";
        txtInput.style.borderColor = 'red';
        swal("Error", "No puedes enviar este campo vacio", "error");
        return false
    } else {
        txtInput.style.borderColor = 'black'
        return true;
    }
}

const crearTabla = (usr) => {
    let arr = []
    arr.push(usr);
    localStorage.setItem(tablaStorage, JSON.stringify(arr));
    swal("OK", "Usuario creado exitosamente", "success");
    setInterval(function(){ 
        location.href ="../pages/login.html";
     }, 3000);
    

}


const consultarRegistro = (usr) => {
    let reg = JSON.parse(localStorage.getItem('usuarios'));
    let contador = 0;
    for (let i = 0; i < reg.length; i++) {
        if (reg[i].nombre == usr.nombre) {
            contador++;
        }
    }

    if (contador > 0) {
        return true;
    } else {
        return false;
    }

}

const agregarRegistroTabla = (usr) => {
    let reg = JSON.parse(localStorage.getItem(tablaStorage));
    reg.push(usr);
    localStorage.setItem(tablaStorage, JSON.stringify(reg));
    return true;
}

