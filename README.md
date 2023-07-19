This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## Testing

run `npm run e2etest` after `npm install` for running e2e testing suites for cypress
There are currently bunch of tutorial tests I haven't deleted yet but they should be 
gone soon

## Images

This app uses S3 to store image assets, run `npm run uploadImages` to sync the `post-images` directory
with s3 bucket

## Docker 

Run nextjs blog only

```
docker build -t fredtsui:njs-blog .

docker run -p 3000:3000 fredtsui:njs-blog
```

run with postgres 

```
docker network create blog-app

# run database
docker run -d --network blog-app --network-alias pgdb -v blog-app-data:/var/lib/postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=comments postgres:latest

# run frontend
docker run -db 3000:3000 --network blog-app -e PG_HOST=pgdb fredtsui:njs-blog

```

