FROM node:21-slim

RUN mkdir /app && chown node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install
COPY --chown=node:node . .


CMD npm run dev