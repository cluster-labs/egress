const IPFS = require('ipfs');
const fs = require('fs');

var ipfsOptions = {
    'repo': '/home/vasa/egress'
};
//Don't initialze if already initialized
if (fs.existsSync(ipfsOptions['repo'])) {
    ipfsOptions['init'] = false;
}

//initialize IPFS node & start daemon
const node = new IPFS(ipfsOptions);
initializeListeners();

function initializeListeners(){
    node.on('ready', () => {
        //fired when `init` & `start` is done.
        console.log('Node is ready to use!');
        //getBootstrap();
        console.log('Adding data to Network...');
        addData();
    });
      
    node.on('init', () => {
        console.error('Repo Initialized');
    });

    node.on('error', error => {
        console.error('\n\nXXX Something went terribly wrong XXX\n\n', error);
    });
       
    node.on('start', ()=>{
        console.log('Daemon Started!');
    });

    node.on('stop', ()=>{
        console.log('Node Stopped!');
    });
}

function addData(){
    var buf = Buffer.from("hello vasa", 'utf8');
    console.log("here!");
    node.add({
        content: buf
    },(err, res)=>{
        if(err){
            console.log('Error while adding data to Network\n',err);
        }
        else{
            console.log('Data added to Network\n',res);
        }
    });
}

/* function getBootstrap(){
    node.bootstrap.list((err, res)=>{
        if(err){
            console.log("\nBootStrap ERROR:\n ", err);
        }
        else{
            console.log("\nBOOTSTRAP NODE\n")
            console.log(res);
        }
    });
} */

