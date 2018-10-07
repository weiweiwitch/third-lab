import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({
        width: 1680,
        height: 900,
        webPreferences: {webSecurity: false}, // 允许跨域请求
    });

    console.log('path：', path.join(__dirname));

    if (process.env.NODE_ENV !== 'production') {
        win.loadURL('http://localhost:3000');

        // 打开调试工具界面
        win.webContents.openDevTools();

    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true,
            }),
        );

        // 打开调试工具界面
        // win.webContents.openDevTools();
    }

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});