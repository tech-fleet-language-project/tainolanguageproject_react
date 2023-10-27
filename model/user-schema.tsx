const mongoose = require('mongoose');

const { Schema, model } = mongoose;

interface IUser {
    firebaseID: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    admin: boolean,
    userAgreement: boolean,
    timestamp?: boolean,
};

const User = new Schema<IUser>({
    firebaseID: {
        type: String,

    },
    firstName: {
        type: String,
        required: [true, 'Error first name is required.'],
        unique: true,
    },
    lastName: {
        type: String,
        required: [true, 'Error last name is required.'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Error email is required.'],
        unique: true,

    },
    // password my be saved in Firestore or in DB
    password: {
        type: String,
        required: [true, 'Error password is required.'],
        unique: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    userAgreement: {
        type: Boolean,
        default: false
    },
    {
        timestamp: true,
    },

});



const UserProfile = model<IUSser>('UserProfile', User);
// push to DB error log

module.exports = UserProfile;