// Importamos datosPizzas desde un archivo externo simulado
import { getDataPizza } from "./services/dataPizza.js";
// Verificamos que los datos recibidos sean un arreglo
const datos = Array.isArray(getDataPizza()) ? getDataPizza() : [];
console.log(datos);
// Referencia a elementos del dom 
const input = document.getElementById("input-search");
const datosPizzasContainer = document.getElementById("datosPizzas");
const datosPizzasContainerSugerencias =document.getElementById("recent-suggestions");
const sortSelect =  document.getElementById("sort");
const suggestionBtn = document.getElementById("suggestion-btn");
const autocompletarDiv = document.getElementById("autocomplete-list");

// Variables globale para el eutocompletado y análisis
let currentSuggestionIndex = -1;
let currentSuggestions = [];
let historialPizzas = [];
let ultimasBusquedas = [];


/*FUNCIÓN PARA MOSTRAR LA PIZZAS EN PANTALLA */
function renderPizzas(lista){
    datosPizzasContainer.innerHTML = "";

    lista.forEach((datosPizza) => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
        <img src="${datosPizza.imagen}" alt="${datosPizza.nombre}"  class="img-card"/>
        <h3>${datosPizza.nombre}</h3>
        <p><strong>Categoria:</strong> ${datosPizza.categoria}</p>
        <p><strong>Tiempo:</strong> ${datosPizza.tiempo} min</p>
        <p><strong>Ingresdientes: </strong>${datosPizza.ingredientes}</p>
        <p> Precio: $${datosPizza.Precio} MXN</p>
      `;
      datosPizzasContainer.appendChild(card);
    });

}
/*FUNCIÓN PARA MOSTRAR LA PIZZAS sugeridas EN PANTALLA */
function renderPizzasSugeridas(lista){
    datosPizzasContainerSugerencias.innerHTML = "";

    lista.forEach((datosPizza) => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
        <img src="${datosPizza.imagen}" alt="${datosPizza.nombre}"  class="img-card"/>
        <h3>${datosPizza.nombre}</h3>
        <p><strong>Categoria:</strong> ${datosPizza.categoria}</p>
        <p><strong>Tiempo:</strong> ${datosPizza.tiempo} min</p>
        <p><strong>Ingresdientes: </strong>${datosPizza.ingredientes}</p>
        <p> Precio: $${datosPizza.Precio} MXN</p>
      `;
      datosPizzasContainerSugerencias.appendChild(card);
    });

}

//Funcion para las subcadenas:
function contieneSubcadena(cadena, subcadena) {
    cadena = cadena.toLowerCase();
    subcadena = subcadena.toLowerCase();

    for (let i = 0; i <= cadena.length - subcadena.length; i++) {
        let encontrado = true;
        for (let j = 0; j < subcadena.length; j++) {
            if (cadena[i + j] !== subcadena[j]) {
                encontrado = false;
                break;
            }
        }
        if (encontrado) return true;
    }

    return false;
}

// FUNCIÓN: Filtrar recetas por nombre
function filtrarPorNombre(nombre) {
    const lower = nombre.toLowerCase();

    return datos.filter((datosPizza) =>
        contieneSubcadena(datosPizza.nombre, lower)
    );
}

// FUNCIÓN: Actualizar historial y análisis
function actualizarHistorial(nombre) {
    historialPizzas.push(nombre);
    ultimasBusquedas = [...historialPizzas];

    // Sliding Window: mantenemos máximo 20 pizzas
    if (historialPizzas.length > 20) {
        historialPizzas.shift();
    }

    if (ultimasBusquedas.length > 5) {
        ultimasBusquedas.shift(); // quitar la más vieja
    }

    // Mostrar en texto cuántas pizzas únicas se han buscado
    document.getElementById("analysis").textContent =
        `Buscaste ${new Set(historialPizzas).size} Pizza${historialPizzas.length > 1 ? 's' : ''} esta semana.`;

    actualizarSugerenciasRecientes();
}

// FUNCIÓN: Mostrar top de pizzas mas populares recientes (Sliding Window real)
function actualizarSugerenciasRecientes() {
    const conteo = {};

    // Contar repeticiones por nombre
    ultimasBusquedas.forEach(nombre => {
        const clave = nombre.toLowerCase();
        if (!conteo[clave]) {
            conteo[clave] = 0;
        }
        conteo[clave]++;
    });

    // Ordenar por más buscadas
    const nombresOrdenados = Object.entries(conteo)
        .sort((a, b) => b[1] - a[1]) // mayor frecuencia primero
        .map(([nombre]) => nombre);

    // Buscar objetos pizza reales en base a los nombres
    const sugerencias = nombresOrdenados.map(nombre =>
        datos.find(pizza => pizza.nombre.toLowerCase() === nombre)
    ).filter(pizza => pizza); // filtra por si alguno no existe

    // Mostrar
    renderPizzasSugeridas(sugerencias);

}

// console.log(actualizarSugerenciasRecientes());


// FUNCIÓN: Mostrar sugerencias de autocompletado
function autocompletar(valor) {
    autocompletarDiv.innerHTML = "";

    if (!valor) return;

    currentSuggestions = [...new Set(datos.flatMap(r => r.nombre))]
        .filter((ing) => ing.toLowerCase().startsWith(valor.toLowerCase()))
        .slice(0, 5);

    currentSuggestionIndex = -1;

    currentSuggestions.forEach((sug) => {
        const item = document.createElement("div");
        item.textContent = sug;
        item.classList.add("autocomplete-item");
        item.onclick = () => {
            input.value = sug;
            input.focus();
        };
        autocompletarDiv.appendChild(item);
    });
}

// FUNCIÓN: Buscar pizzas y mostrarlas
function buscarYRenderizar() {
    const valor = input.value.trim();
    if (!valor) return;

    const resultados = filtrarPorNombre(valor);
    actualizarHistorial(valor);
    renderPizzas(resultados);
}
// Function margeSort, la realice para poder utilizar un solo algoritmo para todas mis comparciones, no se que tan funconal pueda ser esto, usted dira sensei
function mergeSort(arr, comparador) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), comparador);
    const right = mergeSort(arr.slice(mid), comparador);

    return merge(left, right, comparador);
}

function merge(left, right, comparador) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (comparador(left[i], right[j]) <= 0) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}
// Comparadores que se utilizaran el la funcion de mergeSort
const compararPorPrecio = (a, b) => a.Precio - b.Precio;
const compararPorTiempo = (a, b) => a.tiempo - b.tiempo;
const compararPorNombre = (a, b) => a.nombre.localeCompare(b.nombre);
const compararPorCategoria = (a, b) => a.categoria.localeCompare(b.categoria);
const compararPorCantidadIngredientes = (a, b) => a.ingredientes.length - b.ingredientes.length;

// FUNCIÓN: Ordenar recetas por precio, nombre, categoria, #ingredientes o tiempo
function ordenarPizzas(tipo) {
    let comparador;

    switch (tipo) {
        case "precio":
            comparador = compararPorPrecio;
            break;
        case "nombre":
            comparador = compararPorNombre;
            break;
        case "categoria":
            comparador = compararPorCategoria;
            break;
        case "tiempo":
            comparador = compararPorTiempo;
            break;
        case "ingredientes":
            comparador = compararPorCantidadIngredientes;
            break;
        default:
            renderPizzas(datos);
            return;
    }

    const ordenadas = mergeSort(datos, comparador);
    renderPizzas(ordenadas);
}


// EVENTO: Cuando el usuario escribe en el input
input.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    autocompletar(value); // Solo muestra sugerencias

    if (!value) {
        renderPizzas(datos); // Si está vacío, mostrar todas
    }
});
// FUNCIÓN: Resaltar sugerencia seleccionada
function highlightSuggestion(items) {
    items.forEach((item, index) => {
        item.classList.toggle("active", index === currentSuggestionIndex);
    });
}

// Eventos para que la barra de autocompletado solo aparesca cuando se hace focus en el input 
input.addEventListener("focus", () => {
    autocompletarDiv.style.display = "block";
  });
input.addEventListener("blur", () => {
    setTimeout(() => {
      autocompletarDiv.style.display = "none";
    }, 100); // Pequeño retraso por si das clic en una sugerencia
  });

// EVENTO: Teclado para navegar sugerencias
input.addEventListener("keydown", (e) => {
    const items = document.querySelectorAll(".autocomplete-item");

    if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentSuggestionIndex < items.length - 1) {
            currentSuggestionIndex++;
            highlightSuggestion(items);
        }
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentSuggestionIndex > 0) {
            currentSuggestionIndex--;
            highlightSuggestion(items);
        }
    } else if (e.key === "Enter") {
        if (currentSuggestionIndex >= 0 && items[currentSuggestionIndex]) {
            input.value = items[currentSuggestionIndex].textContent;
            document.getElementById("autocomplete-list").innerHTML = "";
        }
        buscarYRenderizar(); // Ejecuta búsqueda
    }
});

// EVENTO: Cambiar tipo de ordenamiento
sortSelect.addEventListener("change", (e) => ordenarPizzas(e.target.value));
// EVENTO: Mostrar la Pizza mas barata
suggestionBtn.addEventListener("click", () => {
    // TODO: Reemplazar .reduce() con una implementación manual de Greedy para encontrar el menor tiempo
    const PizzaMasBarata = datos.reduce((a, b) => a.Precio < b.Precio ? a : b);
    renderPizzas([PizzaMasBarata]);
});



// const resultado = filtrarPorNombre("Mex");
// console.log(resultado);
renderPizzas(datos);