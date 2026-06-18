const btnconfirmar = document.getElementById('confirmar');
const btnlimpar = document.getElementById('limpar');
const btnaleatorio = document.getElementById('aleatorio');
const busca = document.getElementById('busca');
const resultado = document.getElementById('nome');
const imgpokemon = document.getElementById('imagem'); 
const pokemon = document.getElementById('status');
const API = 'https://pokeapi.co/api/v2/pokemon/';
const audio = new Audio("./som.mp3");

audio.loop = true; 
var delaydafoto = null;

function tocarMusica() {
    try { 
        function inicioMusica() {  
            audio.volume = 0.1;
            audio.play().catch(e => console.log("Bloqueado pelo navegador")); 
            document.removeEventListener('click', inicioMusica);
        };
        document.addEventListener('click', inicioMusica);
    } catch (error) {
        console.error("Erro no áudio");
    }
}

async function traduzirTexto(texto) {
    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt`;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados.responseData.translatedText;
    } catch (e) {
        return texto;
    }
}

async function fazerbusca() {
    let valor = busca.value.trim().toLowerCase();

    if (valor === "") {
        alert("digita alguma coisa");
        return;
    }

    try {
        let resposta = await fetch(API + valor);

        if (!resposta.ok) {
            alert("nao existe esse pokemon ou deu erro na busca");
            return;
        }

        let dados = await resposta.json();

        let tipoIngles = dados.types[0].type.name;
        let habIngles = dados.abilities[0].ability.name;

        let tipofeitoepronto = await traduzirTexto(tipoIngles);
        let habfeita = await traduzirTexto(habIngles);

        let nome = dados.forms[0].name.toUpperCase();
        let peso = dados.weight;
        let altura = dados.height;

        resultado.innerText = nome;
        pokemon.innerText = `Altura: ${altura}m Peso: ${peso}kg Tipo: ${tipofeitoepronto} Habilidade: ${habfeita}`;
        
        const imgfrente = dados.sprites.versions['generation-v']['black-white'].animated.front_default;
        const imgcostas = dados.sprites.versions['generation-v']['black-white'].animated.back_default;

        clearInterval(delaydafoto);

        imgpokemon.src = imgfrente;

        let mostrandoFrente = true;
        delaydafoto = setInterval(() => {
            if (mostrandoFrente) {
                imgpokemon.src = imgcostas;
            } else {
                imgpokemon.src = imgfrente;
            }
            mostrandoFrente = !mostrandoFrente; 
        }, 2500);

    } catch (e) {
        console.error('Erro de conexão: ', e);
        alert('Erro ao buscar dados.' + e);
    }
}

btnconfirmar.addEventListener('click', fazerbusca);

function limpar() {
    busca.value = "";
    resultado.innerText = "";
    pokemon.innerText = "";
    imgpokemon.src = "";
    clearInterval(delaydafoto);
}

btnlimpar.addEventListener('click', limpar);

btnaleatorio.addEventListener('click', () => {
    window.location.href = "lista.html";
});

function configurarGuia() {
    btnconfirmar.setAttribute('data-tooltip', 'Pesquisar');
    btnlimpar.setAttribute('data-tooltip', 'Apagar tudo');
    btnaleatorio.setAttribute('data-tooltip', 'Ver todos os Pokémons');
}

window.addEventListener('DOMContentLoaded', () => {
    configurarGuia();
    tocarMusica();
});