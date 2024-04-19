const videosContainer = document.querySelector(".videos__container");
const barraDePesquisa = document.querySelector(".pesquisar__input");
const botoesCategoria = document.querySelectorAll(".superior__item");

async function buscar(callback)
{
    try
    {
        const busca = await fetch("https://rafael-a11y.github.io/vid-flow/backend/videos.json");
        const resposta = await busca.json();
        callback(resposta.videos);
    }
    catch(error)
    {
        videosContainer.innerHTML = `
        <li class='videos__item'>
            <p align='center'>Houve um erro ao tentar carregar o vídeo -> ${error}</p>
        </li>`;
    }
}

async function novoVideo()
{
    const update = 
    {
        titulo: "MKXL X1 com KORNABA666",
        descricao: "13 mil visualizações",
        url: `https://www.youtube.com/embed/4Ek5Oiw5yUg`,
        imagem: `https://i.ibb.co/hKCMjgv/Mattahan-Umicons-Games-48.png`,
        categoria: "Games"
    };

    const options = 
    {
        method: "POST",
        headers: 
        {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(update)
    };

    try
    {
        const requisicao = await fetch(`https://rafael-a11y.github.io/vid-flow/backend/videos.json`, options);
        const resultado = await requisicao.json();
        console.log(resultado.videos);
    }
    catch(erro)
    {
        videosContainer.innerHTML = 
        `
        <li class='videos__item'>
            <p align='center'>Houve um erro ao tentar salvar o novo vídeo: ${erro.message}</p>
        </li>
        `;
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

botoesCategoria.forEach(botao =>
{
    const nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
});

barraDePesquisa.addEventListener("input", filtrarPesquisa);
buscar(mostrar);
novoVideo();


