const EventEmitter = require('events');

class Logger extends EventEmitter {
    constructor() {
        super();
    }

    log(message) {
        console.log(message);
        this.emit('messageLogged', { id: '100', msg: 'Logging...' });
    }
}


module.exports.Logger = Logger;