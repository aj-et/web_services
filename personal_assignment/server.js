const express = require('express');
const mongodb = require('./db/mongodb');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // This will handle JSON requests

app.use('/', require('./routes/index'))
app.use('/contacts', require('./routes/contacts'));

mongodb.run()

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});