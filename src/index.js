const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const app = express()
const port = 3000

//HTTP Loger
app.use(morgan('combined'))
//Template engine
app.engine('hbs',handlebars({extname:'hbs'}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'resources/views'));

// Static folder
app.use(express.static(path.join(__dirname,'public')));
console.log(path.join(__dirname,'public'))
app.get('/', (req, res) => {
    res.render('home')
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})