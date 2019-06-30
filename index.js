import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import notesRouter from './api/notes';
import categoryRouter from './api/categories';
import itemRouter from './api/items';

const app = express();

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/test';
mongoose.connect(mongoDB, { useNewUrlParser: true, useFindAndModify: false });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('open', function() { console.log('Connected to database!') });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoints
app.use('/api/notes', notesRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/items', itemRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Beep boop`);