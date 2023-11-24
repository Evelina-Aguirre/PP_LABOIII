import { datos } from "./Datos.js";
import { crearTabla } from "./tabla.js";
import { actualizarStorage } from "./stroraje.js";
import { cargarFormulario, vaciarFormulario, cargaTipo } from "./formulario.js";
import Vehiculo from "./Vehiculo.js";
import { actualizarIds } from "./Vehiculo.js";

const url = "http://localhost:8080/SP_LABOIII_AGUIRRE/vehiculoAereoTerrestre.php";

class Aereo extends Vehiculo {

    constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
        super(id, modelo, anoFab, velMax);

        this.altMax = altMax;
        this.autonomia = autonomia;
    }
}

class Terrestre extends Vehiculo {

    constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
        super(id, modelo, anoFab, velMax,);

        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }
}

function actualizarPorFetch() {
    fetch(url, {
        method: 'GET'
    })
        .then(response => {
            mostrarSpinner();
            if (response.ok) {
                console.log(response.status);
                actualizarTabla(datos);
                ocultarSpinner();
            } else if (response.status == 304) {
                console.log("No hubo cambio en los datos.");
                mostrarAdvertencia("No se realizo modificación", "Blue");
                ocultarSpinner();
            }
            if (!response.ok) {
                ocultarSpinner();
                mostrarAdvertencia("Error al obtener datos.", "Red");
            }
            return response.json();
        })
        .then(response => {
            actualizarStorage("datos", datos);
            console.log("Datos actualizados:", datos);
        }).catch(error => {
            ocultarSpinner();
            console.error("Error en la solicitud fetch:", error);
            mostrarAdvertencia("Error en la solicitud. Consulta la consola para obtener más detalles.", "Red");
        });

}
actualizarPorFetch();


/////////////////////////ALTA XMLHttpRequest ////////////////////////////////
function altaVehiculo(nuevoVehiculo) {
    const xhttp = new XMLHttpRequest();

    //url "http://localhost:8080/SP_LABOIII_AGUIRRE/vehiculoAereoTerrestre.php"
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    mostrarSpinner();


    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {

            if (xhttp.status === 200) {
                const respuesta = JSON.parse(xhttp.responseText);
                datos.push(nuevoVehiculo);

                actualizarStorage("datos", datos);
                actualizarTabla(datos);

                mostrarTablaOcultarFormulario();
                ocultarSpinner();
            } else {
                mostrarAdvertencia("No fue posible realizar el alta", "Red");
                mostrarTablaOcultarFormulario();
                setTimeout(function () {
                    ocultarSpinner();
                }, 2000);
            }
        }
    };

    xhttp.send(JSON.stringify({
        modelo: nuevoVehiculo.modelo,
        anoFab: nuevoVehiculo.anoFab,
        velMax: nuevoVehiculo.velMax,
        tipo: nuevoVehiculo instanceof Aereo ? 'aereo' : 'terrestre',
        ...(nuevoVehiculo instanceof Aereo
            ? { alturaMax: nuevoVehiculo.altMax, autonomia: nuevoVehiculo.autonomia }
            : { cantPue: nuevoVehiculo.cantPue, cantRue: nuevoVehiculo.cantRue }
        ),
    }));
}

///////////////////////////Modificar fetch///////////////////////////////////
async function modificarVehiculo(id, vehiculo) {

    //url "http://localhost:8080/SP_LABOIII_AGUIRRE/vehiculoAereoTerrestre.php";
    mostrarSpinner();

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehiculo),
        });

        if (response.ok) {

            handlerUpdate(vehiculo);

            ocultarSpinner();
            mostrarTablaOcultarFormulario();

        } else {
            ocultarSpinner();
            mostrarAdvertencia("No se pudo realizar la operación.", "Red");
            mostrarTablaOcultarFormulario();
        }
    } catch (error) {

        ocultarSpinner();
        console.error("Error en la solicitud fetch:", error);
        mostrarAdvertencia("Error en la solicitud.", "Red");
    }

}


//////////////////////////////////////////ELIMINAR //////////////////////////////////
function eliminarElemento(id) {
    mostrarSpinner();

    return new Promise((exito, falla) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        })
        .then(response => {
            if (response.ok) {
                exito();
            } else {
                falla("No se pudo realizar la operación.");
            }
        })
        .catch(error => {
            falla("Error en la solicitud fetch. Consulta la consola para obtener más detalles.");
        })
        .finally(() => {
            ocultarSpinner();
        });
    })
    .then(() => handlerDelete(id))
    .catch(errorMessage => mostrarAdvertencia(errorMessage, "Red"));
}

const tabla = document.getElementById("tabla");
const actualizarTabla = (vehiculos) => {
    tabla.innerHTML = '';
    tabla.appendChild(crearTabla(vehiculos));
}




const btnAgregarNuevo = document.getElementById("btnAgregarNuevo");
const seccionFormulario = document.querySelector(".Seccion-Formulario");
const main = document.querySelector("main");
const tituloFormulario = document.querySelector('.Titulo-Form');

btnAgregarNuevo.addEventListener("click", function () {
    vaciarFormulario($formulario);
    tituloFormulario.textContent = 'Alta vehículo';
    mostrarFormularioOcultandoTabla();



});

//CARGA CAMPOS DE UN FIELDSET VACIO SEGÚN TIPO SELECCIONADO
let tipoUsuarioSelect = document.getElementById("tipo");
let camposSegunTipo = document.getElementById("camposSegunTipo");

tipoUsuarioSelect.addEventListener("change", function () {

    while (camposSegunTipo.firstChild) {
        camposSegunTipo.removeChild(camposSegunTipo.firstChild);
    }

    if (tipoUsuarioSelect.value === "aereo") {
        camposSegunTipo.style.display = "block";
        cargarcamposTipoUsuarioUno();
    }
    else if (tipoUsuarioSelect.value === "terrestre") {
        camposSegunTipo.style.display = "block";
        cargarcamposTipoUsuarioDos();
    }
})

function cargarcamposTipoUsuarioUno() {

    let legendAereo = document.createElement("legend");
    legendAereo.textContent = "Vehículo Aereo";

    let labelAltura = document.createElement("label");
    labelAltura.textContent = "Altura máxima";
    let inpunAltura = document.createElement("input");
    inpunAltura.type = "number";
    inpunAltura.id = "txtAltura";
    inpunAltura.name = "alturaMax";
    inpunAltura.placeholder = "Altura(0-1000000)";
    inpunAltura.min = "0";
    inpunAltura.max = "1000000";
    inpunAltura.required = true;
    let errorSpanAlt = document.createElement("span");
    errorSpanAlt.id = "alturaError";
    errorSpanAlt.className = "error";

    let labelAutonomia = document.createElement("label");
    labelAutonomia.textContent = "Autonomía";

    let inpuntAutonomia = document.createElement("input");
    inpuntAutonomia.type = "number";
    inpuntAutonomia.id = "txtAutonomia";
    inpuntAutonomia.name = "txtAutonomia";
    inpuntAutonomia.placeholder = "Autonomía (0-1000000)";
    inpuntAutonomia.min = "0";
    inpuntAutonomia.max = "1000000";
    inpuntAutonomia.required = true;
    let errorSpanAuton = document.createElement("span");
    errorSpanAuton.id = "autonomiaError";
    errorSpanAuton.className = "error";

    camposSegunTipo.appendChild(errorSpanAlt);
    camposSegunTipo.appendChild(errorSpanAuton);
    camposSegunTipo.appendChild(legendAereo);
    camposSegunTipo.appendChild(labelAltura);
    camposSegunTipo.appendChild(inpunAltura);
    camposSegunTipo.appendChild(labelAutonomia);
    camposSegunTipo.appendChild(inpuntAutonomia);
}

function cargarcamposTipoUsuarioDos() {

    let legendTerrestre = document.createElement("legend");
    legendTerrestre.textContent = "Vehículo terrestre";

    let labelCantPuertas = document.createElement("label");
    labelCantPuertas.textContent = "Cantidad puertas";
    let inpunCantPuertas = document.createElement("input");
    inpunCantPuertas.type = "number";
    inpunCantPuertas.id = "txtCantPue";
    inpunCantPuertas.name = "txtCantPue";
    inpunCantPuertas.placeholder = "Cantidad puertas(0-10)";
    inpunCantPuertas.min = "0";
    inpunCantPuertas.max = "10";
    inpunCantPuertas.required = true;
    let errorSpanPue = document.createElement("span");
    errorSpanPue.id = "puertasError";
    errorSpanPue.className = "error";


    let labelCantRuedas = document.createElement("label");
    labelCantRuedas.textContent = "Cantidad de ruedas";

    let inpuntCantRuedas = document.createElement("input");
    inpuntCantRuedas.type = "number";
    inpuntCantRuedas.id = "txtCantRue";
    inpuntCantRuedas.name = "txtCantRue";
    inpuntCantRuedas.placeholder = "Cantidad Ruedas (1-100)";
    inpuntCantRuedas.min = "0";
    inpunCantPuertas.max = "100";
    inpunCantPuertas.required = true;
    let errorSpanRue = document.createElement("span");
    errorSpanRue.id = "ruedasError";
    errorSpanRue.className = "error";

    camposSegunTipo.appendChild(errorSpanPue);
    camposSegunTipo.appendChild(errorSpanRue);
    camposSegunTipo.appendChild(legendTerrestre);
    camposSegunTipo.appendChild(labelCantPuertas);
    camposSegunTipo.appendChild(inpunCantPuertas);
    camposSegunTipo.appendChild(labelCantRuedas);
    camposSegunTipo.appendChild(inpuntCantRuedas);
}

function mostrarFormulario(selectedVehiculo) {
    mostrarFormularioOcultandoTabla();
    while (camposSegunTipo.firstChild) {
        camposSegunTipo.removeChild(camposSegunTipo.firstChild);
    }
    camposSegunTipo.style.display = "block";

    if (selectedVehiculo.cantRue) {
        tipoUsuarioSelect.value = "terrestre";
        camposSegunTipo.style.display = "block";
        cargarcamposTipoUsuarioDos();
    }
    if (selectedVehiculo.autonomia) {
        tipoUsuarioSelect.value = "aereo";
        camposSegunTipo.style.display = "block";
        cargarcamposTipoUsuarioUno();
    }

    cargarFormulario($formulario, selectedVehiculo);

    $btnAgregar.value = "Modificar";
    $btnEliminar.disabled = false;
}


////////////////////////////////////// ABM A PARTIR DE FORM ////////////////////////////////////////////

const $formulario = document.forms[0];
const $btnAgregar = document.getElementById("btnAgregar");
const $btnEliminar = document.getElementById("btnEliminar");
const $btnEliminarEnTabla = document.getElementById("btnEliminarEnTabla");
const $btnModificarEnTabla = document.getElementById("btnModificarEnTabla");

window.addEventListener("click", handlerClick);


function handlerClick(e) {
    const id = obtenerIdFila(e.target);

    if (e.target.nodeName == "TD") {
        const selectedVehiculo = datos.find((per) => per.id == id);
        mostrarFormulario(selectedVehiculo);
        tituloFormulario.textContent = 'Modificar vehículo';
        mostrarFormularioOcultandoTabla();
    }

    if (e.target.matches("input[type='button'][value='Eliminar'][id='btnEliminar']")) {
        handlerDelete(parseInt($formulario.txtId.value));
        seccionFormulario.style.display = "none";
        mostrarTablaOcultarFormulario();
    }

    if (e.target.matches("input[type='button'][value='Cancelar']")) {
        vaciarFormulario($formulario);
        mostrarTablaOcultarFormulario();
    }


}



tabla.addEventListener("click", function (e) {
    const id = obtenerIdFila(e.target);

    if (e.target.matches("button.btnEliminarEnTabla")) {
        const selectedVehiculo = datos.find((per) => per.id == id);
        eliminarElemento(parseInt(selectedVehiculo.id));
        mostrarTablaOcultarFormulario();

    }

    if (e.target.matches("button.btnModificarEnTabla")) {
        const selectedVehiculo = datos.find((per) => per.id == id);
        tituloFormulario.textContent = 'Modificar vehículo';
        mostrarFormulario(selectedVehiculo);
    }
});

function obtenerIdFila(elemento) {
    const fila = elemento.closest("tr");

    if (fila) {
        const celdas = fila.getElementsByTagName("td");
        if (celdas.length > 0) {
            const id = celdas[0].textContent.trim();

            if (id) {
                return id;
            }
        }
    }
    return null;
}





$formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    var selectTipo = document.getElementById("tipo");


    const { txtId, txtModelo, txtAnoFab, txtVelMax, txtAltura, txtAutonomia, txtCantPue, txtCantRue } = $formulario;
    const body = {
        modelo: txtModelo.value,
        anoFab: txtAnoFab.value,
        velMax: txtVelMax.value,
        tipo: tipoUsuarioSelect.value,
        ...(tipoUsuarioSelect.value === "aereo"
            ? { alturaMax: txtAltura.value, autonomia: txtAutonomia.value }
            : { cantPue: txtCantPue.value, cantRue: txtCantRue.value }
        ),
    };


    if (txtId.value === "") {
        if (window.getComputedStyle(camposSegunTipo).display === "block") {
            if (selectTipo.value == "aereo") {
                const newVehiculo = new Aereo("", txtModelo.value, txtAnoFab.value, parseInt(txtVelMax.value), txtAltura.value, parseInt(txtAutonomia.value));
                altaVehiculo(newVehiculo);

            } else if (selectTipo.value == "terrestre") {
                const newVehiculo = new Terrestre("", txtModelo.value, txtAnoFab.value, txtVelMax.value, txtCantPue.value, txtCantRue.value);
                altaVehiculo(newVehiculo);
            }
            vaciarFormulario($formulario);
            seccionFormulario.style.display = "none";
            mostrarTablaOcultarFormulario();
        } else {
            document.getElementById("errorMensaje").style.display = "block";
        }
        setTimeout(function () {
            document.getElementById("errorMensaje").style.display = "none";
        }, 4000);
    } else {
        if (selectTipo.value == "aereo") {
            const newVehiculo = new Aereo(txtId.value, txtModelo.value, txtAnoFab.value, txtVelMax.value, txtAltura.value, parseInt(txtAutonomia.value));
            modificarVehiculo(txtId.value, newVehiculo);
            mostrarTablaOcultarFormulario();

        } else if (selectTipo.value == "terrestre") {
            const newVehiculo = new Terrestre(txtId.value, txtModelo.value, txtAnoFab.value, txtVelMax.value, txtCantPue.value, txtCantRue.value);
            modificarVehiculo(txtId.value, newVehiculo);
            mostrarTablaOcultarFormulario();
        }
        vaciarFormulario($formulario);
        seccionFormulario.style.display = "none";
        mostrarTablaOcultarFormulario();
    }


});



function handlerCreate(nuevoVehiculo) {

    datos.push(nuevoVehiculo);
    actualizarStorage("datos", nuevoVehiculo);
    actualizarTabla(datos);
}


function handlerUpdate(editVehiculo) {
    let index = datos.findIndex((veh) => veh.id == editVehiculo.id);
    if (index !== -1) {
        let datosActualizados = datos.map((vehiculo, i) => {
            if (i === index) {
                return editVehiculo;
            }
            return vehiculo;
        });
        datos[index] = editVehiculo;
        actualizarStorage("datos", datos);
        actualizarTabla(datos);
    }

}

function handlerDelete(id) {

    const confirmDelete = confirm("¿Está seguro de que desea eliminar esta entrada?");
    console.log(confirmDelete);
    if (confirmDelete) {
        let index = datos.findIndex((vehi) => vehi.id == id);
        console.log(index);
        datos.splice(index, 1);
        actualizarStorage("datos", datos);
        actualizarIds(datos);
        actualizarTabla(datos);
        $formulario.reset();
        $formulario.txtId.value = "";

    }
}



const checkboxes = document.querySelectorAll(".cheks input[type='checkbox']");
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {

        tabla.querySelectorAll("th").forEach((th, index) => {

            if (checkboxes[index].checked) {

                th.style.display = "table-cell";
                tabla.querySelectorAll(`tr td:nth-child(${index + 1})`).forEach((td) => {
                    td.style.display = "table-cell";
                });
            } else {

                th.style.display = "none";
                tabla.querySelectorAll(`tr td:nth-child(${index + 1})`).forEach((td) => {
                    td.style.display = "none";
                });
            }
        });
    });
});

//////////////////////////////////// PROMEDIO //////////////////////////////
function calcularPromedio(celdasVelocidad) {
    const total = celdasVelocidad.reduce(
        (total, vehiculo) => total + parseInt(vehiculo.velMax),
        0
    );
    const promedio = total / datos.length;

    const txtPromedio = document.getElementById("txtPromedio");
    txtPromedio.value = isNaN(promedio) ? "No hay velocidades válidas" : promedio.toFixed(2);
}


//////////////////////////////////FILTRA SEGÚN TIPO Y CARGA LA TABLA //////////////////////////////////////

const selectFiltrarPor = document.getElementById('FiltrarPor');
const btnCalcular = document.getElementById("btnPromedio");

selectFiltrarPor.addEventListener('change', function () {

    const valorSeleccionado = selectFiltrarPor.value;

    const resultado = datos.reduce((acumulador, vehiculo) => {
        if (vehiculo.cantPue !== undefined) {
            acumulador.terrestres.push(vehiculo);
        }
        if (vehiculo.autonomia !== undefined) {
            acumulador.aereos.push(vehiculo);
        }
        return acumulador;
    }, { terrestres: [], aereos: [] });

    if (valorSeleccionado === 'Aereo') {
        tabla.innerHTML = '';
        actualizarTabla(resultado.aereos);

    } else if (valorSeleccionado === 'Terrestre') {
        tabla.innerHTML = '';
        actualizarTabla(resultado.terrestres);
    } else {
        tabla.innerHTML = '';
        actualizarTabla(datos);
    }

    btnCalcular.addEventListener("click", function () {
        if (valorSeleccionado === 'Aereo') {
            calcularPromedio(resultado.aereos);

        } else if (valorSeleccionado === 'Terrestre') {
            calcularPromedio(resultado.terrestres);
        } else {
            calcularPromedio(datos);
        }
    });
});

btnCalcular.addEventListener("click", function () {

    calcularPromedio(datos);

});

function mostrarTablaOcultarFormulario() {
    main.style.display = "block";
    seccionFormulario.style.display = "none";
}

function mostrarFormularioOcultandoTabla() {
    main.style.display = "none";
    seccionFormulario.style.display = "block";
}


function mostrarAdvertencia(mensaje, color) {
    const mensajeFlotante = document.createElement('div');
    mensajeFlotante.className = 'mensaje-flotante';
    mensajeFlotante.textContent = mensaje;

    document.body.appendChild(mensajeFlotante);

    mensajeFlotante.style.position = 'fixed';
    mensajeFlotante.style.top = '50%';
    mensajeFlotante.style.left = '50%';
    mensajeFlotante.style.transform = 'translate(-50%, -50%)';
    mensajeFlotante.style.backgroundColor = color;
    mensajeFlotante.style.padding = '50px';
    mensajeFlotante.style.border = '2px solid #ccc';
    mensajeFlotante.style.borderRadius = '10px';
    mensajeFlotante.style.fontSize = '30px';

    setTimeout(() => {
        document.body.removeChild(mensajeFlotante);
    }, 5000);
}

/////////SPINNNER
document.addEventListener("DOMContentLoaded", function () {

    mostrarSpinner();
    setTimeout(function () {
        ocultarSpinner();
    }, 2000);
});

function mostrarSpinner() {
    var spinner = document.getElementById("spinner");
    var fondoBloqueo = document.getElementById("fondoBloqueo");

    spinner.style.display = "block";
    fondoBloqueo.style.display = "block";
    document.body.style.overflow = "hidden";
}

function ocultarSpinner() {
    var spinner = document.getElementById("spinner");
    var fondoBloqueo = document.getElementById("fondoBloqueo");

    spinner.style.display = "none";
    fondoBloqueo.style.display = "none";
    document.body.style.overflow = "auto";
}










