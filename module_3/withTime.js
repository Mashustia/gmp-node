import EventEmitter from './eventEmitter.js';
import * as https from 'https';

const URL = 'https://jsonplaceholder.typicode.com/posts/1'
class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit('begin');

        try {
            const data = await asyncFunc(...args);
            this.emit('data', data);
            this.emit('end');
        } catch (error) {
            this.emit('error', error);
        }
    }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

const getData = (url) => https.get(url, (response) => {
    let data = [];

    response.on('data', (chunk) => {
        data.push(chunk);
    });

    response.on('end', () => {
        data = Buffer.concat(data).toString();
        console.log(data)
    });

}).on('error', (error) => {
    console.log("Error: " + error.message);
});

withTime.execute(getData, URL);
