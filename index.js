const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const {join} = require('path');
const root=join(__dirname, 'public');
const app = express();
const port = 3000;
require("dotenv").config();
const firebase = require('firebase');
const crypto = require("crypto");
const sha256 = data => crypto.createHash("sha256").update(data, "binary").digest("hex");
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKETS,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

app.use(session({
  secret: process.env.EXPRESS_SECRET,
  name: 'ideaApp',
  saveUninitialized: false,
}));
app.use(express.static('public'));

//LOGIN/LOGOUT
app.get('/login', (req, res) => res.sendFile('login.html', {root}));
app.post('/login', bodyParser.urlencoded(), (req, res, next) => {
  database.ref('utenti').once('value')
    .then(function(snapshot) {
      const elenco = snapshot.val();
      for(const utente in elenco)
        if(req.body.username == utente && sha256(req.body.password) == elenco[utente]) {
          res.locals.username = req.body.username;
          next();
        } else
          res.sendFile('login.html', {root});
    });
}, (req, res) => {
  req.session.loggedIn = true;
  req.session.username = res.locals.username;
  res.redirect('/dashboard');
});
app.get('/logout', (req, res) => {
  req.session.destroy(err => {});
  res.send('Thank you! Visit again');
});
app.get('/loginAs', (req, res) => res.send(req.session.username));


//NAVBAR
app.get('/leftnavbar',(req,res)=>res.sendFile('leftnavbar.html', {root}));
app.get('/navbarsopra',(req,res)=>res.sendFile('navbarsopra.html', {root}));

//PROGETTI
app.get('/progetto',(req,res)=>res.sendFile('progetto.html', {root}));
app.get('/getProgetto/:indice',(req,res)=>{
  const indice=req.params.indice;
  database.ref('progetti').once('value')
    .then(function(snapshot) {
      const elenco = snapshot.val();
      for(const progetto in elenco)
        if(elenco[progetto]['indice']==indice)
          res.send(elenco[progetto]);
    });
});
app.get('/elencoProgetti/',(req,res)=>{
  database.ref('progetti').once('value')
    .then(function(snapshot) {
      const elenco = snapshot.val();
      res.send(elenco);
    });
});

//FINE
app.listen(port, () => console.log('Website is running'));
