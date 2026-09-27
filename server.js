const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const DB_FILE = path.join(__dirname, 'data.json');

function loadData() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading data:', e);
  }
  return { contacts: [], notes: [], medical: {} };
}

function saveData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving data:', e);
  }
}

// API Endpoints
app.get('/api/data', (req, res) => {
  res.json(loadData());
});

app.post('/api/contacts', (req, res) => {
  const data = loadData();
  const newContact = { id: Date.now(), ...req.body };
  data.contacts.push(newContact);
  saveData(data);
  res.json({ success: true, contact: newContact });
});

app.delete('/api/contacts/:id', (req, res) => {
  const data = loadData();
  data.contacts = data.contacts.filter(c => c.id != req.params.id);
  saveData(data);
  res.json({ success: true });
});

app.post('/api/notes', (req, res) => {
  const data = loadData();
  const newNote = { id: Date.now(), ...req.body };
  data.notes.push(newNote);
  saveData(data);
  res.json({ success: true, note: newNote });
});

app.delete('/api/notes/:id', (req, res) => {
  const data = loadData();
  data.notes = data.notes.filter(n => n.id != req.params.id);
  saveData(data);
  res.json({ success: true });
});

app.post('/api/medical', (req, res) => {
  const data = loadData();
  data.medical = req.body;
  saveData(data);
  res.json({ success: true, medical: data.medical });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Emergency Center running on port ${PORT}`);
});
