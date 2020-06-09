FROM node:10

RUN mkdir -p /usr/src/app 

WORKDIR /usr/src/app 

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8000

CMD ["node", "app.js"]