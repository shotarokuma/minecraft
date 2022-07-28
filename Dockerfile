FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "server"]