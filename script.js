const html = document.querySelector('html') //4
const focoBt = document.querySelector('.app__card-button--foco') //4
const curtoBt = document.querySelector('.app__card-button--curto') //4
const longoBt = document.querySelector('.app__card-button--longo') //4
const banner = document.querySelector('.app__image') //6
const titulo = document.querySelector('.app__title') //8
const botoes = document.querySelectorAll('.app__card-button') //9
const musicaFocoInput = document.querySelector('#alternar-musica') //10
const musica = new Audio('sons/luna-rise-part-one.mp3'); //10
const audioPlay = new Audio('sons/play.wav'); //12
const audioPausa = new Audio('sons/pause.mp3'); //12
const audioTempoFinalizado = new Audio('sons/beep.mp3') //12
const startPauseBt = document.querySelector('#start-pause') //11
const iniciarOuPausarBt = document.querySelector('#start-pause span') //13
const tempoNaTela = document.querySelector('#timer') //14

let tempoDecorridoEmSegundos = 1500 //11
let intervaloId = null //11

musicaFocoInput.addEventListener('change', () => { //10
    if(musica.paused) {
            musica.play() 
        } 
    else {
            musica.pause() 
        }
})

focoBt.addEventListener('click', () => { //5
    tempoDecorridoEmSegundos = 1500 //14
    alterarContexto('foco') //7
    focoBt.classList.add('active') //9
})

curtoBt.addEventListener('click', () => { //5
    tempoDecorridoEmSegundos = 300 //14
    alterarContexto('descanso-curto') //7
    curtoBt.classList.add('active') //9
})

longoBt.addEventListener('click', () => { //5
    tempoDecorridoEmSegundos = 900 //14
    alterarContexto('descanso-longo') //7
    longoBt.classList.add('active') //9
})

function alterarContexto(contexto) { //7 // codigo refatorado na criação dessa função veja o passo 07 do txt
    mostrarTempo() 
    botoes.forEach(function (contexto) { //9
        contexto.classList.remove('active') 
    })
    
    html.setAttribute('data-contexto', contexto)  //7
    banner.setAttribute('src', `imagens/${contexto}.png`)  //7

    switch (contexto) { //8
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
            break;
        default:
        }
}


function contagemRegressiva () { //11
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()  //12 
       alert('Tempo finalizado!')
       zerar() 
    } 
    else{
        tempoDecorridoEmSegundos -= 1
        console.log('Temporizador: ' + tempoDecorridoEmSegundos) // concatenação
        console.log(intervaloId)
        mostrarTempo()
    }
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() { //11
    if(intervaloId){
        audioPausa.play()  //12
        iniciarOuPausarBt.textContent = "Começar" //13
        zerar()
    }
    else{
        audioPlay.play() //12
        intervaloId = setInterval(contagemRegressiva, 1000)
        iniciarOuPausarBt.textContent = "Pausar" //13
    }
}

function zerar() { //11
    clearInterval(intervaloId) 
    intervaloId = null   
    
}

function mostrarTempo() { //14
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo() //14

