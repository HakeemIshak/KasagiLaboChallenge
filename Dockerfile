FROM denoland/deno:2.1.7

WORKDIR /app

USER root

COPY . .

CMD [ "deno", "--allow-write", "--allow-read", "b.ts" ]
