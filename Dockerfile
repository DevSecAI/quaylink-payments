# QUAY-IAC-006: uses :latest tag, runs as root, no HEALTHCHECK.
FROM node:latest

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY src/ ./src/

EXPOSE 3000
CMD ["node", "src/server.js"]
