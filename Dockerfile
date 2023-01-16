FROM node:19-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# using prisma
COPY prisma ./prisma/

# Install app dependencies
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:19-alpine 

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD [ "npm", "run", "start:prod" ]
