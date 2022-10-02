FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . ./

EXPOSE 4015

CMD ["npm", "run", "dev"]