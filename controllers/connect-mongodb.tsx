const mongoose = require('mongoose');
const { connect } = mongoose;


export async function connectMongoDB() {
    //TODO: update after creating MongoDB accounts
    await mongoose.connect('mongodb://127.0.0.1:27017/test', {
        ssl: true,
        sslValidate: false,
        })
        .then(console.log('Successful connected to MongoDB.'))
        .catch(error => {console.error('Unsuccessful in connecting to MongoDb.', error);})
}
