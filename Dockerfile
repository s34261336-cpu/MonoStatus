FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json ./package.json
RUN npm install --omit=dev --ignore-scripts --package-lock=false

COPY index.js ./index.js

CMD ["node", "index.js"]
