const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs  = require('express-handlebars');
const members = require('./Members');

const app = express();

app.use(logger);

//Handlebars middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


//Homepage Route
app.get('/', (req, res) => res.render('index', {
	title: 'Member App',
	members
}));

//Body Parser Middleware
app.use(express.json());

app.use(express.urlencoded({extended: false}));


//Members API routes
app.use('/api/members', require('./routes/api/members'));

//SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

