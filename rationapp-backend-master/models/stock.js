const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    monthyear : {
        type : String,
        required : true,
        sparse:true,
        uppercase : true,
        index:true
    },
    riceTotalStock : {
        type : Number,
        required : true
    },
    riceSoldStock : {
        type : Number,
        required : true
    },
    riceAvailableStock : {
        type : Number,
        required : true
    },
    sugarTotalStock : {
        type : Number,
        required : true
    },
    sugarSoldStock : {
        type : Number,
        required : true
    },
    sugarAvailableStock : {
        type : Number,
        required : true
    },
    wheatTotalStock : {
        type : Number,
        required : true
    },
    wheatSoldStock : {
        type : Number,
        required : true
    },
    wheatAvailableStock : {
        type : Number,
        required : true
    },
    oilTotalStock : {
        type : Number,
        required : true
    },
    oilSoldStock : {
        type : Number,
        required : true
    },
    oilAvailableStock : {
        type : Number,
        required : true
    },
    dalTotalStock : {
        type : Number,
        required : true
    },
    dalSoldStock : {
        type : Number,
        required : true
    },
    dalAvailableStock : {
        type : Number,
        required : true
    },
});

const Stock = mongoose.model('stocks', stockSchema);

module.exports = Stock;