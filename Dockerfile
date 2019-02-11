FROM node:carbon

WORKDIR /tinver-app

COPY dist ./dist
COPY node_modules node_modules

ENTRYPOINT ["node", "dist/index.js"]
