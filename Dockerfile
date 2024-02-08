# Especificar a imagem base. Aqui, usamos a versão oficial do Node.js como base.
FROM node:alpine as build-stage

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json (ou yarn.lock se estiver usando Yarn)
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto para o diretório de trabalho no contêiner
COPY . .

# Construir o aplicativo para produção
RUN npm run build

# Etapa para servir o aplicativo usando um servidor HTTP simples
# Nginx é usado aqui como um servidor para servir o conteúdo estático
FROM nginx:alpine as production-stage

# Copiar o conteúdo construído da etapa de build para o diretório de servir do Nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expor a porta 80 para o contêiner poder aceitar conexões HTTP
EXPOSE 80

# Iniciar o Nginx quando o contêiner for iniciado
CMD ["nginx", "-g", "daemon off;"]