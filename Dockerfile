FROM node:18.12.1

WORKDIR /app

COPY ./package.json /app

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]