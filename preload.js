


window.addEventListener('DOMContentLoaded',() => {
    const AlgoDiv = document.getElementById("algo");
    const algo = getRandomAlgorithmLink();
    let link = document.createElement("a");
    link.setAttribute("href",algo.url);
    link.appendChild(`<h3>${algo.title}</h3>`);
    AlgoDiv.appendChild(link);

})