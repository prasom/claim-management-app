// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow
} = require('electron')


const electron = require('electron')
const fs = require('fs')
const os = require('os')
const path = require('path')
const ipc = electron.ipcMain
const shell = electron.shell
const isDevelopment = process.env.NODE_ENV !== 'production'
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    })

    // and load the index.html of the app.
    
    mainWindow.loadURL('file://' + __dirname + '/index.html')

    // if (isDevelopment) {
    //     mainWindow.loadFile(`index.html`);
    // }
    // else {
    //     mainWindow.loadURL(formatUrl({
    //         pathname: path.join(__dirname, 'index.html'),
    //         protocol: 'file',
    //         slashes: true
    //     }))
    // }

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()

    }
})



function printPDF() {
    const pdfPath = path.join(os.tmpdir(), 'print.pdf')
    mainWindow.webContents.printToPDF({}, function (error, data) {
        if (error) throw error
        fs.writeFile(pdfPath, data, function (error) {
            if (error) {
                throw error
            }
            shell.openItem(pdfPath)
        })
    })
}

function print() {
    webContents.print({
        silent: false,
        printBackground: true
    }, function (error, data) {
        if (error) throw error
        fs.writeFile(pdfPath, data, function (error) {
            if (error) {
                throw error
            }
            shell.openItem(pdfPath)
        })
    });
}

exports.printPdf = () => printPDF();
exports.printDefault = () => print();