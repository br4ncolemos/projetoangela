const btnconfirmar = document.getElementById('confirmar');
const btnlimpar = document.getElementById('limpar');
const busca = document.getElementById('busca');
const API = "https://pokeapi.co/api/v2/pokemon/";
const resultado = document.getElementById('nome');
const imgpokemon = document.getElementById('imagem'); 
const pokemon = document.getElementById('status');

var delaydafoto = null;

async function fazerbusca() {
    let valor = busca.value.trim().toLowerCase();

    if (valor === "") {
        alert("digita alguma coisa");
        return;
    }

    try {
        let resposta = await fetch(API + valor);

        if (!resposta.ok) {
            alert("erro na requisicao)");
            return;
        }

        let dados = await resposta.json();

       let nome = dados.forms[0].name.toUpperCase();
       let peso = dados.weight;
       let tipo = dados.types[0].type.name;
       let altura = dados.height;
       let habilidade = dados.abilities[0].ability.name;

        resultado.innerText =  nome;
        pokemon.innerText = `Altura: ${altura}m Peso: ${peso}kg Tipo: ${tipo} Habilidade: ${habilidade}`;
        
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
        }, 5000);

        
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
}

btnlimpar.addEventListener('click', limpar);

const btnaleatorio = document.getElementById('aleatorio');

btnaleatorio.addEventListener('click', () => {
    window.location.href = "lista.html";
});