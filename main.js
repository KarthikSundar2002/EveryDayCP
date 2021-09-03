const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron')
const cheerio = require('cheerio');
const axios = require("axios");


const url = "https://cp-algorithms.com/";

async function getRandomAlgorithmLink () {
    const {data} = await axios.get(url);
    const $ = cheerio.load(data);

    const AlgosLinksElements = $("a");
    const AlgoLinks = [];
    const AlgoTitles = [];
    AlgosLinksElements.each((index, element) => {
        AlgoLinks.push(url + $(element).attr("href").slice(1));
        AlgoTitles.push($(element).text());
    })
    for (let i = 0; i < 4; i++) {
        AlgoTitles.shift();
        AlgoLinks.shift();
    }
    for (let i = 0; i < 3; i++) {
        AlgoLinks.pop();
        AlgoTitles.pop();

    }
    let index = Math.floor(Math.random() * (AlgoTitles.length));
    let algo = {
        title: AlgoTitles[index],
        url: AlgoLinks[index]
    }
    return algo;





}

let win = null;

async function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration:true,
            contextIsolation:false
        }
    })


    win.loadFile('index.html');
    let algo = await getRandomAlgorithmLink();
    win.webContents.send("data", algo);



}



app.whenReady().then(() => {

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})


