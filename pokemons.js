const lista = document.getElementById('lista');

async function carregar() {

    let resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000');
    let dados = await resposta.json();

    for(let i = 1; i <= dados.count; i++) {

        let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);

        if(!pokemon.ok) {
            return;
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