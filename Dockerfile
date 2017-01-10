FROM node:6.9-alpine
ENV WWW_HOME /public
EXPOSE 3000
ADD . ${WWW_HOME}
RUN cd ${WWW_HOME} && \
    npm install -g nrm --registry=https://registry.npm.taobao.org && \
    nrm use taobao && \
    npm install && \
    cd web_content && npm install && \
    npm install webpack -g && \
    webpack && \
    cd .. && \
    npm install pm2 -g
WORKDIR ${WWW_HOME}
CMD ["pm2", "start", "./bin/www", "--no-daemon"]
