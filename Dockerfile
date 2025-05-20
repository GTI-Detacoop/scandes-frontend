FROM node:23-slim


WORKDIR /app

COPY package*.json ./


RUN rm -rf node_modules
RUN npm install

EXPOSE 80

CMD ["npm", "run", "dev", "--", "--port", "80", "--host", "0.0.0.0"]
