const mongoose = require('mongoose');
const { connect } = mongoose;


export async function connectMongoDB() {
    await connect('mongodb://127.0.0.1:27017/test')
    .then(console.log('Successful connected to MongoDB.'))
    .catch(error => {console.error('Unsuccessful in connecting to MongoDb.', error);})
}
