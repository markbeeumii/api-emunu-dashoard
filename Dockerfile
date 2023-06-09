FROM node:16.14.0

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
RUN npm install
RUN yarn upgrade
COPY . .
RUN yarn prisma generate
RUN yarn build


EXPOSE 80
CMD [ "yarn", "start" ]