"use strict";
//import {app, BrowserWindow} from 'electron';
const { globalShortcut } = require('electron');
const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
	win = new BrowserWindow({
		backgroundColor: "#ffffff",
		show: false,
		darkTheme: true
	});

	win.maximize();

	win.show();

	win.loadFile("index.html");

	win.webContents.openDevTools();
	win.setMenu(null);

	win.on("close", () => {
		win = null;
	});

	var reload = () => {
		win.reload()
	}

	globalShortcut.register('F5', reload);
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
	app.quit();
});

app.on("activate", () => {
	if (win === null)
		createWindow();
});