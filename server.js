// server.js -- A simple Express.js web server for serving a React.js app
//import path from 'path';
//import express from 'express';
//const PORT = process.env.HTTP_PORT || 4001;
//const app = express();
//app.use(express.static(path.join(__dirname, 'client', 'build')));
//app.listen(PORT, () => {
//    console.log(`Server listening at port ${PORT}.`);
//});

///////////////////
//MONGOOSE SET-UP//
///////////////////
import mongoose, { Collection } from 'mongoose';
const connectStr = 'mongodb://localhost/appdb';
mongoose.set('useFindAndModify', false);

//Open connection to database
mongoose.connect(connectStr, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(
    () =>  {console.log(`Connected to ${connectStr}.`)},
    err => {console.error(`Error connecting to ${connectStr}: ${err}`)}
  );

//Define schema that maps to a document in the Users collection in the appdb
//database.
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name: {type: String, required: true},
    birthday: {type: Date, required: true},
});

const userSchema = new Schema({
    id: {type: String, required: true}, //unique identifier for user
    password: String, //unencrypted password (for now!)
    displayName: {type: String, required: true}, //Name to be displayed within app
    authStrategy: {type: String, required: true}, //strategy used to authenticate, e.g., github, local
    profileImageUrl: {type: String, required: true}, //link to profile image
    securityQuestion: String,
    securityAnswer: {type: String, required: function() {return this.securityQuestion ? true: false}},
    data: [dataSchema]
  });

//Convert schema to model
const User = mongoose.model("User",userSchema); 

