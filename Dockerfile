FROM node:10.16.2-alpine

# RUN mkdir -p /srv/app/project-management-client
# WORKDIR /srv/app/project-management-client
WORKDIR /app/client

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install

ADD . .

CMD ["npm", "start"]
