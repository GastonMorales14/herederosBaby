"use strict";
const url = `https://60d246a8858b410017b2d7f3.mockapi.io/api/v1/jugadores`;
let id = 0;

async function obtenerDatos() {
  const lista = document.querySelector("#jugadoresCargados");
  lista.innerHTML = "";

  try {
    let res = await fetch(url);
    let json = await res.json();
    console.log(json);
    for (const jugador of json) {
      let nombre = jugador.nombre;
      let numero = jugador.numero;
      let categoria = jugador.categoria;
      id = jugador.id;
      lista.innerHTML += `<td> ${nombre}</td>
                            <td> ${numero}</td>
                            <td> ${categoria}</td>
                            <td>
                            <button id="eliminarCreado" data-id ="${id}">Eliminar</button>
                            <button id="modificarCreado" data-id ="${id}">Modificar</button>
                            </td>
                            `;
      document.querySelectorAll("#eliminarCreado").forEach((boton) => {
        boton.addEventListener("click", borrarSeleccionado);
      });
      document.querySelectorAll("#modificarCreado").forEach((boton) => {
        boton.addEventListener("click", editarSeleccionado);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function enviarDatos() {
  let nombre = document.querySelector("#nombreJugador").value;
  let numero = document.querySelector("#numeroCamiseta").value;
  let categoria = document.querySelector("#categoria").value;

  let jugador = {
    nombre: nombre,
    numero: numero,
    categoria: categoria,
  };

  try {
    let res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(jugador),
    });
    if (res.status === 201) {
      document.querySelector("#mensaje").innerHTML = "Creado!";
    }
  } catch (error) {
    console.log(error);
  }

  obtenerDatos();
}

async function borrarSeleccionado() {
  let id = this.dataset.id;
  try {
    let res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      document.querySelector("#mensaje").innerHTML = "Borrado!";
    }
  } catch (error) {
    console.log(error);
  }

  obtenerDatos();
}

async function editarSeleccionado() {
  let id = this.dataset.id;
  let nombre = document.querySelector("#nombreJugador").value;
  let numero = document.querySelector("#numeroCamiseta").value;
  let categoria = document.querySelector("#categoria").value;

  let jugador = {
    nombre: nombre,
    numero: numero,
    categoria: categoria,
  };

  try {
    let res = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(jugador),
    });
    if (res.status == 200) {
      document.querySelector("#mensaje").innerHTML = "Editado!";
    }
  } catch (error) {
    console.log(error);
  }

  obtenerDatos();
}

async function obtenerDatosFiltrados() {
  let numeroElegido = document.querySelector("#numeroCamisetaFiltro").value;
  const lista = document.querySelector("#jugadoresCargados");
  lista.innerHTML = "";

  try {
    let res = await fetch(url);
    let json = await res.json();
    for (const jugador of json) {
      if (jugador.numero === numeroElegido) {
        let nombre = jugador.nombre;
        let numero = jugador.numero;
        let categoria = jugador.categoria;
        id = jugador.id;
        lista.innerHTML += `<td> ${nombre}</td>
                            <td> ${numero}</td>
                            <td> ${categoria}</td>
                            <td>
                            <button id="eliminarCreado" data-id ="${id}">Eliminar</button>
                            <button id="modificarCreado" data-id ="${id}">Modificar</button>
                            </td>
                            `;
        document.querySelectorAll("#eliminarCreado").forEach((boton) => {
          boton.addEventListener("click", borrarSeleccionado);
        });
        document.querySelectorAll("#modificarCreado").forEach((boton) => {
          boton.addEventListener("click", editarSeleccionado);
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

document.querySelector("#btn-enviar").addEventListener("click", enviarDatos);
document
  .querySelector("#btn-filtrar")
  .addEventListener("click", obtenerDatosFiltrados);

obtenerDatos();
