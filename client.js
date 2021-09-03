
let algoDiv = document.getElementById("algo");

require('electron').ipcRenderer.on('data', (event, message) => {
    console.log(message);
    let newLink = document.createElement("a");
    newLink.setAttribute("href",message.url);
    let title = document.createElement("h3");
    title.innerText = message.title;
    newLink.appendChild(title);
    algoDiv.appendChild(newLink);
})