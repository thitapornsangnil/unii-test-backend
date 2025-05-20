const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();
const port = 3001;


// Middleware
app.use(bodyParser.json());  
app.use(cors());
app.use('', routes); 

app.get('/', (req, res) => {
  res.send('Hello Unii!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});