const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactsSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
});

const contactModel = mongoose.model("Contact", contactsSchema);
module.exports = contactModel;