const express = require('express');
// sets up our express server
const app = express();
const bodyParser = require('body-parser');
// listens for http request on this port
const PORT = process.env.PORT || 5000;
const toDoRouter = require('./routes/todo.router')


const port = process.env.PORT || 5000; // changed this so it can run on heroku

app.use(bodyParser.urlencoded({extended: true}));

// 👇🏼 express static file serving 👇🏼
// folder name is server/public
app.use(express.static('server/public'));


app.use('/tasks', toDoRouter);







// start up server
app.listen(port, function() {
    console.log('Listening on Port', port);
    
});