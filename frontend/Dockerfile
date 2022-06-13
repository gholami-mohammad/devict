FROM node:latest as builder
WORKDIR /build
COPY ./ /build/
RUN npm install

FROM nginx:latest
COPY --from=builder /build/dist/phrase-book/ /usr/share/nginx/html
EXPOSE 80
