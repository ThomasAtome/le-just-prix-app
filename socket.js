module.exports = (server) => {

    const socket = require('socket.io');
    const io = socket(server);

    io.on('connection', socket => {

        console.log('A new player has started a game !');

        let username;
        let object;
        let tries;

        socket.on('initGame', data => {
            username = data.username;
            object = require('./objects')[parseInt(data.objectId)];
            tries = [];
        });

        socket.on('newTry', data => {

            console.log(data);

            tries.push(data.price);

            const res = {
                win: false,
                tries: tries.length
            };

            if(parseFloat(data.price) === object.price) {
                res.win = true;
                res.content = `Bravo ${username} ! Tu as réussi à terminer en ${tries.length} ${tries.length > 1 ? 'tentatives' : 'tentative'}`;
            }
            else {
                if(parseFloat(data.price) < object.price) {
                    res.content = `Oups ! C'est plus que ${data.price}€ ..`;
                }
                else {
                    res.content = `Oups ! C'est moins que ${data.price}€ ..`;
                }
            }

            socket.emit('resTry', res);

        });

    });

};
