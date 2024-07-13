FROM node:20 AS Dependencies
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=Dependencies ./app ./
EXPOSE 5000
CMD ["node","server.js"]