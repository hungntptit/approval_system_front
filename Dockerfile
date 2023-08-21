FROM node:18-alpine

WORKDIR /app

COPY package.json .

#COPY .env /app/

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--" ,"--host", "0.0.0.0"]

