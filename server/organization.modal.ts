import mongoose from 'mongoose';

var Schema = mongoose.Schema;
var organizationSchema = new Schema({
    name: {type: String, required: true},
    id: {type: String, required: true},
    profilePicture: {type: String},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    contactPersonal: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    password: {type: String, required: true}
});

module.exports = mongoose.model("organization", organizationSchema);