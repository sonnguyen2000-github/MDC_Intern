// const fs = require('fs');
// const Logger = require('./logger').Logger;

// const logger = new Logger();

// logger.on('messageLogged', (arg) => {
//     console.log('Listener: Message logged with', arg);
// })


// logger.log('Message');


// fs.open("./README.md", "r", (err, fd) => {
//     if (err) throw err;
//     fs.fstat(fd, (err, stats) => {
//         if (err) throw err;
//         console.log(stats);
//         fs.close(fd, (err) => {
//             if (err) throw err;
//         })
//     })
// })
const http = require('http');
// const fs = require('fs');
const axios = require('axios').default;
const prompt = require('prompt-sync')();

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-type': 'text/html' });
//     console.log(req.url);
//     var url = req.url.split('?');
//     if (url[0] == '/hello') {
//         res.write('Hello World!');

//         res.end();
//     }
//     else
//         if (url[0] == '/html') {
//             if (!url[1])
//                 fs.readFile('./test_PV.html', 'utf-8', (err, data) => {
//                     if (err) {
//                         res.writeHead(404, { 'Content-Type': 'text/html' });
//                         res.write(err.message);
//                     }
//                     else {
//                         res.write(data);
//                     }
//                     res.end();
//                 });
//             else
//                 if (url[1] == 'option2')
//                     fs.readFile('./demoHTML_JS.html', 'utf-8', (err, data) => {
//                         if (err) {
//                             res.writeHead(404, { 'Content-Type': 'text/html' });
//                             res.write(err.message);
//                         }
//                         else {
//                             res.write(data);
//                         }
//                         res.end();
//                     });
//         }
// });

// server.on('connection', (socket) => {
//     //console.log('Connection established on', socket);
// })

// server.listen(4848);
var city = prompt('Type your city')
while (city !== 'cancel') {
    // Optionally the request above could also be done as
    axios.request({
        baseURL: 'http://api.openweathermap.org/',
        url: '/data/2.5/weather',
        method: 'get',
        params: {
            q: city,
            appid: '372c02e55dac2457fe560d56662403e4'
        }
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
            city = prompt('Type your city');
        });
}
// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
    try {
        const response = await axios.get('/user?ID=12345');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

// console.log('Listening on port 4848');
