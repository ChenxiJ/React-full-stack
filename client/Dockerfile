FROM node:13.6
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
EXPOSE 3000
RUN yarn
CMD ["yarn", "start"]