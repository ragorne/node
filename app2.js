const app = require('express')();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const fs = require('fs');
var morgan = require('morgan');
var logFile = fs.createWriteStream('./api.log', {flags: 'a'});
app.use(morgan('combined', { stream: logFile }));

fs.readFile('./objects.json', (err, data) => {
    if (err) {
        console.error(err)
    } else {
        object = JSON.parse(data);
    }
});


app.get('/', (req, res) => {
    res.send('Hello world !')
});
app.post('/ajoutUser', function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    objectUser = object.user;
    id = objectUser.length + 1;
    objectUser.push({id: id, name: name, password: password});
    fs.writeFile('./objects.json', JSON.stringify(object), (err) => {
        if (err) {
            console.error(err);
            res.send('Une erreur est survenue')
        }
        else {
            res.send(object)
        }
    })
});

app.post('/ajoutList', function (req, res) {
    var name = req.body.name;
    var user = req.body.user;
    var items = req.body.items;
    objectList = object.list;
    id = objectList.length + 1;
    objectList.push({id: id, name: name, user: user, items: items});
    fs.writeFile('./objects.json', JSON.stringify(object), (err) => {
        if (err) {
            console.error(err);
            res.send('Une erreur est survenue')
        }
        else {
            res.send(object)
        }
    })
});

app.post('/ajoutItem', function (req, res) {
    var label = req.body.label;
    var image = req.body.image;
    var description = req.body.description;
    objectItem = object.item;
    id = objectItem.length + 1;
    objectItem.push({id: id, label: label, image: image, description: description});
    res.send(object);
    fs.writeFile('./objects.json', JSON.stringify(object), (err) => {
        if (err) {
            console.error(err);
            res.send('Une erreur est survenue')
        }
        else {
            res.send(object)
        }
    })
});

app.delete('/supprimerUser', function (req, res) {
    var objectUser = object.user;
    var element = objectUser.find(function (element) {
        return element.id === req.body.id
    });
    objectUser.splice(objectUser.indexOf(element),1);
    fs.writeFile('./objects.json', JSON.stringify(object), (err) => {
        if (err) {
            console.error(err);
            res.send('Une erreur est survenue')
        }
        else {
            res.send(object)
        }
    })
});

app.delete('/supprimerItem', function (req, res) {
    var objectItem = object.item;
    var element = objectItem.find(function (element){
        return element.id === req.body.id
    });
    objectItem.splice(objectItem.indexOf(element), 1);
    fs.writeFile('./objects.json', JSON.stringify(object), (err) => {
        if (err) {
            console.error(err);
            res.send('Une erreur est survenue')
        }
        else {
            res.send(object)
        }
    })
});

app.delete('/supprimerList', function (req, res) {
    var objectList = object.list;
    var element = objectList.find(function (element) {
        return element.id === req.body.id;
    });
    objectList.splice(objectList.indexOf(element), 1);
    fs.writeFile('./objects.json', JSON.stringify(object), (err) => {
        if (err) {
            console.error(err);
            res.send('Une erreur est survenue')
        }
        else {
            res.send(object)
        }
    })
});

app.get('/User', function (req, res) {
    res.send(object.user)
});

app.get('/List', function (req, res) {
    res.send(object.list)
});

app.get('/Item', function (req, res) {
    res.send(object.item)
});

app.put('/modifUser', function (req, res) {
    var objectUser = object.user;
    var element = objectUser.find(function (element) {
        return element.id === req.body.id;
    });
    var name = req.body.name;
    var password = req.body.password;
    objectUser[objectUser.indexOf(element)] = {
        id: req.body.id,
        name: name,
        password: password
    };
    fs.writeFile('./objects.json', JSON.stringify(object), (err) => {
        if (err) {
            console.error(err);
            res.send('Une erreur est survenue')
        }
        else {
            res.send(object)
        }
    })
});

app.put('/modifList', function (req, res) {
    var objectList = object.list;
    var element = objectList.find(function (element) {
        return element.id === req.body.id;
    });
    var name = req.body.name;
    var password = req.body.password;
    objectList[objectList.indexOf(element)] = {
        id: req.body.id,
        name: name,
        password: password
    };
    fs.writeFile('./objects.json', JSON.stringify(object), (err) => {
        if (err) {
            console.error(err);
            res.send('Une erreur est survenue')
        }
        else {
            res.send(object)
        }
    })
});

app.put('/modifItem', function (req, res) {
    var objectItem = object.item;
    var element = objectItem.find(function (element) {
        return element.id === req.body.id;
    });
    var name = req.body.name;
    var password = req.body.password;
    objectItem[objectItem.indexOf(element)]={
        id: req.body.id,
        name: name,
        password: password
    };
    fs.writeFile('./objects.json', JSON.stringify(object), (err) => {
        if (err) {
            console.error(err);
            res.send('Une erreur est survenue')
        }
        else {
            res.send(object)
        }
    })
});

app.listen(9999, () => {
    console.log('App listening on port 9999')
})