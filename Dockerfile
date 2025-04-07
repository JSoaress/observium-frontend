# Usar a imagem oficial do Node.js como base
FROM node:20-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /code

# Copiar package.json e yarn.lock para instalar as dependências
COPY package.json yarn.lock ./

# Instalar as dependências
RUN yarn install

# Copiar todo o código da aplicação
COPY . .

# Definir a variável de ambiente para o modo de produção
# ENV NODE_ENV=production

# Construir a aplicação Next.js
# RUN yarn build

# Expor a porta que o Next.js usa (padrão 3000)
# EXPOSE 3000

# Comando para iniciar o servidor Next.js
# CMD ["yarn", "start"]
