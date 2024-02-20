const express = require('express');
const app = express();
const PORT = 8080;
const routes = require('./routes/routes');
const cors = require('cors')
const { dbConnection } = require('./config');

dbConnection();

app.use(express.json());
app.use(cors());

app.use('/', routes);


app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))