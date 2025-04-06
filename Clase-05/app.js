// Encontrar la Palabra Más Larga

//const text = "JavaScript es un lenguaje de programación increíble para aprender.";

function dividirLaFrase(txt){
    const textDividido = txt.split(" ");
    return textDividido;
}

function slidingWindow(texto){
    const arrayPalabras = dividirLaFrase(texto);
    let longestWord = "";
    let left = 0;

    while(left < arrayPalabras.length){
        let palabraActual = arrayPalabras[left];

        if(palabraActual.length > longestWord.length){
            longestWord = palabraActual;
        }else{
            left++;
        }
    }
    return longestWord;
}

let btnSearch = document.getElementById("btn-buscar");
btnSearch.addEventListener("click", () =>{
    const text = document.getElementById("frase-input").value;
    
    let frase = document.getElementById("ta-longestWord");
    frase.textContent = slidingWindow(text);

});




