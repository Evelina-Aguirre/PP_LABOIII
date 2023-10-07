import { datos } from "./Datos.js";
import { crearTabla } from "./tabla.js";
import { actualizarStorage} from "./stroraje.js";
import { cargarFormulario, vaciarFormulario } from "./formulario.js";



const tabla = document.getElementById("tabla");
const actualizarTabla=(personas)=>{
    tabla.innerHTML = '';
    tabla.appendChild(crearTabla(personas));
}
actualizarTabla(datos);


//////////////////////////////////////////////////////// SECCIÓN FIELDSET -ABM DATOS- ///////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", cargaAnio);
document.addEventListener("DOMContentLoaded", cargaVelocidad);
document.addEventListener("DOMContentLoaded", cargaTipo);

//CARGA SELECT EDADES A PARTIR DE ID :"txtEdad"
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
//CARGA SELECT TIPO A PARTIR DE ID :"tipo"
function cargaTipo() {

    var selectTipo = document.getElementById("tipo");
    var datos = [{
        id: "aereo", nombre: "Aereo" },
    { id: "terrestre", nombre: "Terrestre" }];

    for (var i = 0; i < datos.length; i++) {
        var option = document.createElement("option");
        option.value = datos[i].id;
        option.text = datos[i].nombre;
        selectTipo.appendChild(option);
    }
}

//CARGA CAMPOS DE UN FIELDSET VACIO SEGÚN TIPO SELECCIONADO
let tipoUsuarioSelect=document.getElementById("tipo");
let camposSegunTipo=document.getElementById("camposSegunTipo");

tipoUsuarioSelect.addEventListener("change",function(){
    
    while (camposSegunTipo.firstChild) {
        camposSegunTipo.removeChild(camposSegunTipo.firstChild);
    }

    if(tipoUsuarioSelect.value==="aereo")
    { camposSegunTipo.style.display = "block";
        cargarcamposTipoUsuarioUno();
    }
    else if(tipoUsuarioSelect.value==="terrestre")
    { camposSegunTipo.style.display = "block";
        cargarcamposTipoUsuarioDos();
    }
})

function cargarcamposTipoUsuarioUno(){

    let legendAereo=document.createElement("legend");
    legendAereo.textContent="Vehículo Aereo";
   
    let labelAltura= document.createElement("label");
    labelAltura.textContent="Altura máxima";
    let inpunAltura=document.createElement("input");
    inpunAltura.type="text";
    inpunAltura.id="txtAltura";
    inpunAltura.name="alturaMax";
    
    let labelAutonomia= document.createElement("label");
    labelAutonomia.textContent="Autonomía";
    
    let inpuntAutonomia=document.createElement("input");
    inpuntAutonomia.type="text";
    inpuntAutonomia.id="txtAutonomia";
    inpuntAutonomia.name="txtAutonomia";

    camposSegunTipo.appendChild(legendAereo);
    camposSegunTipo.appendChild(labelAltura);
    camposSegunTipo.appendChild(inpunAltura);
    camposSegunTipo.appendChild(labelAutonomia);
    camposSegunTipo.appendChild(inpuntAutonomia);
}

function cargarcamposTipoUsuarioDos(){

    let legendTerrestre=document.createElement("legend");
    legendTerrestre.textContent="Vehículo terrestre";
    
    let labelCantPuertas= document.createElement("label");
    labelCantPuertas.textContent="Cantidad puertas";
    let inpunCantPuertas=document.createElement("input");
    inpunCantPuertas.type="text";
    inpunCantPuertas.id="txtCantPue";
    inpunCantPuertas.name="txtCantPue";
    
    let labelCantRuedas= document.createElement("label");
    labelCantRuedas.textContent="Cantidad de ruedas";
   
    let inpuntCantRuedas=document.createElement("input");
    inpuntCantRuedas.type="text";
    inpuntCantRuedas.id="txtCantRue";
    inpuntCantRuedas.name="txtCantRue";


    camposSegunTipo.appendChild(legendTerrestre);
    camposSegunTipo.appendChild(labelCantPuertas);
    camposSegunTipo.appendChild(inpunCantPuertas);
    camposSegunTipo.appendChild(labelCantRuedas);
    camposSegunTipo.appendChild(inpuntCantRuedas);
}

////////////////////////////////////// ALTA BAJA MODIFICACION A PARTIR DE FORM ////////////////////////////////////////////

const $formulario = document.forms[0];
const $btnAgregar = document.getElementById("btnAgregar");
const $btnEliminar = document.getElementById("btnEliminar");

window.addEventListener("click", handlerClick);


    function handlerClick(e) {
       if(e.target.nodeName=="TD"){

       
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
      
            console.log(selectedVehiculo);
            if(selectedVehiculo.cantPue)
            {
                tipoUsuarioSelect.value="terrestre";
                camposSegunTipo.style.display = "block";
                cargarcamposTipoUsuarioDos();
                
            }
            else
            {
                tipoUsuarioSelect.value="aereo";
                camposSegunTipo.style.display = "block";
                cargarcamposTipoUsuarioUno();
            }
            cargarFormulario($formulario, selectedVehiculo);
        
            $btnAgregar.value = "Modificar";
            $btnEliminar.disabled = false;
        
          } else if (e.target.matches("input[type='button'][value='Eliminar']")) {
            handlerDelete(parseInt($formulario.txtId.value));
        
          } else if (e.target.matches("input[type='button'][value='Cancelar']")) {
            vaciarFormulario($formulario);
          }
        }
        
    }

 
    $formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("entreal submit");
        console.log($formulario.txtId.value);
        var selectTipo = document.getElementById("tipo");
        console.log(selectTipo.value);
        cargaTipo();
      
        const { txtId, txtModelo, txtAnoFab, txtVelMax,txtAltura,txtAutonomia,txtCantPue,txtCantRue } = $formulario;
      
        if (txtId.value === "") {
            if(selectTipo.value == "aereo")
            {
                const newVehiculo = new Aereo("", txtModelo.value, txtAnoFab.value, txtVelMax.value, txtAltura.value, txtAutonomia.value);
                handlerCreate(newVehiculo);

            }else if(selectTipo.value == "terrestre")
            {
                const newVehiculo = new Terrestre("", txtModelo.value, txtAnoFab.value, txtVelMax.value, txtCantPue.value, txtCantRue.value);
                handlerCreate(newVehiculo);
            }
        } else {
            if(selectTipo.value == "aereo")
            {
                const newVehiculo = new Aereo("", txtModelo.value, txtAnoFab.value, txtVelMax.value, txtAltura.value, txtAutonomia.value);
                handlerCreate(newVehiculo);

            }else if(selectTipo.value == "terrestre")
            {
                const newVehiculo = new Terrestre("", txtModelo.value, txtAnoFab.value, txtVelMax.value, txtCantPue.value, txtCantRue.value);
                handlerCreate(newVehiculo);
            }
          handlerUpdate(updatedVehiculo);
        }
      
        //vaciarFormulario($formulario);
      });

    function handlerCreate(Vehiculo) {

        datos.push(nuevoVehiculo);
        actualizarStorage("datos", Vehiculo);
        actualizarTabla(datos);
        calcularPromedio();
      }
      

      function handlerUpdate(editVehiculo) {
        let index = datos.findIndex((veh) => veh.id == editVehiculo.id);
        vehiculo.splice(index, 1, editPersonaje);
        actualizarStorage("datos", datos);
        actualizarTabla(datos);
        calcularPromedio();
      }


    ///////////////////////////////////////////////////////CHECKBOXES SELECCIONADOS ////////////////////////////////////////
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

    //////////////////////////////////// CALCULAR PROMEDIO //////////////////////////////
    function calcularPromedio() {
        const total = datos.reduce(
          (total, vehiculo) => total + parseInt(vehiculo.velMax),
          0
        );
        const promedio= total / datos.length;
      
        const txtPromedio = document.getElementById("txtPromedio");
        txtPromedio.value =isNaN(promedio) ? "No hay velocidades válidas" : promedio.toFixed(2);
      }

      const btnCalcular = document.getElementById("btnPromedio");
      btnCalcular.addEventListener("click", function () {
       
        const tabla = document.querySelector("table");
       const celdasEdad = tabla.querySelectorAll("tr td:nth-child(4)");
       calcularPromedio();
        
        
    });

//////////////////////////////////FILTRA SEGÚN TIPO Y CARGA LA TABLA //////////////////////////////////////


const selectFiltrarPor = document.getElementById('FiltrarPor');

selectFiltrarPor.addEventListener('change', function () {
    
    const valorSeleccionado = selectFiltrarPor.value;
    console.log(valorSeleccionado);

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
        actualizarTabla(resultado.terrestres);
    } else if (valorSeleccionado === 'Terrestre') {
        actualizarTabla(resultado.aereos);
    } else {
        actualizarTabla(datos);
    }
});










   

