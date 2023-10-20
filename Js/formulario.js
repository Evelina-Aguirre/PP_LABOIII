
const $btnAgregar = document.getElementById("btnAgregar");
const $btnEliminar = document.getElementById("btnEliminar");


export function cargarFormulario(formulario, vehiculo) {

    formulario.txtId.value = vehiculo.id;
    formulario.txtModelo.value = vehiculo.modelo;
    formulario.txtAnoFab.value = vehiculo.anoFab;
    formulario.txtVelMax.value = vehiculo.velMax;

    for (const key in vehiculo) {
        if (key == "altMax") {
            const txtAltura = document.getElementById("txtAltura");
            const txtAutonomia = document.getElementById("txtAutonomia");
            txtAltura.value = vehiculo.altMax;
            txtAutonomia.value = vehiculo.autonomia;

        }
        if (key == "cantRue") {
            const txtCantRue = document.getElementById("txtCantRue");
            const txtCantPue = document.getElementById("txtCantPue");
            txtCantPue.value = vehiculo.cantPue;
            txtCantRue.value = vehiculo.cantRue;
        }
    }

}

export function vaciarFormulario(formulario) {
    formulario.txtId.value = "";
    formulario.txtModelo.value = "";
    cargaAnio();
    cargaVelocidad();
    cargaTipo();
    camposSegunTipo.style.display = "none";
    $btnAgregar.value = "Agregar";
    $btnEliminar.disabled = true;

}

document.addEventListener("DOMContentLoaded", cargaAnio);
document.addEventListener("DOMContentLoaded", cargaVelocidad);
document.addEventListener("DOMContentLoaded", cargaTipo);


function cargaAnio() {
    var selectEdad = document.getElementById("txtAnoFab");
    for (var i = 1885; i <= 2023; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        selectEdad.appendChild(option);
    }
}
function cargaVelocidad() {
    var selectEdad = document.getElementById("txtVelMax");
    for (var i = 60; i <= 1000; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        selectEdad.appendChild(option);
    }
}
export function cargaTipo() {

    var selectTipo = document.getElementById("tipo");
    while (selectTipo.firstChild) {
        selectTipo.removeChild(selectTipo.firstChild);
    }
    var datos = [{
      id: "aereo", nombre: "Aereo"},
    { id: "terrestre", nombre: "Terrestre" }];

    for (var i = 0; i < datos.length; i++) {
        var option = document.createElement("option");
        option.value = datos[i].id;
        option.text = datos[i].nombre;
        selectTipo.appendChild(option);
    }
}