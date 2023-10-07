document.addEventListener('DOMContentLoaded', async function() {
    const getContact = document.querySelector('.getContact');
    const postContact = document.querySelector('.createContact');
    const putContact = document.querySelector('.updateContact');
    const delContact = document.querySelector('.deleteContact');

    // Function to get all contacts
    async function getAllContacts() {
        // Clear the current contact list
        const allContactsDiv = document.querySelector('.getAllContacts');
        allContactsDiv.innerHTML = '';

        try {
            const response = await fetch('https://web-service-86g0.onrender.com/contacts/');
            const data = await response.json();
            // Display the data on the page (you can customize this part)
            const resultDiv = document.querySelector('.getAllContacts');
            // Iterate through each contact and create a card
            data.forEach(contact => {
                const card = document.createElement('div');
                card.classList.add('contactCard');

                card.innerHTML = `
                    <h3>${contact.firstName} ${contact.lastName}</h3>
                    <p>ID: ${contact._id}</p>
                    <p>Email: ${contact.email}</p>
                    <p>Favorite Color: ${contact.favoriteColor}</p>
                    <p>Birthday: ${contact.birthday}</p>
                `;

                resultDiv.appendChild(card);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to get a specific contact
    async function getContactById() {
        const id = document.getElementById('getContactId').value;

        try {
            const response = await fetch(`https://web-service-86g0.onrender.com/contacts/${id}`);
            const data = await response.json();
            console.log(data);

            const resultDiv = document.querySelector('.getContactResult');
            resultDiv.innerHTML = `
                <div class="contactCard">
                    <h3>${data.firstName} ${data.lastName}</h3>
                    <p>ID: ${data._id}</p>
                    <p>Email: ${data.email}</p>
                    <p>Favorite Color: ${data.favoriteColor}</p>
                    <p>Birthday: ${data.birthday}</p>
                </div>
            `;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to create a new contact
    async function createContact() {
        const firstName = document.getElementById('createFirstName').value;
        const lastName = document.getElementById('createLastName').value;
        const email = document.getElementById('createEmail').value;
        const favoriteColor = document.getElementById('createFavoriteColor').value;
        const birthday = document.getElementById('createBirthday').value;

        const contactData = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        try {
            const response = await fetch('https://web-service-86g0.onrender.com/contacts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });
            const data = await response.json();
            console.log(data);

            const resultDiv = document.querySelector('.createContactResult');
            resultDiv.innerHTML = `<pre>Contact Created Successfully</pre>`;

            await getAllContacts();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to update a contact
    async function updateContact() {
        const id = document.getElementById('updateContactId').value;

        const firstName = document.getElementById('updateFirstName').value;
        const lastName = document.getElementById('updateLastName').value;
        const email = document.getElementById('updateEmail').value;
        const favoriteColor = document.getElementById('updateFavoriteColor').value;
        const birthday = document.getElementById('updateBirthday').value;

        const contactData = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        try {
            const response = await fetch(`https://web-service-86g0.onrender.com/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            // Check if the response status is okay (2xx range)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const resultDiv = document.querySelector('.updateContactResult');
            resultDiv.innerHTML = `<pre>Contact Updated Successfully</pre>`;
    
            await getAllContacts();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to delete a contact
    async function deleteContact() {
        const id = document.getElementById('deleteContactId').value;

        try {
            const response = await fetch(`https://web-service-86g0.onrender.com/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    'apiKey': 'YOUR_API_KEY_HERE'
                }
            });
            const data = await response.json();
            console.log(data);

            const resultDiv = document.querySelector('.deleteContactResult');
            resultDiv.innerHTML = `<pre>Contact Deleted Successfully</pre>`;
            await getAllContacts();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    await getAllContacts();
    getContact.addEventListener('click', getContactById);
    postContact.addEventListener('click', createContact);
    putContact.addEventListener('click', updateContact);
    delContact.addEventListener('click', deleteContact);
});