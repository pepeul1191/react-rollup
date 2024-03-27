// Importación de módulos
import demoSocket from '../api/sockets/demo_socket';

// Array para almacenar clientes
const clients = [];

// Función para enviar un mensaje a todos los clientes conectados
const broadcast = (message) => {
  console.log(message);
  clients.forEach(client => {
    client.send(message);
  });
};

// Función para agregar un cliente al array
const pushClient = (ws) => {
  clients.push(ws);
};

// Función para eliminar un cliente del array
const removeClient = (ws) => {
  clients.splice(clients.indexOf(ws), 1);
};

// Exportación del middleware
export default (app) => {  
  // Configuración de sockets
  demoSocket('/ws', app, pushClient, removeClient, broadcast);
};
