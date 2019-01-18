const {app, BrowserWindow, Menu} = require('electron');

const path  = require('path');
const url = require('url');
const IPFS = require('ipfs');
const node = new IPFS();

var mainWindow;

//function to create Initial Window
function createWindow(){
    //Create Browser window
    mainWindow = new BrowserWindow({width: 800, height: 600, icon: __dirname+'assets/icons/egress.png' });

    //load index.html
    mainWindow.loadURL(url.format({
        protocol: "file:",
        slashes: true,
        pathname: path.join(__dirname, 'index.html')
    }));

    //load devtools
    //win.webContents.openDevTools();

    //Setting the Mainmenu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)

    //Start IPFS node
    startIpfsDaemon();

    mainWindow.on('closed', ()=>{
        app.quit();
    });
}

function startIpfsDaemon(){
    node.on('ready', () => {
        console.log('Node is ready to use!');
        node.start();
      });
       
      node.on('error', error => {
        console.error('Something went terribly wrong!', error);
      });
       
      node.on('start', () => console.log('Node started!'));
}


//Main Menu Template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
]
//if run on MAC, then add a empty element
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}


//Run createWindows function
app.on('ready',createWindow);

//Quit when all windows are closed
app.on('window-all-closed',()=>{
        app.quit();
});