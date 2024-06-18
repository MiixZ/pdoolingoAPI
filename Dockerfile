FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y nano vim

COPY . .

EXPOSE 3000

CMD ["npm", "start"]