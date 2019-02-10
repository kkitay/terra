const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('starting electron');
            startedElectron = true;
            const spawn = require('child_process').spawn;
            try {
                const child = spawn('yarn', ['electron']);
                child.stdout.on('data', (data) => {
                    console.log(data.toString());
                });
                child.on('error', (data) => {
                    console.log(data);
                });
                child.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                });
            } catch(err) {
                console.log('exception', err);
            }
        }
    }
);

tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});