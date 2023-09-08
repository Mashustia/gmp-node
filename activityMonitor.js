const { EventEmitter } = require('events');
const fs = require('fs');
const os = require('os');
const { exec } = require('node:child_process');

const UPDATE_INTERVAL = 7500; // 8 times per minute
const MAX_DURATION = 100000000;
const ONE_MINUTE_IN_MILLISECONDS = 60000;
const CARRIAGE_RETURN = '\r';

const OS_TYPES = {
    LINUX: 'Linux',
    MACOS: 'Darwin',
    WINDOWS: 'Windows_NT',
}

const PROCESS_COMMAND = {
    [OS_TYPES.WINDOWS]: 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"',
    [OS_TYPES.MACOS]: 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1',
    [OS_TYPES.LINUX]: 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1',
}

function getSystemDetails(command, callback) {
    exec(command)
        .stdout
        .on('data', (data) => {
            const systemDetails = data.toString().replace(/[\r\n]/gm, '');
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(systemDetails);
            callback(systemDetails)
        })
}

function updateActivityLog(processInfo) {
    fs.appendFile('activityMonitor.log', `<${Date.now()}> : <${processInfo}>${'\n'}`, (err) => {
        if (err) throw err;
    });
}

function activityMonitor() {
    const operationSystem = os.type();
    const emitter = new EventEmitter();
    let timeCounter = 0;
    let processInfo = '';

    const updateProcessInfo = (newInfo) => {
        processInfo = newInfo;
    }

    const interval = setInterval(() => {
        timeCounter = timeCounter + UPDATE_INTERVAL;
        getSystemDetails(PROCESS_COMMAND[operationSystem], updateProcessInfo);

        // updates activity log every minute
        if (timeCounter % ONE_MINUTE_IN_MILLISECONDS === 0) {
            updateActivityLog(processInfo);
        }
    }, UPDATE_INTERVAL);

    return emitter;
}

const monitor = activityMonitor();
