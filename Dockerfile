FROM node:lts-alpine
# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install
USER node
CMD ["node", "server.js"]
EXPOSE 5500
