
const columnasJSON = [
    "id", "modelo", "anoFab", "velMax", "cantPue", "cantRue", "velocidad", "autonomia", "MODIFICAR", "BORRAR"
];


export const crearTabla = (datos) => {
    const tabla = document.createElement("table");
    const tHead = document.createElement("thead");
    const cabecera = document.createElement("tr");

    const todasPropiedades = Array.from(new Set(datos.flatMap(Object.keys)));

    todasPropiedades.forEach(nombreColumna => {
        const th = document.createElement("th");
        th.textContent = nombreColumna.toUpperCase(); 
        cabecera.appendChild(th);
    });

    const thModificar = document.createElement("th");
    thModificar.textContent = "MODIFICAR";
    cabecera.appendChild(thModificar);

    const thBorrar = document.createElement("th");
    thBorrar.textContent = "BORRAR";
    cabecera.appendChild(thBorrar);

    tHead.appendChild(cabecera);
    tabla.appendChild(tHead);

    const tBody = document.createElement("tbody");

    datos.forEach(element => {
        const tr = document.createElement("tr");

        todasPropiedades.forEach(nombreColumna => {
            const td = document.createElement("td");

            if (nombreColumna in element) {
                td.textContent = element[nombreColumna];
            } else {
                td.textContent = "----";
            }

            tr.appendChild(td);
        });

       
        const tdModificarEnTabla = document.createElement("td");
        const btnModificarEnTabla = document.createElement("button");
        btnModificarEnTabla.textContent = "Modificar";
        btnModificarEnTabla.id = "btnModificarEnTabla";
        btnModificarEnTabla.classList.add("btnModificarEnTabla");
        tdModificarEnTabla.appendChild(btnModificarEnTabla);
        tr.appendChild(tdModificarEnTabla);

        const tdEliminarEnTabla = document.createElement("td");
        const btnEliminarEnTabla = document.createElement("button");
        btnEliminarEnTabla.textContent = "Borrar";
        btnEliminarEnTabla.id = "btnEliminarEnTabla";
        btnEliminarEnTabla.classList.add("btnEliminarEnTabla");
        tdEliminarEnTabla.appendChild(btnEliminarEnTabla);
        tr.appendChild(tdEliminarEnTabla);

        tBody.appendChild(tr);
    });

    tabla.appendChild(tBody);
    return tabla;
};






