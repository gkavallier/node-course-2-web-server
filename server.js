const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT  || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if (err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use ((req, res, next) => {
//     res.render('maintenance.hbs', {
//         message: 'Site under maintenance, please try later'
//     });
// });
app.use(express.static(__dirname + "/public"));



hbs.registerHelper('getCurrentYear', () =>  {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {
 //   res.send('<h1>hello express</h1>');
 //   res.send({
 //       name:'giorgos',
 //       likes: [
 //           'biking',
 //           'traveling'
 //       ]
 //   });
    res.render('home.hbs', {
            pageTitle: 'Home page',
            welcomeMessage: 'welcome to my site'

    });

});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About page'
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs',{
        pageTitle: 'Projects page'
    });
});


app.get('/bad', (req,res) => {
    res.send({
            errorMessage: 'Unable to handle request'
    });

});

app.listen(port, () => {
    console.log(`server is up on port ${port}...`);
});