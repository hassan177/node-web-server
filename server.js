const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 5000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res ,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
       title: 'Home Page',
       welcomeMsg: 'Welcome'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page'
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMsg: 'Unable to respond'
    });
});
app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        title: 'Portfolio'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});