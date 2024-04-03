const videosContainer = document.querySelector(".videos__container");
const barraDePesquisa = document.querySelector(".pesquisar__input");
const botoesCategoria = document.querySelectorAll(".superior__item");

async function buscar(callback)
{
    try
    {
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();
        callback(videos);
    }
    catch(error)
    {
        videosContainer.innerHTML = `
        <li class='videos__item'>
            <p align='center'>Houve um erro ao tentar carregar o vídeo -> ${error}</p>
        </li>`;
    }
}

async function novoVideo(){   
    try
    {
        const novo = await fetch("http://localhost:3000/videos", {method: "POST", body: JSON.stringify({titulo: "MKXL X1 com KORNABA666", descricao : "11 visualizações  há 5 anos", url : "https://www.youtube.com/watch?v=4Ek5Oiw5yUg", imagem: "https://imgbin.com/png/BjUyYYx7/mortal-kombat-png?raw=true", id: "14", categoria: "Games"}), headers: {"Content-Type" : "application/json"}});
        const resposta = await novo.json();
        console.log(resposta);
    }
    catch(error)
    {
        console.log("O novo vídeo não pode ser gerado corretamente", error);
    }
}

function mostrar(videos)
{   
    videos.forEach(video => 
    {
        if(video.categoria === "") throw new Error("Vídeo não tem categoria");
        videosContainer.innerHTML += 
        `
        <li class='videos__item'>
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class='descricao-video'>
                <img class='img-canal' src='${video.imagem} alt='Logo do Canal'>
                <h3 class='titulo-video'>${video.titulo}</h3>
                <p class='titulo-canal'>${video.descricao}</p>
                <p class='categoria' hidden>${video.categoria}</p>
            </div>
        </li>
        `;
    });
}

function filtrarPesquisa()
{
    const videos = document.querySelectorAll(".videos__item");
    const valorFiltro = barraDePesquisa.value.toLowerCase();
    for(let video of videos)
    {
        const titulo = video.querySelector(".descricao-video>h3").textContent.toLowerCase();
        video.style.display = (titulo.includes(valorFiltro) || barraDePesquisa.value == "") ? "block" : "none";
    }
    
}

function filtrarPorCategoria(filtro)
{
    const videos = document.querySelectorAll(".videos__item");
    for(let video of videos)
    {
        const videoCategoria = video.querySelector(".descricao-video>.categoria").textContent;
        video.style.display = (filtro == videoCategoria || filtro == "Tudo") ? "block" : "none";
    }
}

async function novo()
{
    const update = 
    {
        titulo: 'MKXL X1 com KORNABA666',
        descricao: '13 vvisualizações',
        url: "https://www.youtube.com/embed/4Ek5Oiw5yUg",
        imagem: "https://i.ibb.co/hKCMjgv/Mattahan-Umicons-Games-48.png",
        categoria: "Games"
    };
        
    const options = 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update)
    };
    try
    {
        const requisicao = await fetch("http://localhost:3000/videos", options);
        const resposta = await requisicao.json();
    }
    catch(erro)
    {
        videosContainer.innerHTML = 
            `<li class='videos__item'>
                <p align='center'>Houve um erro ao tentar salvar o novo vídeo -> ${erro}</p>
            </li>`
        ;
    }
}

botoesCategoria.forEach(botao =>
{
    const nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
});

barraDePesquisa.addEventListener("input", filtrarPesquisa);
// novo();
buscar(mostrar);


