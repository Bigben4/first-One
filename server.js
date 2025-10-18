const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  // enable CORS for local file testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// simple in-memory "db"
const users = new Map();

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ ok: false, message: 'Missing fields' });
  if (users.has(email)) return res.status(409).json({ ok: false, message: 'Email already registered' });
  users.set(email, { name, password });
  return res.json({ ok: true, message: 'Created' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ ok: false, message: 'Missing fields' });
  const u = users.get(email);
  if (!u) return res.status(404).json({ ok: false, message: 'User not found' });
  if (u.password !== password) return res.status(401).json({ ok: false, message: 'Invalid credentials' });
  return res.json({ ok: true, message: 'Logged in', name: u.name });
});

app.listen(port, () => console.log('Mock auth server listening on http://localhost:' + port));
