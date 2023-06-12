const chokidar = require('chokidar');
const htmlhint = require('htmlhint').HTMLHint;
const stylelint = require('stylelint');

const htmlFileToWatch = 'http://127.0.0.1:5500/portifolio.html';
const cssFileToWatch = 'estilo.css';

const watcher = chokidar.watch([htmlFileToWatch, cssFileToWatch]);

// Função para verificar os erros de sintaxe no arquivo HTML
const lintHTML = (filePath) => {
  const htmlContent = fs.readFileSync(filePath, 'utf8');
  const htmlResults = htmlhint.verify(htmlContent);
  if (htmlResults.length > 0) {
    console.log(`Erros de sintaxe no arquivo HTML ${filePath}:`);
    htmlResults.forEach((result) => {
      console.log(`- Linha ${result.line}, coluna ${result.col}: ${result.message}`);
    });
  } else {
    console.log(`Nenhum erro de sintaxe no arquivo HTML ${filePath}.`);
  }
};

// Função para verificar os erros de sintaxe no arquivo CSS
const lintCSS = (filePath) => {
  stylelint
    .lint({
      files: filePath,
      configFile: './node_modules/stylelint-config-recommended'
    })
    .then((result) => {
      if (result.errored) {
        console.log(`Erros de sintaxe no arquivo CSS ${filePath}:`);
        result.results.forEach((fileResult) => {
          fileResult.warnings.forEach((warning) => {
            console.log(`- Linha ${warning.line}, coluna ${warning.column}: ${warning.text}`);
          });
        });
      } else {
        console.log(`Nenhum erro de sintaxe no arquivo CSS ${filePath}.`);
      }
    })
    .catch((error) => {
      console.error(`Erro ao executar o lint do arquivo CSS ${filePath}:`, error);
    });
};

// Monitorar alterações nos arquivos HTML e CSS
watcher.on('change', (filePath) => {
  console.log(`O arquivo ${filePath} foi modificado.`);

  // Verificar erros de sintaxe no arquivo HTML
  if (filePath === htmlFileToWatch) {
    lintHTML(filePath);
  }

   // Verificar erros de sintaxe no arquivo CSS
   if (filePath === cssFileToWatch) {
    lintCSS(filePath);
  }
});

console.log(`Monitorando os arquivos HTML e CSS:`);
console.log(`- HTML: ${htmlFileToWatch}`);
console.log(`- CSS: ${cssFileToWatch}`);