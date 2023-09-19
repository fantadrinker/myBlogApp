This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## Build

This project uses `yarn` to manage its dependencies.

After cloning this repo, run 

    yarn

to install dependencies, then run
    
    yarn dev-lite

to host the project locally

## Testing

run `yarn e2etest` after `yarn` for running e2e testing suites for cypress
There are currently bunch of tutorial tests I haven't deleted yet but they should be 
gone soon

## Images

This app uses S3 to store image assets, run `yarn uploadImages` to sync the `post-images` directory
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

