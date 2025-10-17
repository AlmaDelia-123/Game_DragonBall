import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../dist/public/css/main.css';
import Game from './Game.js';
import Swal from 'sweetalert2';

let player1;
let player2;
let turno = 1; 
let personaje1="";
let personaje2="";
let btn_py1 = document.getElementById("btn_py1");
let btn_py2 = document.getElementById("btn_py2");
let seleccion1 = document.getElementById("seleccion_personaje1");
let seleccion2 = document.getElementById("seleccion_personaje2");

const fondos = [
    "./public/img/fondos/fondo1.png",
    "./public/img/fondos/fondo2.png",
    "./public/img/fondos/fondo3.png",
    "./public/img/fondos/fondo4.jpg",
    "./public/img/fondos/fondo5.jpg"
];
const fondoAleatorio = () => {
    const index = Math.floor(Math.random() * fondos.length);
    document.body.style.backgroundImage = `url('${fondos[index]}')`;
    document.body.style.backgroundSize = "cover"; 
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
}

const accionesPersonaje = {
    "Cell": {
        "basico": {
            img: "Cell/basico.png",
            msj: "¡Eres solo un insecto comparado conmigo!"
        },
        "especial": {
            img: "Cell/especial.png",
            msj: "¡Kamehameha perfecto!"
        },
        "semilla": {
            img: "Cell/curar.png",
            msj: "He regenerado mi cuerpo, jejeje..."
        },
        "ki": {
            img: "Cell/energia.png",
            msj: "¡Este poder... es infinito!"
        },
    },
    "Gohan": {
        "basico": {
            img: "Gohan/basico.png",
            msj: "¡No te dejaré ganar!"
        },
        "especial": {
            img: "Gohan/especial.png",
            msj: "¡Kamehamehaaaa!"
        },
        "semilla": {
            img: "Gohan/curar.png",
            msj: "Debo mantenerme firme… por mi padre."
        },
        "ki": {
            img: "Gohan/energia.png",
            msj: "¡Mi poder está aumentando!"
        },
    },
    "Gogueta": {
        "basico": {
            img: "Gogueta/basico.png",
            msj: "¡No durarás ni un segundo contra mí!"
        },
        "especial": {
            img: "Gogueta/especial.png",
            msj: "¡Big Bang Kamehameha!"
        },
        "semilla": {
            img: "Gogueta/curar.png",
            msj: "Esto solo me retrasará un poco."
        },
        "ki": {
            img: "Gogueta/energia.png",
            msj: "¡Este es el poder de una fusión perfecta!"
        },
    },
    "Goku": {
        "basico": {
            img: "Goku/basico.png",
            msj: "¡Esto apenas comienza!"
        },
        "especial": {
            img: "Goku/especial.png",
            msj: "¡Kamehamehaaaa!"
        },
        "semilla": {
            img: "Goku/curar.png",
            msj: "Gracias por las semillas del ermitaño, ¡qué alivio!"
        },
        "ki": {
            img: "Goku/energia.png",
            msj: "¡Aumenta mi ki al máximo!"
        },
    },
    "Pikoro": {
        "basico": {
            img: "Pikoro/basico.png",
            msj: "¡No bajes la guardia!"
        },
        "especial": {
            img: "Pikoro/especial.png",
            msj: "¡Makankosappo!"
        },
        "semilla": {
            img: "Pikoro/curar.png",
            msj: "Regenerar mi cuerpo... no será suficiente."
        },
        "ki": {
            img: "Pikoro/energia.png",
            msj: "Debo concentrar todo mi poder..."
        },
    },
    "Trunks": {
        "basico": {
            img: "Trunks/basico.png",
            msj: "¡No pienso perder esta vez!"
        },
        "especial": {
            img: "Trunks/especial.png",
            msj: "¡Espada de luz!"
        },
        "semilla": {
            img: "Trunks/curar.png",
            msj: "He pasado por cosas peores en mi futuro."
        },
        "ki": {
            img: "Trunks/energia.png",
            msj: "¡Siente el poder del Super Saiyajin!"
        },
    },
    "Veguetta": {
        "basico": {
            img: "Veguetta/basico.png",
            msj: "¡Insecto miserable!"
        },
        "especial": {
            img: "Veguetta/especial.png",
            msj: "¡Final Flash!"
        },
        "semilla": {
            img: "Veguetta/curacion.png",
            msj: "No necesito ayuda... pero la usaré."
        },
        "ki": {
            img: "Veguetta/energia.png",
            msj: "¡Este es el poder del príncipe de los Saiyajin!"
        },
    },
    "Veguito": {
        "basico": {
            img: "Veguito/basico.png",
            msj: "¡Esto será divertido!"
        },
        "especial": {
            img: "Veguito/especial.png",
            msj: "¡Espada espiritual!"
        },
        "semilla": {
            img: "Veguito/curar.png",
            msj: "No bajes la guardia, aún no he terminado."
        },
        "ki": {
            img: "Veguito/energia.png",
            msj: "¡Imposible que me derrotes!"
        },
    },
    "Krilin": {
        "basico": {
            img: "Krilin/basico.png",
            msj: "¡Toma esto! ¡Destructo Disc!"
        },
        "especial": {
            img: "Krilin/especial.png",
            msj: "¡Kienzan cortante!"
        },
        "semilla": {
            img: "Krilin/curar.png",
            msj: "Gracias Goku... eso estuvo cerca."
        },
        "ki": {
            img: "Krilin/energia.png",
            msj: "¡Tengo que darlo todo aunque no sea un Saiyajin!"
        },
    },
    "Freezer": {
        "basico": {
            img: "Freezer/basico.png",
            msj: "¡Siente el verdadero terror!"
        },
        "especial": {
            img: "Freezer/especial.png",
            msj: "¡Death Beam!"
        },
        "semilla": {
            img: "Freezer/curar.png",
            msj: "He recuperado mi fuerza... ¡ahora sufrirás!"
        },
        "ki": {
            img: "Freezer/energia.png",
            msj: "¡Mi poder está más allá de tu comprensión!"
        },
    },
};
const alertaAtk = (personaje,accion) => {
    let timerInterval;
    Swal.fire({
        title: accionesPersonaje[personaje][accion].msj,
        imageUrl: `./public/img/${accionesPersonaje[personaje][accion].img}`,
        imageWidth: 500,
        imageHeight: 500,
        showCancelButton:false,
        showConfirmButton:false,
        background: "none",
        html: "<b></b>",
        backdrop:`rgba(0,0,0,0.7)`,
        timer: 2000,
        willClose: () => {
            clearInterval(timerInterval);
        }
    });
}
const actualizarTurno = () => {
    const botonesJugador1 = ["btn_atk_basico1", "btn_atk_especial1", "carga_py1", "semillas_ply1"];
    const botonesJugador2 = ["btn_atk_basico2", "btn_atk_especial2", "carga_py2", "semillas_ply2"];

    // Activar/desactivar botones según el turno
    (turno === 1 ? botonesJugador1 : botonesJugador2)
        .forEach(id => document.getElementById(id).disabled = false);
    (turno === 1 ? botonesJugador2 : botonesJugador1)
        .forEach(id => document.getElementById(id).disabled = true);

    // Mostrar de quién es el turno
    const turnoTxt = document.getElementById("turno_actual");
    if (turnoTxt) {
        turnoTxt.innerText = `Turno del Jugador ${turno}`;
    }
    document.getElementById("turno_actual").innerText = turno === 1 ? "Turno de Jugador 1" : "Turno de Jugador 2";
};
const verificarGanador = () => {
    const reiniciarBatalla = () => {
        fondoAleatorio(); // Nuevo fondo para la revancha
        // Reinicia los valores de ambos jugadores
        player1.setVida(1000);
        player1.setKi(1000);
        player1.setEnergia(1000);

        player2.setVida(1000);
        player2.setKi(1000);
        player2.setEnergia(1000);

        // Reinicia las barras de vida, energía y ki
        document.getElementById("vida1").style.width = "100%";
        document.getElementById("vida1").innerText = "1000";
        document.getElementById("ki1").style.width = "100%";
        document.getElementById("ki1").innerText = "1000";
        document.getElementById("energia1").style.width = "100%";
        document.getElementById("energia1").innerText = "1000";

        document.getElementById("vida2").style.width = "100%";
        document.getElementById("vida2").innerText = "1000";
        document.getElementById("ki2").style.width = "100%";
        document.getElementById("ki2").innerText = "1000";
        document.getElementById("energia2").style.width = "100%";
        document.getElementById("energia2").innerText = "1000";

        // Restablecer el turno al jugador 1
        turno = 1;
        actualizarTurno();
    // --- Mostrar historial de victorias ---
        mostrar_victorias(personaje1, document.getElementById("username1"));
        mostrar_victorias(personaje2, document.getElementById("username2"));
        // Mostrar mensaje de revancha
        let count = 3;

        Swal.fire({
        title: "🥊 ¡Comienza la revancha!",
        html: `<div id="countdown" style="font-size: 40px; font-weight: bold; margin-top: 10px;">${count}</div>
                <div style="font-size: 20px; margin-top: 5px;">${player1.getUsername()} vs ${player2.getUsername()}</div>`,
        background: "black",
        color: "white",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => { 
            // Esta función se ejecuta justo cuando el modal de Swal se abre.
            
            const countdown = Swal.getHtmlContainer().querySelector("#countdown");
            // Obtiene el elemento dentro del modal con id="countdown", que es donde mostraremos el número de la cuenta regresiva.
            
            const interval = setInterval(() => {
                // setInterval ejecuta la función cada 1000ms (1 segundo)
                
                count--; 
                // Disminuye la variable 'count' (inicia en 3, por ejemplo) en 1 cada segundo.
                
                countdown.textContent = count;
                // Actualiza el número en pantalla para que el usuario vea la cuenta regresiva.
                
                // efecto visual pequeño
                countdown.style.transform = "scale(1.3)";
                countdown.style.transition = "transform 0.2s";
                // Hace que el número crezca ligeramente (efecto de zoom) y luego vuelva a su tamaño original
                setTimeout(() => countdown.style.transform = "scale(1)", 200);
                // Después de 0.2s, vuelve a la escala normal, creando el efecto visual de "latido"
                
                if (count === 0) {
                    clearInterval(interval); 
                    // Detiene la cuenta regresiva para que no siga bajando a números negativos
                    
                    Swal.close(); 
                    // Cierra el modal de Swal para empezar la batalla
                }
            }, 1000); 
            // Cada 1000ms (1 segundo) se repite todo lo que está dentro del setInterval
        },
        backdrop: `
            rgba(0,0,0,0.7)
        `,
        });
    };

    // --- Verifica si hay un ganador ---
    if (player1.getVida() <= 0) {
        agregar_victoria(personaje2); 
        Swal.fire({
            title: `🏆 ¡${player2.getUsername()} ha ganado!`,
            text: `${personaje2} ha vencido a ${personaje1}`,
            imageUrl: `./public/img/${personaje2}/base.png`,
            imageWidth: 400,
            imageHeight: 400,
            background: "black",
            color: "white",
            showDenyButton: true,
            confirmButtonText: "Reiniciar juego",
            denyButtonText: "Revancha",
            confirmButtonColor: "#3085d6",
            denyButtonColor: "#facc15",
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload(); // Reinicia todo el juego
            } else if (result.isDenied) {
                reiniciarBatalla(); // Solo reinicia la batalla
            }
        });

        desactivarBotones();
        return true;
    } 
    else if (player2.getVida() <= 0) {
        agregar_victoria(personaje1);
        Swal.fire({
            title: `🏆 ¡${player1.getUsername()} ha ganado!`,
            text: `${personaje1} ha vencido a ${personaje2}`,
            imageUrl: `./public/img/${personaje1}/base.png`,
            imageWidth: 400,
            imageHeight: 400,
            background: "black",
            color: "white",
            showDenyButton: true,
            confirmButtonText: "Reiniciar juego",
            denyButtonText: "Revancha",
            confirmButtonColor: "#3085d6",
            denyButtonColor: "#facc15",
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            } else if (result.isDenied) {
                reiniciarBatalla();
            }
        });

        desactivarBotones();
        return true;
    }
    return false;
};
//Gestor de victoras
const obtener_victorias = (personaje) =>{
    const victorias = localStorage.getItem(`victorias_${personaje}`);
    return victorias ? parseInt(victorias):0;
}
const agregar_victoria =(personaje)=>{
    const victorias_actuales = obtener_victorias(personaje);
    localStorage.setItem(`victorias_${personaje}`,victorias_actuales +1);
}
const mostrar_victorias = (personaje,elementoHTML)=>{
    const victorias = obtener_victorias(personaje);
    elementoHTML.textContent = `Victorias: ${victorias}`;
}
// Desactiva todos los botones de ataque/carga cuando termina el juego
const desactivarBotones = () => {
    const todosLosBotones = [
        "btn_atk_basico1", "btn_atk_especial1", "carga_py1", "semillas_ply1",
        "btn_atk_basico2", "btn_atk_especial2", "carga_py2", "semillas_ply2"
    ];
    todosLosBotones.forEach(id => document.getElementById(id).disabled = true);
};
const cambiar_seleccion=(botones,seleccionado,color)=>{
//recibe un bloque de botones
    botones.forEach(btn =>{
        if(seleccionado === btn.querySelector("img").title){
            btn.classList.remove(color);
            btn.classList.add("btn-warning");
        }else{
            btn.classList.remove("btn-warning");
            btn.classList.add(color);
        }
    })
}
seleccion1.querySelectorAll("button").forEach(btn =>{
    btn.addEventListener("click",(evento)=>{
        cambiar_seleccion(seleccion1.querySelectorAll("button"),evento.target.title,"btn-danger");
        personaje1 = evento.target.title;
    })
})
seleccion2.querySelectorAll("button").forEach(btn =>{
    btn.addEventListener("click",(evento)=>{
        cambiar_seleccion(seleccion2.querySelectorAll("button"),evento.target.title,"btn-primary");
        personaje2 = evento.target.title;        
    })
}) 
const ocultar_Seleccion1 =()=>{
    if(player1 != "" && personaje1 !=""){
        document.getElementById("jugador1").classList.add("d-none");
        document.getElementById("nombre_personaje1").innerText=personaje1;
    }
}
const ocultar_Seleccion2 =()=>{
    if(player2 != "" && personaje2 !=""){
        document.getElementById("jugador2").classList.add("d-none");
        document.getElementById("nombre_personaje2").innerText=personaje2;
    }
}
const batalla = () => {
  if (player1 != "" && player2 != "" && personaje1 != "" && personaje2 != "") {
    document.getElementById("batalla").classList.remove("d-none");
    document.getElementById("seleccion_jugadores").classList.add("d-none");

    fondoAleatorio();

// 🧠 Aquí es donde debes poner el bloque:
    document.getElementById("nombre_personaje1").textContent = personaje1;
    document.getElementById("nombre_personaje2").textContent = personaje2;

    // 👇 Muestra las victorias debajo de cada nombre
    mostrar_victorias(personaje1, document.getElementById("username1"));
    mostrar_victorias(personaje2, document.getElementById("username2"));
  }
}
btn_py1.addEventListener("click", () => {
    let user_py1 = document.getElementById("username_py1").value;
    if(user_py1 != ""){
        player1 = new Game(user_py1);
        document.getElementById("username1").innerText=user_py1;
        document.getElementById("img_personaje1").src=`./public/img/${personaje1}/base.png`;
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre del jugador 1 no puede estar vacío',
        });
    }
    if(personaje1=="")Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El jugador 1 debe seleccionar un personaje',
        });
    
    ocultar_Seleccion1();
    batalla();

});
btn_py2.addEventListener("click", () => {
    let user_py2 = document.getElementById("username_py2").value;
    if(user_py2 != ""){
        player2 = new Game(user_py2);
        document.getElementById("username2").innerText=user_py2;
        document.getElementById("img_personaje2").src=`./public/img/${personaje2}/base.png`;
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre del jugador 2 no puede estar vacío',
        });
    }
    if(personaje2 == "") Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El jugador 2 debe seleccionar un personaje',
        });
    
    ocultar_Seleccion2();
    batalla();

});
//ATAQUES DE PLAYER 1
document.getElementById("btn_atk_basico1").addEventListener("click", () => {
    if (turno !== 1) return; // Si no es su turno, no hace nada
    //Validar ki y energia para hacer el ataque
    if (player1.getKi() < 200 || player1.getEnergia() < 100) {
        Swal.fire({
            icon: 'warning',
            title: 'Sin energía suficiente',
            text: 'Debes cargar Ki o usar una semilla del ermitaño para atacar.',
            timer: 2000,
            showConfirmButton: false
        });
        return; // No ejecuta el ataque
    }
    alertaAtk(personaje1,"basico");
    player1.atk_basico(player2);

    document.getElementById("vida2").style.width = `${(player2.getVida() / 10)}%`;
    document.getElementById("vida2").innerText = `${player2.getVida()}`;

    document.getElementById("ki1").style.width = `${player1.getKi() / 10}%`;
    document.getElementById("ki1").innerText = `${player1.getKi()}`;
    document.getElementById("energia1").style.width = `${player1.getEnergia() / 10}%`;
    document.getElementById("energia1").innerText = `${player1.getEnergia()}`;

    if (!verificarGanador()) {
        turno = 2;
        actualizarTurno();
    }
});
document.getElementById("btn_atk_especial1").addEventListener("click",()=>{
    if (turno !==1) return
    if (player1.getKi() < 300 || player1.getEnergia() < 250) {
        Swal.fire({
            icon: 'warning',
            title: 'Sin energía suficiente ',
            text: 'Tu Ki o Energía son bajos. ¡Carga antes de usar un ataque especial!',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }
    alertaAtk(personaje1,"especial");
    player1.atk_especial(player2);
    document.getElementById("vida2").style.width=`${(player2.getVida()/10)}%`;
    document.getElementById("vida2").innerText=`${player2.getVida()}`;

    document.getElementById("ki1").style.width = `${player1.getKi() / 10}%`;
    document.getElementById("ki1").innerText = `${player1.getKi()}`;
    document.getElementById("energia1").style.width = `${player1.getEnergia() / 10}%`;
    document.getElementById("energia1").innerText = `${player1.getEnergia()}`;
    
    if (!verificarGanador()) {
        turno = 2;
        actualizarTurno();
    }
})
//ATAQUES DE PLAYER 2
document.getElementById("btn_atk_basico2").addEventListener("click",()=>{
    if(turno !== 2) return
    if (player2.getKi() < 200 || player2.getEnergia() < 100) {
        Swal.fire({
            icon: 'warning',
            title: 'Sin energía suficiente ',
            text: 'Debes cargar Ki o usar una semilla del ermitaño para atacar.',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }
    alertaAtk(personaje2,"basico");
    player2.atk_basico(player1);
    document.getElementById("vida1").style.width=`${(player1.getVida()/10)}%`;
    document.getElementById("vida1").innerText=`${player1.getVida()}`;

    document.getElementById("ki2").style.width = `${player2.getKi() / 10}%`;
    document.getElementById("ki2").innerText = `${player2.getKi()}`;
    document.getElementById("energia2").style.width = `${player2.getEnergia() / 10}%`;
    document.getElementById("energia2").innerText = `${player2.getEnergia()}`;

    if (!verificarGanador()) {
        turno = 1; // Cambiar turno al jugador 1
        actualizarTurno();
    }
})
document.getElementById("btn_atk_especial2").addEventListener("click",()=>{
    if(turno !== 2)return
    if (player2.getKi() < 300 || player2.getEnergia() < 250) {
        Swal.fire({
            icon: 'warning',
            title: 'Sin energía suficiente ',
            text: 'Tu Ki o Energía son bajos. ¡Carga antes de usar un ataque especial!',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }
    alertaAtk(personaje2,"especial");
    player2.atk_especial(player1);
    document.getElementById("vida1").style.width=`${(player1.getVida()/10)}%`;
    document.getElementById("vida1").innerText=`${player1.getVida()}`;

    document.getElementById("ki2").style.width = `${player2.getKi() / 10}%`;
    document.getElementById("ki2").innerText = `${player2.getKi()}`;
    document.getElementById("energia2").style.width = `${player2.getEnergia() / 10}%`;
    document.getElementById("energia2").innerText = `${player2.getEnergia()}`;

    if (!verificarGanador()) {
        turno = 1;
        actualizarTurno();
    }
})
// CARGA KI PLAYER 1
document.getElementById("carga_py1").addEventListener("click", () => {
    if (turno !== 1) return
    // Verificar si ya está al máximo
    if (player1.getKi() >= 1000 && player1.getEnergia() >= 1000) {
        Swal.fire({
            icon: 'info',
            title: 'Todo al máximo ',
            text: 'Tu Ki y Energía ya están al límite, no puedes cargar más.',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }
    player1.cargar_ki();
    alertaAtk(personaje1,"ki");
    document.getElementById("ki1").style.width = `${player1.getKi() / 10}%`;
    document.getElementById("ki1").innerText = `${player1.getKi()}`;
    document.getElementById("energia1").style.width = `${player1.getEnergia() / 10}%`;
    document.getElementById("energia1").innerText = `${player1.getEnergia()}`;
    turno = 2; // Cambiar turno al jugador 2
    actualizarTurno();
});
// CARGA KI PLAYER 2
document.getElementById("carga_py2").addEventListener("click", () => {
    if (turno !== 2) return
    if (player2.getKi() >= 1000 && player2.getEnergia() >= 1000) {
        Swal.fire({
            icon: 'info',
            title: 'Todo al máximo ',
            text: 'Tu Ki y Energía ya están al límite, no puedes cargar más.',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }
    player2.cargar_ki();
    alertaAtk(personaje2,"ki");
    document.getElementById("ki2").style.width = `${player2.getKi() / 10}%`;
    document.getElementById("ki2").innerText = `${player2.getKi()}`;
    document.getElementById("energia2").style.width = `${player2.getEnergia() / 10}%`;
    document.getElementById("energia2").innerText = `${player2.getEnergia()}`;
    turno = 1; // Cambiar turno al jugador 1
    actualizarTurno();
});
// SEMILLAS DEL ERMITAÑO PLAYER 1
document.getElementById("semillas_ply1").addEventListener("click", () => {
    if (turno !== 1) return
    if (player1.getEnergia() >= 1000 && player1.getEnergia() >= 1000) {
        Swal.fire({
            icon: 'info',
            title: 'Todo al máximo ',
            text: 'Estas al máximo, no necesitas usar una semilla del ermitaño.',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }
    if (player1.getSemillas() > 0) {
        player1.usar_semilla();
        alertaAtk(personaje1,"semilla");
        document.getElementById("vida1").style.width = "100%";
        document.getElementById("vida1").innerText = `${player1.getVida()}`;

        document.getElementById("ki1").style.width = "100%";
        document.getElementById("ki1").innerText = `${player1.getKi()}`;

        document.getElementById("energia1").style.width = "100%";
        document.getElementById("energia1").innerText = `${player1.getEnergia()}`;
        
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Sin semillas ',
            text: 'Ya no tienes más semillas del ermitaño.',
            timer: 2000,
            showConfirmButton: false
        });
    }
    turno = 2; // Cambiar turno al jugador 2
    actualizarTurno();
});
// SEMILLAS DEL ERMITAÑO PLAYER 2
document.getElementById("semillas_ply2").addEventListener("click", () => {
    if (turno !== 2) return
    if (player2.getEnergia() >= 1000 && player2.getEnergia() >= 1000) {
        Swal.fire({
            icon: 'info',
            title: 'Todo al máximo ',
            text: 'Estas al máximo, no necesitas usar una semilla del ermitaño.',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }
    if (player2.getSemillas() > 0) {
        player2.usar_semilla();
        alertaAtk(personaje2,"semilla");
        document.getElementById("vida2").style.width = "100%";
        document.getElementById("vida2").innerText = `${player2.getVida()}`;

        document.getElementById("ki2").style.width = "100%";
        document.getElementById("ki2").innerText = `${player2.getKi()}`;

        document.getElementById("energia2").style.width = "100%";
        document.getElementById("energia2").innerText = `${player2.getEnergia()}`;

    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Sin semillas ',
            text: 'Ya no tienes más semillas del ermitaño.',
            timer: 2000,
            showConfirmButton: false
        });
    }
    turno = 1; // Cambiar turno al jugador 1
    actualizarTurno();
});


