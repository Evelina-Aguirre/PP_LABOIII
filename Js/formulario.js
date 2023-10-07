
const $btnAgregar = document.getElementById("btnAgregar");
const $btnEliminar = document.getElementById("btnEliminar");

export function cargarFormulario(formulario, vehiculo){

    formulario.txtId.value= vehiculo.id;
    formulario.txtModelo.value = vehiculo.modelo;
    formulario.txtAnoFab.value = vehiculo.anoFab;
    formulario.txtVelMax.value=vehiculo.velMax;
    
    for (const key in vehiculo) {
        if ( key == "altMax") {
            const txtAltura = document.getElementById("txtAltura");
            const txtAutonomia=document.getElementById("txtAutonomia");
            txtAltura.value=vehiculo.altMax;
            txtAutonomia.value=vehiculo.autonomia;
       
            }
            if(key == "cantRue")
            {
             console.log(key);
            
            const txtCantRue = document.getElementById("txtCantRue");
            const txtCantPue=document.getElementById("txtCantPue");
            txtCantPue.value=vehiculo.cantPue;
            txtCantRue.value=vehiculo.cantRue;
         }
        }
   
}

export function vaciarFormulario(formulario){
    formulario.txtId.value= "";
    formulario.txtNombre.value = "";
    formulario.txtApellido.value = "";
    formulario.txtEdad.value="";
    camposSegunTipo.style.display = "none";
    $btnAgregar.value="Agregar";
    $btnEliminar.disabled = true;

}
