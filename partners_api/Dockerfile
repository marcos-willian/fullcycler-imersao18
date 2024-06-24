FROM node:21-slim
RUN apt update && apt install -y openssl procps
RUN npm install -g @nestjs/cli@10.3.2
USER node
WORKDIR /app
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install
COPY --chown=node:node . .
CMD tail -f  /dev/null