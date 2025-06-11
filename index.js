const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const sistem = require('./routes/data');

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('public/images'));
app.use('/api', sistem);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
