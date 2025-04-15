FROM node:23-slim

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--port", "3000", "--host", "0.0.0.0"]
