FROM node:21.6.2-alpine3.18 AS base
WORKDIR /home/node
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 4000
USER node

FROM base AS development
CMD ["npm", "run", "start:dev"]

FROM base AS production
# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency
RUN npm run build
# We run `npm ci` to ensure that the node_modules directory is as optimized as possible
RUN npm ci --omit=dev --omit=optional && npm cache clean --force
CMD ["node", "dist/main"]
