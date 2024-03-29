class EventEmitter {
    listeners = {};  // key-value pair

    addListener(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] ?? [];
        this.listeners[eventName].push(fn);
        return this;
    }
    on(eventName, fn) {
        return this.addListener(eventName, fn);
    }

    removeListener(eventName, fn) {
        const suitableListeners = this.listeners[eventName];
        if (!suitableListeners) return this;
        for (let i = suitableListeners.length; i > 0; i--) {
            if (suitableListeners[i] === fn) {
                suitableListeners.splice(i,1);
                break;
            }
        }
        return this;
    }

    off(eventName, fn) {
        return this.removeListener(eventName, fn);
    }

    once(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] ?? [];
        const onceWrapper = () => {
            fn();
            this.off(eventName, onceWrapper);
        }
        this.listeners[eventName].push(onceWrapper);
        return this;
    }

    emit(eventName, ...args) {
        const suitableListeners = this.listeners[eventName];
        if (!suitableListeners) return false;
        suitableListeners.forEach((f) => {
            f(...args);
        });
        return true;
    }

    listenerCount(eventName) {
        const suitableListeners = this.listeners[eventName] ?? [];
        return suitableListeners.length;
    }

    rawListeners(eventName) {
        return this.listeners[eventName];
    }
}
export default EventEmitter;

// need to uncomment to check function work

/*const myEmitter = new EventEmitter();

function c1() {
    console.log('an event occurred!');
}

function c2() {
    console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));*/
