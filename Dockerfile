FROM node:lts-alpine

WORKDIR /app
COPY --chown=1 . /app

EXPOSE 8000
USER 1

CMD yarn install
CMD yarn build
CMD yarn start
