"use strict";

const {app, BrowserWindow} = require('electron')


let win;

function createWindow(){
    win = new BrowserWindow({
        backgroundColor: "#ffffff",
        show:false,
    });

    win.maximize();

    win.show();

    win.loadFile("index.html");

    win.webContents.openDevTools();
    win.setMenu(null);

    win.on("close", ()=> {
        win = null;
    });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    app.quit();
});

app.on("activate", () => {
    if(win === null)
        createWindow();
});