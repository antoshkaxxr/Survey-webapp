FROM node:14


WORKDIR /app

COPY ["package.json", "package-lock.json", "yarn.lock", "tsconfig.json", "./"]
RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# docker build .
# docker run -p 8000:3000  <id>
# http://localhost:8000/