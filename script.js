//variables
let turTar = 0;
let turMan = 0;  
let varonPubli = 0;
let mujPrivada = 0;
let aluInform = 0;
let universitarios = 0;
let porcAluInform = 0;
let trabMasc = 0;
let trabFem = 0;
let trabInd = 0;

//elementos seleccionados
let h3 = document.getElementById("h3");
const turno = document.querySelectorAll("input[name=turno]");
const estudiaUni = document.querySelectorAll("input[name=estUni]");
const educacion = document.querySelectorAll("input[name=educacion]");
const genero = document.querySelectorAll("input[name=gen]");
const estudiaInform = document.querySelectorAll("input[name=estInform]");
const trabajadores = document.querySelectorAll("input[name=trabajando]");
let divInf = document.getElementById("divInf");
let divTipoEdu = document.getElementById("divTipoEdu"); 
let estUni = document.getElementById("estUni");
let noEstUni = document.getElementById("noEstUni");
let title = document.getElementById("title");
let fin = document.getElementById("fin");
let form = document.getElementById("form");
let btn = document.getElementById("btn");
let btns = document.getElementById("btns");
let msj = document.getElementById("mensaje");

// Mostrar y ocultar preguntas sobre tipo de educacion y carrera informática 
estUni.addEventListener("click", () => {                 
    divInf.style.display = "block";
    divTipoEdu.style.display = "block";
})
noEstUni.addEventListener("click", () => {                 
    divInf.style.display = "none";
    divTipoEdu.style.display = "none";
})

//Contador para turnos mañana y tarde
function totalesPorTurno() {
for (const turnoSelec of turno) {
  if (turnoSelec.checked && turnoSelec.value === "tar") turTar++;
  else if (turnoSelec.checked && turnoSelec.value === "man") turMan++; 
  }
}

//Varones que van a asistir a universidad publica
function varonesEduPublica() {
for (const educacionSelec of educacion) {
    for (const generoSelec of genero) {
        if (generoSelec.checked && generoSelec.value === "masc") {
            if (educacionSelec.checked && educacionSelec.value === "publica") varonPubli++;
            }; 
        }; 
    };
}

//Mujeres que van a asistir a universidad privada
function mujeresEduPrivada () {    
    for (const educacionSelec of educacion) {
        for (const generoSelec of genero) {
            if (generoSelec.checked && generoSelec.value === "fem") {
                if (educacionSelec.checked && educacionSelec.value === "privada") mujPrivada++;                
            }; 
        };
    };
}

//Cantidad de alumnos que van a estudiar informática 
function aluInformatica() {
    for (const facultadSelec of estudiaUni) {
            if (facultadSelec.checked && facultadSelec.value === "siEstudia") universitarios++;                
    };
    for (const informSelec of estudiaInform) {
    if (informSelec.checked &&informSelec.value === "siInform") aluInform++;  
    }
    porcAluInform = (aluInform / universitarios) * 100 || 0; 
    }; 

//selecciona genero
function separaGenero() {
    let masc = 0;
    let fem = 0;
    let ind = 0;
    for (const generoSelec of genero) {
        if (generoSelec.checked) {
            if (generoSelec.value === "masc") masc++;
            if (generoSelec.value === "fem") fem++;
            if (generoSelec.value === "ind") ind++;  
        }              
    }
    return {masc,fem,ind};
}

//Alumnos separados por genero que piensan estudiar y trabajar
function trabYEstudia() {   
  for (const trabajador of trabajadores) {
    if (trabajador.checked && trabajador.value === "siTrabaja") {
      for (const facultadSelec of estudiaUni) {
        if (facultadSelec.checked && facultadSelec.value === "siEstudia") {
            const { masc, fem, ind } = separaGenero();
            if (masc) {
              trabMasc++;
            }
            if (fem) {
              trabFem++;
            }
            if (ind) {
              trabInd++;
            }
        }
      }
    }
  }}

//template estadistico
function template() {    
    h3.innerHTML = `Las respuestas son: <br>    
  <b>Turno Tarde</b>   : ${turTar}<br>
  <b>Turno Mañana</b>  : ${turMan}<br>
  <b>Universidad pública (Varones)</b>: ${varonPubli}<br> 
  <b>Universidad privada (Mujeres)</b>: ${mujPrivada} <br> 
  <b>Estudiarán en universidad:</b> ${universitarios}<br>
  <b>Estudiaran Informática en universidad:</b> ${porcAluInform}%<br>
  <b>Estudiaran y trabajarán:</b> <br>${trabMasc} varones<br>
  ${trabFem} mujeres<br>
  ${trabInd} indefinidos<br>  `;    
}

//botones
btn.addEventListener("click", ()=>{
    totalesPorTurno();
    varonesEduPublica();
    mujeresEduPrivada();
    aluInformatica();
    trabYEstudia();
    template();    
    divInf.style.display = "none";
    divTipoEdu.style.display = "none";
});

function final() {
    event.preventDefault();
    title.innerText = "Resultados";
    form.style.display = "none";
    btns.style.display = "none";
    template();
    msj.style.display = "block";
}
