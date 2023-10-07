const { client, ObjectId } = require('../db/mongodb');

const db = client.db('people'); // Database name
const collection = db.collection('contacts'); // Collection name

const getAll = async (req, res) => {
    console.log(req.header('apiKey'));
    try {
        const contacts = await collection.find({}).toArray();
        res.json(contacts);
    } catch (error) {
        console.error('Error retrieving contacts:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getSingle = async (req, res) => {
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

const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    try {
        const result = await collection.insertOne(contact);
        if (result) {
            res.status(201).json({ message: 'Contact created successfully' });
        } else {
            res.status(500).send('Error creating contact');
        }
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ message: 'Error creating contact', error: error.message });
    }
}

const updateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id); // Assuming the contact ID is passed in the URL
    
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    try {
        const result = await collection.replaceOne(
            { _id: contactId }, contact
        );

        if (result) {
            res.status(204).header({ 'Custom-Message': 'Contact updated successfully' }).send();
        } else {
            res.status(404).send('Contact not found');
        }
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

const deleteContact = async (req, res) => {
    const contactId = req.params.id; // Assuming the contact ID is passed in the URL

    try {
        const result = await collection.deleteOne({ _id: new ObjectId(contactId) });
        if (result) {
            res.status(200).json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).send('Contact not found');
        }
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact }