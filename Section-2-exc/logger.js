const EventEmitter = require("events");

let url = "http://smth.com/log";

class Logger extends EventEmitter{
    log(msg) {
        // send http req
        console.log(msg);

        // raise an event
        this.emit("messageLogged", { id: 1, url: "http://" });
    }
}

module.exports = Logger;
