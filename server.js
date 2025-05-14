const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Mapeo de tipos MIME
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

// Crear servidor HTTP
const server = http.createServer((req, res) => {
    console.log(`Solicitud recibida: ${req.url}`);
    
    // Normalizar la URL
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Obtener la extensión del archivo
    const extname = path.extname(filePath);
    let contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Leer el archivo
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Archivo no encontrado
                fs.readFile('./404.html', (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // Error del servidor
                res.writeHead(500);
                res.end(`Error del servidor: ${error.code}`);
            }
        } else {
            // Archivo encontrado, enviar contenido
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
    console.log('Presiona Ctrl+C para detener el servidor');
}); 