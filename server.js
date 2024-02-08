const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080; // Permitir que a porta seja configurada pelo ambiente

// Servir os arquivos estáticos da build do React
app.use(express.static(path.join(__dirname, 'build')));

// Redirecionar todas as solicitações para o index.html
// para permitir que o roteamento do lado do cliente funcione
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});