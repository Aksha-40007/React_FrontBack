const mongoose = require('mongoose');
const { isEmail } = require('validator');

const complaintSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        lowercase : true,
        validate: [ isEmail , 'Please enter a valid email']
    },
    shopkeepername : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    query : {
        type : String,
        required : true,
    },
});

const Complaint = mongoose.model('complaints', complaintSchema);

module.exports = Complaint;