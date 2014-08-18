#!/usr/bin/env node

var recluster = require('recluster'),
    path = require('path');

if(process.argv.length < 3) {
    console.log('You must specify script name');
    process.exit(1);
}

var scriptName = process.argv[2],
    procs = process.argv[3],
    options = {};

if(procs){
    options.workers = procs;
}

var cluster = recluster(path.join(process.cwd(), scriptName), options);
cluster.run();

process.on('SIGUSR2', function() {
    console.log('Got SIGUSR2, reloading cluster...');
    cluster.reload();
});

console.log("spawned cluster, kill -s SIGUSR2", process.pid, "to reload");
