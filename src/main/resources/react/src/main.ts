import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({
        width: 1680,
        height: 900,
        webPreferences: {webSecurity: false}, // 允许跨域请求
    });


    console.log('path：', path.join(__dirname));

    if (process.env.NODE_ENV !== 'production') {
        const pageUrl = url.format({
            hostname: 'localhost',
            port: 3000,
            // query: {
            //     surl: 'http://localhost:3000',
            // },
            protocol: 'http:',
            slashes: true,
        });
        console.log(pageUrl);
        win.loadURL(pageUrl);

        // 打开调试工具界面
        win.webContents.openDevTools();

    } else {
        const userDataPath = app.getPath('userData');
        const configFilePath = `${path.join(userDataPath, 'thirdlab.cfg')}`;
        const cfgStr = fs.readFileSync(configFilePath);
        console.info(`config file path: ${configFilePath}`);
        console.info(`cfgStr: ${cfgStr}`);
        const pageUrl = url.format({
            pathname: path.join(__dirname, 'index.html'),
            query: {
                surl: cfgStr,
            },
            protocol: 'file:',
            slashes: true,
        });
        console.log(pageUrl);
        win.loadURL(pageUrl);

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