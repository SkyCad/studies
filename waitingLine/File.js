import Client from './Client.js';

export default class File {
    constructor() {
        this.clients = [];
    }

    // Method to add a client to the list
    addClient(client) {
        this.clients.push(client);
    }

    // Method to get the list of clients
    getClients() {
        return this.clients;
    }

    // Method to render the list of clients
    renderClients() {
        const clientsList = document.getElementById('clientsList');
        clientsList.innerHTML = '';

        this.clients.forEach((client, index) => {
            const clientElement = document.createElement('li');
            clientElement.textContent = `${client.firstname} ${client.name} - ${client.service} - ${client.EstimatedTime} - ${client.priority}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('RemoveButton');
            removeButton.addEventListener('click', () => {
                this.removeClient(index);
                this.renderClients(); // Re-render the list after removal
            });

            clientElement.appendChild(removeButton);
            clientsList.appendChild(clientElement);
        });
    }

    // Method to remove a client by index
    removeClient(index) {
        this.clients.splice(index, 1);
    }


    // Method to serve a client
    serveClient() {
        // Find the first client with priority 'Prioritaire'
        const priorityIndex = this.clients.findIndex(client => client.priority === 'Prioritaire');
        
        // If a priority client is found, remove and return it
        if (priorityIndex !== -1) {
            return this.clients.splice(priorityIndex, 1)[0];
        }

        // Otherwise, remove and return the first client in the list
        return this.clients.shift();
    }

    // Method to sort the list of clients by service

    sortClientsByService() {
        this.clients.sort((client1, client2) => {
            if (client1.service < client2.service) {
                return -1;
            }
            if (client1.service > client2.service) {
                return 1;
            }
            return 0;
        });
        this.renderClients(); // Re-render the list after sorting
    }
}