const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { contactsRouter } = require('./router');

const PORT = 8080;
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRouter);

app.use((err, req, res, next) => {
    if (!err) return next()
    console.error(err);
    res.status(500).send({ message: err.message });
});

app.use((req, res) => {
    res.status(404).send({ message: 'Page not found' })
})

app.listen(PORT, 
    err => err ? console.error(err) : console.info ('Server is listening on port' + PORT)
    );