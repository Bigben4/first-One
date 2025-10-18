const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// serve static client files from this folder
app.use(express.static(path.join(__dirname)));

// very small in-memory "users" store
const users = [];

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body || {};
  if(!name || !email || !password) return res.json({ok:false, error:'Missing fields'});
  if(users.find(u => u.email === email)) return res.json({ok:false, error:'Email already registered'});
  users.push({name, email, password});
  return res.json({ok:true});
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  if(!email || !password) return res.json({ok:false, error:'Missing fields'});
  const u = users.find(u => u.email === email && u.password === password);
  if(!u) return res.json({ok:false, error:'Invalid credentials'});
  return res.json({ok:true, name: u.name});
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('Mock server running on http://localhost:'+port));
