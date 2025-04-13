FROM node:lts-slim AS builder
WORKDIR /home/app
COPY . .
RUN yarn
EXPOSE 6500
EXPOSE 27018


FROM builder AS final
WORKDIR /home/app

RUN yarn build
CMD ["yarn", "start"]
