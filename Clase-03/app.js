//Filtro y Orden de Productos de una Tienda Online
const productos = [
    { nombre: "Camiseta", precio: 15, categoria: "Ropa" },
    { nombre: "Laptop", precio: 800, categoria: "Electrónica" },
    { nombre: "Libro", precio: 12, categoria: "Educación" },
    { nombre: "Zapatos", precio: 50, categoria: "Ropa" },
    { nombre: "Celular", precio: 600, categoria: "Electrónica" },
];

function productosMenoresA100Pesos(){
    const nuevosProductos = productos.filter(n => n.precio > 100);
    return nuevosProductos;
}

function ordenAlfabetico(){
    const productosOrdenadosAlfabeticamente = productosMenoresA100Pesos();
    productosOrdenadosAlfabeticamente.sort((a,b) => a.nombre.localeCompare(b.nombre));
    return productosOrdenadosAlfabeticamente;
}


function mostrarNombres(){
    
    const nombreProductos = ordenAlfabetico().map(n => n.nombre);
    return  nombreProductos;
}

console.log("Productos > $100\n");
console.log(productosMenoresA100Pesos());
console.log("\nProductos ordenados alfabeticamente\n");
console.log(ordenAlfabetico());
console.log("\nNombre de los Productos\n");
console.log(mostrarNombres());