"use strict"

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
let x1 = getRandomInt(1,10);
let x2 = getRandomInt(1,10);
let valor1 = document.querySelector("#valor1");
valor1.innerHTML = x1;
let valor2 = document.querySelector("#valor2");
valor2.innerHTML = x2;

let suma = x1 + x2;



   

  let revisarCaptcha = document.querySelector("#revisarcaptcha");
  revisarCaptcha.addEventListener("click", revisar);

 

  function revisar(event){
    event.preventDefault();
    let captcha = document.querySelector("#captcha");
    let captchaMensaje = document.querySelector("#mensaje-captcha");
    let formularioaValue = document.querySelector("#mensaje-formulario");
    let nombre = document.querySelector("#nombre");
    let telefono = document.querySelector("#telefono");
    let email = document.querySelector("#email");
    let mensajeSocio = document.querySelector("#mensaje-socio");


    if(captcha.value == suma){
      if (nombre.value == "" || telefono.value == "" || email.value == "" || mensajeSocio.value == ""){
        captchaMensaje.innerHTML = "El captcha se resolvio correctamente!";
        formularioaValue.innerHTML = "Hay campos incompletos, por favor completar el formulario";
      }
      else{
        captchaMensaje.innerHTML = "";
        formularioaValue.innerHTML = "formulario enviado!";
       
      }
    }
    else {
        captchaMensaje.innerHTML = "captcha incorrecto!"
        formularioaValue.innerHTML = "";
      }
  
    }