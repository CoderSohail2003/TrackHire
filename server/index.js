const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Start in‑memory MongoDB (no separate file needed)
let mongod;
async function startMemoryDB() {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
  console.log('✅ In-memory MongoDB connected');
}
startMemoryDB().catch(err => console.log('Memory DB error:', err));

// Routes (you’ll create these next)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/trash', require('./routes/trash'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));