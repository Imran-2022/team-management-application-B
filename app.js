require('express-async-errors')
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const allRouter = require('./routers/router');

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api', allRouter);

app.get('/', (req, res) => {
    res.send("hellow from dubai 🐸");
})

app.use((err, req, res,next) => {
    return res.status(500).send("Something Failed !");
})

module.exports = app;