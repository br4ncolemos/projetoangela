const lista = document.getElementById('lista');
const voltar = document.getElementById('voltar');

voltar.addEventListener('click', () => {
    window.location.href = "index.html";
});

async function carregar() {
    let resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=-1');
    let dados = await resposta.json();

    let conteudoHTML = '';

    for (let i = 0; i < dados.results.length; i++) {
        let pokemon = dados.results[i];
        
        let numeroPokemon = i + 1; 

        let urlImagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroPokemon}.png`;

        conteudoHTML += `
            <div class="card">
                <img src="${urlImagem}">
                <p>${pokemon.name.toUpperCase()}</p>
            </div>
        `;
    }

    lista.innerHTML = conteudoHTML;
}

carregar();