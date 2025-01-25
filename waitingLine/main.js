import Client from './Client.js';
import File from './File.js';

const file = new File();

document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('nameInput').value;
    const firstname = document.getElementById('firstnameInput').value;
    const service = document.getElementById('serviceInput').value;
    const estimatedTime = document.getElementById('estimatedTimeInput').value;
    const priority = document.getElementById('priorityInput').value;

    const client = new Client(name, firstname, service, estimatedTime, priority);
    file.addClient(client); // Add the client to the list
    file.renderClients(); // Render the updated list of clients
    file.sortClientsByService(); // Sort the list of clients by service
});

document.getElementById('serveClientButton').addEventListener('click', function() {
    const servedClient = file.serveClient();
    if (servedClient) {
        const message = `${servedClient.firstname} ${servedClient.name} (Service: ${servedClient.service}) a été servi.`;
        alert(message); // Display the message
    }
    file.renderClients(); // Render the updated list of clients after serving one
});