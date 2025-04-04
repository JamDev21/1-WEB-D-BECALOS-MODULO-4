// Gestión de Lista de Compras

const btnAgregar = document.getElementById("Agregar");

//Arreglo en el cual vamos a guardar los proctos
const listaDeCompras = [];

function agregarProducto(producto, cantidad){
   const newProducto = {
        nombre: producto,
        cantidad: cantidad
     };
    listaDeCompras.push(newProducto);
}

function verListaDeCompras(){
    let contenerdorDeCompras = document.getElementById("contenedorDeCompras");
    listaDeCompras.forEach( (item) =>{
    //Craar el elemnto li, en donde se mostrar cada uno de los productos
    let ProductoCompra = document.createElement("li");
    ProductoCompra.textContent = `${item.nombre}\n Cantidad: ${item.cantidad}`;
    contenerdorDeCompras.appendChild(ProductoCompra);
    });
}

function eliminarProducto(producto){


}



btnAgregar.addEventListener("click", (e) =>{
    e.preventDefault();
    let producto = document.getElementById("producto").value;
    let cantidad = document.getElementById("cantidad").value;
    agregarProducto(producto, cantidad);
    //console.log(listaDeCompras);
    verListaDeCompras();
});




