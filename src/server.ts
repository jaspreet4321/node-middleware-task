import server from './app';

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log('Server listening at: ' + port);
}); 