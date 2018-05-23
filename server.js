const express = require('express'); // import 'express'
const hbs = require('hbs');    // import 'handlebars'
const fs = require('fs');     // import 'fs'

const port = process.env.PORT || 3000;  //configure to work with heroku
//-------------------
let app = express();
//-------------------
hbs.registerPartials(__dirname + '/views/partials') //register partials folder
//-------------------
hbs.registerHelper('getCurrentYear', () => { //look at /views/partials/footer.hbs
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => { //look at /views/home.hbs
  return text.toUpperCase();
});
//-------------------
app.set('view engine', 'hbs'); // this sets the 'view engine' to 'handlebars'
//-------------------
app.use((request, response, next) => {
  let now = new Date().toString();
  let log = `${now}: ${request.method} ${request.url}`;

  console.log(log)
  fs.appendFileSync('server.log', log + '\n') // look at server.log

  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); // app.user sets up middleware
//--------------------------------------------------------------------------------

app.get('/', (request, response) => { // home page
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my first website'
  });
});

app.get('/about', (request, response) => { // about page
  response.render('about.hbs', {  // '.render' will render the file in the first argument, and pass keys with second argument
    pageTitle: 'About Page'
  });
});

app.get('/bad', (request, response) => {  // bad page
  response.send({
    errorMessage: 'Unable to handle request!'
  });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
}); //port

// nodemon server.js -e js,hbs