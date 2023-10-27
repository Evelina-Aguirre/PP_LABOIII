import { datos } from "./Datos.js";
import { crearTabla } from "./tabla.js";
import { actualizarStorage } from "./stroraje.js";
import { cargarFormulario, vaciarFormulario, cargaTipo } from "./formulario.js";
import Vehiculo from "./Vehiculo.js";
import { actualizarIds } from "./Vehiculo.js";

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


const tabla = document.getElementById("tabla");
const actualizarTabla = (vehiculos) => {
    tabla.innerHTML = '';
    console.log(vehiculos);
    tabla.appendChild(crearTabla(vehiculos));
}
actualizarTabla(datos);


const btnAgregar= document.getElementById("btnAgregarNuevo");
const seccionFormulario = document.querySelector(".Seccion-Formulario");

btnAgregar.addEventListener("click", function() {
    seccionFormulario.style.display = "block";
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




////////////////////////////////////// ABM A PARTIR DE FORM ////////////////////////////////////////////

const $formulario = document.forms[0];
const $btnAgregar = document.getElementById("btnAgregar");
const $btnEliminar = document.getElementById("btnEliminar");

window.addEventListener("click", handlerClick);

function handlerClick(e) {
    if (e.target.nodeName == "TD") {

        seccionFormulario.style.display = "block";
        while (camposSegunTipo.firstChild) {
            camposSegunTipo.removeChild(camposSegunTipo.firstChild);
        }
        camposSegunTipo.style.display = "none";
        const id = e.target.parentElement.dataset.id;
        console.log(id);
        if (e.target.matches("td")) {
            const id = e.target.parentElement.dataset.id;
            const selectedVehiculo = datos.find((per) => {
                return per.id == id;
            })

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

    }
    if (e.target.matches("input[type='button'][value='Eliminar'][id='btnEliminar']")) {

        handlerDelete(parseInt($formulario.txtId.value));
        seccionFormulario.style.display = "none";
    }

    if (e.target.matches("input[type='button'][value='Cancelar']")) {

        vaciarFormulario($formulario);
        seccionFormulario.style.display = "none";
       
    }

}



$formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log($formulario.txtId.value);
    var selectTipo = document.getElementById("tipo");
    console.log(selectTipo.value);

    const { txtId, txtModelo, txtAnoFab, txtVelMax, txtAltura, txtAutonomia, txtCantPue, txtCantRue } = $formulario;

    if (txtId.value === "") {
        if (window.getComputedStyle(camposSegunTipo).display === "block") {
            if (selectTipo.value == "aereo") {
                const newVehiculo = new Aereo("", txtModelo.value, txtAnoFab.value, parseInt(txtVelMax.value), txtAltura.value, parseInt(txtAutonomia.value));
                handlerCreate(newVehiculo);

            } else if (selectTipo.value == "terrestre") {
                const newVehiculo = new Terrestre("", txtModelo.value, txtAnoFab.value, txtVelMax.value, txtCantPue.value, txtCantRue.value);
                handlerCreate(newVehiculo);
            }
            vaciarFormulario($formulario);
            seccionFormulario.style.display = "none";
        } else {
            document.getElementById("errorMensaje").style.display = "block";
        }
        setTimeout(function () {
            document.getElementById("errorMensaje").style.display = "none";
        }, 4000);
    } else {
        if (selectTipo.value == "aereo") {
            const newVehiculo = new Aereo(txtId.value, txtModelo.value, txtAnoFab.value, txtVelMax.value, txtAltura.value, parseInt(txtAutonomia.value));
            handlerUpdate(newVehiculo);

        } else if (selectTipo.value == "terrestre") {
            const newVehiculo = new Terrestre(txtId.value, txtModelo.value, txtAnoFab.value, txtVelMax.value, txtCantPue.value, txtCantRue.value);
            handlerUpdate(newVehiculo);
        }
        vaciarFormulario($formulario);
        seccionFormulario.style.display = "none";
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
        actualizarIds(datos)
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

















