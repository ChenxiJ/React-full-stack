FROM node:13.6
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
EXPOSE 8888
RUN yarn
CMD ["node", "server.js"]