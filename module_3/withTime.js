import EventEmitter from './eventEmitter.js';
import * as https from 'https';

const URL = 'https://jsonplaceholder.typicode.com/posts/1'
const eventName = {
    begin: 'begin',
    end: 'end',
    error: 'error',
    data: 'data',
}
const eventMessage = {
    begin: 'About to execute',
    end: 'Done with execute',
}

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit(eventName.begin);

        try {
            const data = await asyncFunc(...args);
            this.emit(eventName.data, data);
            this.emit(eventName.end);
        } catch (error) {
            this.emit(eventName.error, error);
        }
    }
}

const withTime = new WithTime();

withTime.on(eventName.begin, () => console.log(eventMessage.begin));
withTime.on(eventName.end, () => console.log(eventMessage.end));

const getData = (url) => https.get(url, (response) => {
    let data = [];

    response.on(eventName.data, (chunk) => {
        data.push(chunk);
    });

    response.on(eventName.end, () => {
        data = Buffer.concat(data).toString();
        console.log(data)
    });

}).on(eventName.error, (error) => {
    console.log("Error: " + error.message);
});

withTime.execute(getData, URL);
