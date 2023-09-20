const express = require('express');
const mongodb = require('./db/mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // This will handle JSON requests

// app.use('/', require('./routes'))
app.use('/contacts', require('./routes/contacts'));

mongodb.run()

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});