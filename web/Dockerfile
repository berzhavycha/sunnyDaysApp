FROM node:21.6.2-alpine3.18 AS base
WORKDIR /home/node
USER node
COPY --chown=node:node package*.json ./
RUN npm install 
COPY --chown=node:node . .
EXPOSE 3000

FROM base as development
CMD ["npm", "run", "dev"]

FROM base as production
RUN npm run build
RUN npm ci --omit=dev --omit=optional && npm cache clean --force
CMD ["npm", "start"]
