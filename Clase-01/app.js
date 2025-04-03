//Planificador de viajes 

/*
    Flujo de la app:
    1. Registrar destinos
    2.- Calcular costo
    3.- MOstrar el itinerario
*/


class viaje{

    constructor(destino, fecha, duracion, transporte ){
        this.destino = destino;
        this.fecha = fecha;
        this.duracion = duracion;
        this.transporte = transporte;
    }

    getDatosGenerales(){
        return `Destino: ${this.destino}\n
                Fecha: ${this.fecha}\n 
                Duracion: ${this.duracion} dias\n
                Transporte: ${this.transporte}`;
        
    }


    getcosto(){
        /*
            Para calular el costo del destino, se tiene que tomar en cuenta el transporte y en este caso yo voy a determinar dos costos
            1.- Costo por duración de viaje, tomando en cuenta los dias  de vaije 
            2.- El costyo del transporte, segun sea el caso: camion, avion, tren.
        */
        //var costo = 0;
        let costoDestino = 0;
        const costoDia = 500;
        let costoTransporte = 0;
        costoDestino = this.duracion * costoDia;
        if(this.transporte === 'Avion'){
            costoTransporte = 2000;
        }else if(this.transporte ==='Camion'){
            costoTransporte = 1000;
        }else if(this.transporte  === 'Tren'){
            costoTransporte = 800;
        }

        return costoDestino + costoTransporte;
    }

}

const viajes = [];


function resgistrarViajes(destino, fecha, duracion, transporte ){
    const nuevoViaje = new viaje(destino, fecha, duracion, transporte );
    viajes.push(nuevoViaje);
    console.log( `Viaje a ${destino} fue resgitrado con exito`);
}

function mostrarItinerario(){
    let mensaje = "";
    mensaje = "ITINERARIO DE VIAJES\n";
    for(let i = 0; i < viajes.length;i++){
        mensaje += `viaje ${i+1} \n`;
        mensaje += viajes[i].getDatosGenerales();
        mensaje += `\nCosto: ${viajes[i].getcosto()}\n`;
    }
    return mensaje;
}

function interacionUsuario(){
let destino = prompt("Ingresa el lugar al cual quieres viajar: ");
let fecha = prompt("Ingresa la fecha de salida: ");
let duracion = parseInt(prompt("Ingresa la duracion del viaje en dias: "));
let transporte = prompt("Ingresa el medio de transporte (Avion, Camion, Tren): ");
resgistrarViajes(destino, fecha, duracion, transporte);
let continuar = confirm("Quieres registrar otro viaje?");
if(continuar){
    interacionUsuario();
}else {
    // alert(mostrarItinerario());  YA NO LO USE PQ DESCUBRI QUE TIENE UN LIMITE DE CARACTERES PARA MOSTRAR INFORMACION 
    document.getElementsByClassName("textItinerario")[0].value = mostrarItinerario();
}
}

// interacionUsuario();

let btnComenzar = document.getElementById("Comenzar");
btnComenzar.addEventListener("click", () =>{
    viajes.length = 0; // Reiniciar el array de viajes para que no se acumulen los viajes por si se quiere volver a realizar el ejercios ya que si no  reiniciamos el array, se van a ir acomulando
    interacionUsuario();
});

