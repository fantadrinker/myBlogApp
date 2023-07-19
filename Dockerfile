FROM node:18-alpine

# Create app directory
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev-lite"]

