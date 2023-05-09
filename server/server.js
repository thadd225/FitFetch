const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
  console.log('hello world');
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT);
});
