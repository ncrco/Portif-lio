const chokidar = require('chokidar');

const fileToWatch = 'http://127.0.0.1:5500/portifolio.html';

const watcher = chokidar.watch(fileToWatch);

watcher.on('change', (path) => {
  console.log(`O arquivo ${path} foi modificado.`);
  // Aqui você pode executar as ações desejadas quando o arquivo HTML for modificado
});

console.log(`Monitorando o arquivo HTML: ${fileToWatch}`);

