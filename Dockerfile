FROM node:19.0.0-alpine3.16 as builder

COPY . .

RUN npm install\
    && npm install typescript -g

WORKDIR /

RUN npm install

WORKDIR /client

RUN npm install

WORKDIR /

WORKDIR /client

RUN npm run build

WORKDIR /

WORKDIR /server

RUN npx prisma generate
RUN npx prisma db push

WORKDIR /

FROM node:19.0.0-alpine3.16 as runner
ENV ENV=PROD

COPY --from=builder /build /build
COPY --from=builder / /
RUN ls -l
WORKDIR /
EXPOSE 3000
CMD ["npm", "run", "docker"]