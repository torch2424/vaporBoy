FROM arm64v8/node:15-alpine

RUN apk add --no-cache make g++ git python2

WORKDIR /vaporBoy

COPY package.json .

RUN npm install

COPY . .

RUN rm package-lock.json

EXPOSE 80

ENTRYPOINT [ "/vaporBoy/node_modules/.bin/preact", "watch", "--host=0.0.0.0", "--port=80" ]
