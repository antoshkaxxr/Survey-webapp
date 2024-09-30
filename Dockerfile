FROM node:14


WORKDIR /app

COPY ["package.json", "package-lock.json", "yarn.lock", "tsconfig.json", "./"]
RUN yarn install

COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# docker build .
# docker run -p 3000:3000  <id>
# http://localhost:8000/