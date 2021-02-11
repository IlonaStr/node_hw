const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const contactsRouter = require('./contacts/routes');
const usersRouter = require('./users/router.users')

require("dotenv").config();
const PORT = process.env.PORT;

const contactsServer = async () => {
    const app = express();
    app.use(express.json());
    try {
        await mongoose.connect(process.env.CONNECT_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Successfully connected");
    } catch (err) {
        if(err) {
            process.exit(1);
        }
    }
    app.use(morgan('combined'));
    app.use(cors({ origin: "http://localhost:8080" }));
    app.use("/contacts", contactsRouter);
    app.listen(PORT, 
        err => err ? console.error(err) : console.info ('Server is listening on port' + PORT)
        );
}

contactsServer();