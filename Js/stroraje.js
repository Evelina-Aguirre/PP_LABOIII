export const personas= JSON.parse(localStorage.getItem("datos")) || [];

export function actualizarStorage(clave,data){
    localStorage.setItem(clave, JSON.stringify(data));
}