const { client, ObjectId } = require('../db/mongodb');

const getAll = async (req, res) => {
    const db = client.db('people'); // Database name
  const collection = db.collection('contacts'); // Collection name

    try {
        const contacts = await collection.find({}).toArray();
        res.json(contacts);
    } catch (error) {
        console.error('Error retrieving contacts:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getSingle = async (req, res) => {
    const db = client.db('people'); // Database name
    const collection = db.collection('contacts'); // Collection name

    const contactId = req.params.id;

    try {
        const contact = await collection.findOne({ _id: new ObjectId(contactId) })
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).send('Contact not found');
        }
        } catch (error) {
        console.error('Error retrieving contact:', error);
        res.status(500).send('Internal Server Error');
        }
}

module.exports = { getAll, getSingle }