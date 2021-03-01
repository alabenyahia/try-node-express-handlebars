const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const data = require('./data');

const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} ${new Date()}`)
    next();
}

app.get('/', (req, res) => {
    res.render('index', {
        title: 'List of persons',
        persons: data['persons']
    });
});

app.get('/:id', (req, res) => {
    const p = data['persons'].filter(person => person.id === parseInt(req.params.id))
    res.render('person', {
        id: req.params.id,
        name: p[0] ? p[0]['name'] : null,
        email: p[0] ? p[0]['email'] : null,
        error: p.length===0
    });
});

app.use('/api/persons', require('./routes/api/persons/persons'));

app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));


app.listen(5000, ()=> console.log('server is up and running'));

