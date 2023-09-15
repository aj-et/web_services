//Import the http module
const http = require('http')

// Create server
const server = http.createServer((req, res) => {
    // Send the response
    res.write("Naomi Tumbokon")
    res.end();
})

// Server listening to port 3000
server.listen((3000), () => {
    console.log('Server is running');
})