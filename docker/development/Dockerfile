FROM node:18-alpine AS build-stage

RUN npm i -g pnpm
RUN corepack enable

WORKDIR /mdm2

COPY . .

RUN npm config set @qvt:registry http://repo.qvant.com/repository/npm/
RUN npm config set strict-ssl false
RUN npm config set _auth dGVzdDpMZUZENU1UYm95

RUN : \
  && pnpm fetch \
  && pnpm i -r --offline --frozen-lockfile \
  && pnpm api:build \
  && pnpm app:build \
  && pnpm prune --prod \
  ;

CMD ["pnpm", "api:start:prod"]
EXPOSE 7000
