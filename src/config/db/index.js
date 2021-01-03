const mongoose = require('mongoose');
async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/bkav_update',{
            useNewUrlParser: true
        });
        console.log('Connect database successfull !!')
    } catch (error) {
        console.log('Connect database failure !!')
    }
    
}
module.exports = {connect};