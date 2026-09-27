FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
