FROM node:20

WORKDIR /usr/src/bot

COPY package.json ./

RUN chown -R node:node /usr/src/bot

USER node

RUN npm install

COPY --chown=node:node . .

CMD ["node", "src/index.js"]
