FROM node:12.14.1-alpine
LABEL maintainer="limin limin.zhang@eveus.com"
ENV WWW_HOME /app
EXPOSE 3000 3000
ADD . ${WWW_HOME}
WORKDIR ${WWW_HOME}
CMD ["node", "./dist/app.js"]
