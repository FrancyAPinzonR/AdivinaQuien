let user = document.getElementById('user')
let password = document.getElementById('pass')
let ingresar = document.getElementById('ingresar')
let tablaStorage = 'usuarios';
let pass1 = CryptoJS.SHA3('aa');
let pass2 = CryptoJS.SHA3('aa');
let session_activa = []


ingresar.addEventListener('click', (e)=> {
    e.preventDefault();
    //console.log(user.value);
    validar(user);
    validar(password);
    let passCode = CryptoJS.SHA3(password.value);

    


    const userTemp = {
        nombre: user.value,
        password: passCode
    }

    validarSesion(userTemp);
    console.log(session_activa);
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


const validarSesion = (usr) => {
    let reg = JSON.parse(localStorage.getItem(tablaStorage));
    //console.log(reg)
    let usuario = -1;


    if(consultarRegistro(usr)){
        for (let i = 0; i < reg.length; i++) {
            if (reg[i].nombre == usr.nombre ) {
                usuario = i;
            }
        }
     
        if(usuario > -1) {
            if(JSON.stringify(reg[usuario].password) === JSON.stringify(usr.password)){
                console.log('ingreso sesion');
                session_activa.push({
                    nombre: usr.nombre,
                    password: usr.password,
                })
                localStorage.setItem('session-game', JSON.stringify(session_activa));
                location.href ="../pages/game.html";
                swal("OK", "Vamos a Jugar!!", "success");
            }else {
                swal("Error", "Error de Credenciales", "error");
            }
        }
    }else {
        
        swal("Error", "Error de Credenciales", "error");
    }
    

    
    

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
