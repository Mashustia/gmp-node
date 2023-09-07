const { EventEmitter } = require('events');
const fs = require('fs');

const UPDATE_INTERVAL = 100;
const MAX_DURATION = 100000000;
const ONE_MINUTE_IN_MILLISECONDS = 60000;
function updateActivityLog() {
    console.log('updateActivityLog function called');
    fs.appendFile('activityMonitor.log', '<unixtime> : <process info>'+ '\n', (err) => {
        if (err) throw err;
        console.log('Saved!');
    });
}

function activityMonitor() {
    console.log('activityMonitor function called');
    const emitter = new EventEmitter();
    let timeCounter = 0;

    const interval = setInterval(() => {
        timeCounter = timeCounter + UPDATE_INTERVAL;
        console.log('activityMonitor works', timeCounter);

        // TODO: somehow handle errors

        // updates activity log every minute
        if (timeCounter % ONE_MINUTE_IN_MILLISECONDS === 0) {
            updateActivityLog();
            console.log('timeCounter', timeCounter)
        }

        // finishes function
        if (timeCounter === MAX_DURATION) {
            clearInterval(interval);
            emitter.emit('end');
        }
    }, UPDATE_INTERVAL);

    return emitter;
}

const monitor = activityMonitor();

monitor.on('success', (count) => {
    console.log(`Count is: ${count}`);
});

monitor.on('end', () => {
    console.info('Counter has ended');
});
