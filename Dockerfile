FROM node:20

USER node

WORKDIR /home/node/redacted-bot

RUN mkdir -p "/home/node/redacted-bot/data"

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node . .

CMD ["node", "src/index.js"]