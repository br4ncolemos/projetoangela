const lista = document.getElementById('lista');
const voltar = document.getElementById('voltar');

voltar.addEventListener('click', () => {
    window.location.href = "index.html";
});

async function carregar() {

    let resposta = await fetch('https://pokeapi.co/api/v2/pokemon/');
    let dados = await resposta.json();

    for(let i = 1; i <= dados.results.length; i++) {

        let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);

        if(!pokemon.ok) {
            return alert('erro para mostrar os pokemons');
        }

        let info = await pokemon.json();

        lista.innerHTML += `
            <div class="card">
                <img src="${info.sprites.front_default}">
                <p>${info.name.toUpperCase()}</p>
            </div>
        `;
    }

}

carregar();