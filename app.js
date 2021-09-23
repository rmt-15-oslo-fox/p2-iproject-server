const cors = require('cors')
const express = require('express');
const app = express();
const router = require('./routes/index')
const port = 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded( { extended: false } ))
app.use(router);
app.listen(port, () => {
    console.log(`Listening to Server ${port}`);
})
module.exports = app;