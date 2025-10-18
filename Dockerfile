# Build Image
FROM node:lts-alpine AS build

RUN apk add --no-cache git

ENV NODE_ENV=build

USER node
WORKDIR /home/node

COPY --chown=node:node package.json ./
RUN npm install

COPY --chown=node:node ./public ./public
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./tsconfig.json ./tsconfig.json
COPY --chown=node:node ./tsconfig.app.json ./tsconfig.app.json
COPY --chown=node:node ./angular.json ./angular.json
RUN npm run build && \
    npm prune --production

# Run Image
FROM nginx:stable-alpine

COPY ./.nginx.conf /etc/nginx/nginx.conf
COPY --from=build /home/node/dist/cloud-storage-app/browser /usr/share/nginx/html
