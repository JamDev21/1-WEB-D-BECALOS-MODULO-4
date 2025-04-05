// Gestión de Lista de Compras

const btnAgregar = document.getElementById("Agregar");


//Arreglo en el cual vamos a guardar los proctos
const listaDeCompras = [];

function agregarProducto(producto, cantidad){
   const newProducto = {
        nombre: producto,
        cantidad: cantidad
    };

    const existe = listaDeCompras.some(p => p.nombre.toLowerCase() === newProducto.nombre.toLowerCase());
    if(existe){
        alert("El producto ya existe, no se puedo agregar");
    }else{
        listaDeCompras.push(newProducto);
    }
}

function verListaDeCompras(){
    let contenerdorDeCompras = document.getElementById("contenedorDeCompras");
    contenerdorDeCompras.textContent = "";
    listaDeCompras.forEach( (item) =>{
    //Craar el elemnto li, en donde se mostrar cada uno de los productos
    let ProductoCompra = document.createElement("li");
    ProductoCompra.textContent = `${item.nombre}\n Cantidad: ${item.cantidad}`;
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-Eliminar");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click",() =>{
        eliminarProducto(item);
        //Aqui volver a renderizar el arreglo ya acualizado 
        verListaDeCompras();
    });
    ProductoCompra.appendChild(btnEliminar);
    contenerdorDeCompras.appendChild(ProductoCompra);
    producto.value = "";
    cantidad.value = "";
    });
}

function eliminarProducto(item){
    listaDeCompras.splice(item,1);
}



btnAgregar.addEventListener("click", (e) =>{
    e.preventDefault();
    let producto = document.getElementById("producto").value;
    let cantidad = document.getElementById("cantidad").value;

    if(producto ==="" || cantidad === ""){
        alert('Campo(s) vacío(s), no se puede agregar al arreglo');
    }else{
        agregarProducto(producto, cantidad);
        //console.log(listaDeCompras);
        verListaDeCompras();
    }
});




