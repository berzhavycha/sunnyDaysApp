FROM node:21.6.2-alpine3.18 AS base
WORKDIR /home/node
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
EXPOSE 4000
USER node

FROM base AS development
RUN npm install

FROM base AS production
COPY --chown=node:node --from=development /home/node/node_modules ./node_modules
RUN npm run build
RUN npm ci --omit=dev --omit=optional && npm cache clean --force
