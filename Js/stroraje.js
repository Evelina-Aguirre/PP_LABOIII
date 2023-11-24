export let datos = JSON.parse(localStorage.getItem("datos")) || [];

export function actualizarStorage(clave, data) {
    localStorage.setItem(clave, JSON.stringify(data));
}

export function actualizarPorFetch() {
    const archivo = './vehiculoAereoTerrestre.php';

    fetch(archivo, {
        method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(dataFromAPI => {
            datos = dataFromAPI;
            actualizarStorage("datos", datos);
            console.log("Datos actualizados:", datos);
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
}