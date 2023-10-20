# fom-web-dev-project
 
## Setup (Local)
    1. Clone the repository
    2. Setup environment variables according to .env.example
    3. Run `npm install` in ./ to install server dependencies
    4. Run `npx prisma generate` and `npx prisma db push`. Make sure to setup your postgres user correct. If postgres is installed on your local machine use `localhost` instead of your ip
    5. cd into ./client and run `npm install` to install client dependencies
    6. cd back into ./ and run `npm run prod` to start the server and client concurrently

## Setup (ngrok)
    1. ngrok http --domain=foo.example.com YOUR_PORT
    