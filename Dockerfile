FROM node:20-alpine

WORKDIR /usr/src/app

COPY bothost/package.json ./package.json
RUN npm install --omit=dev

COPY bothost/index.js ./index.js

CMD ["node", "index.js"]
