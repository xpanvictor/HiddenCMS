FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . ./

ENV PORT 4015

EXPOSE $PORT

#USER node

CMD ["npm", "run", "dev"]