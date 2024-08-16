
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

EXPOSE 1337

CMD ["node", "app.js"]
