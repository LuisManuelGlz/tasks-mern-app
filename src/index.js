const express = require('express');
const path = require('path');
const morgan = require('morgan');

// initializations
const app = express();
const { mongoose } = require('./config/database');

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
// app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use('/tasks', require('./routes/task.routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// listening the server
app.listen(app.get('port'), () => {
    console.log(`Server listening at port ${app.get('port')}`);
});
