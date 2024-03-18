FROM node:21.6.2-alpine3.18 AS base
USER node
WORKDIR /home/node
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 4000

FROM base AS development
ENV NODE_ENV=development
CMD ["npm", "run", "start:dev"]

FROM base AS production
ENV NODE_ENV=production
# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency
RUN npm run build
# We run `npm ci` to ensure that the node_modules directory is as optimized as possible
RUN npm ci --omit=dev --omit=optional && npm cache clean --force
CMD ["node", "dist/main"]
