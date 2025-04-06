// Encuentra los Invitados que Pueden Sentarse Juntos

const invitados = ["Ana", "Carlos","Cecilia", "Daniel", "Diana", "Aduardo"];

function encontrarPares(arr){
    let left = 0;
    let right = 1;

    while( right < arr.length){
        if(invitados[left].charAt(0).toLowerCase() === invitados[right].charAt(0).toLowerCase()){

            return [ invitados[left], invitados[right]]
        }else{
            left = right;
            right += 1;
        }
    }
    return "No se encontrarón personas con la misma inicial";
}


console.log(encontrarPares(invitados));