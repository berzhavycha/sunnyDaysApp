FROM node:21.6.2-alpine3.18 AS base
WORKDIR /home/node
USER node
COPY --chown=node:node package*.json ./
RUN npm install 
COPY --chown=node:node . .
EXPOSE 3000

FROM base as development
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

FROM base as production
ENV NODE_ENV=production
# During the build we have to resolve path alias and for that we need typescript which is a devDependency
RUN npm run build
# We run `npm ci` to ensure that the node_modules directory is as optimized as possible
RUN npm ci --omit=dev --omit=optional && npm cache clean --force
CMD ["npm", "start"]
