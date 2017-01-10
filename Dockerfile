FROM docker-registry.xwf-id.com/repository/pm2:6.9
ENV WWW_HOME /public
EXPOSE 3000 8088
ADD . ${WWW_HOME}
WORKDIR ${WWW_HOME}
CMD ["sh", "-c", "/node_modules/.bin/pm2 start ./bin/www; /node_modules/.bin/pm2-gui start ${WWW_HOME}/config/pm2-gui.ini; /node_modules/.bin/pm2 logs"]
