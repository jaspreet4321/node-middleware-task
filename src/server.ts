import server from './app';

const port = 3000;
server.listen(port, () => {
    console.log('Server listening at: ' + port);
}); 