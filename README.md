# Helper Hive

## Description

Helper Hive is a platform connecting organizations and volunteers, facilitating
the process of volunteering. Organizations can post events and volunteers can
register and track their volunteer hours. Visit the website at [helperhive.ca](https://helperhive.ca).

## Development Setup

### Prerequisites

-   Node.js
-   npm
-   Docker

### Installation

1. Clone the repository
2. Run `npm install` in the client and server directories
3. Create `.env` files in the client and server directories

.env (client)

```
PUBLIC_SERVER_HOST="http://localhost:4000"
PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY"
PUBLIC_SERVER_DOMAIN="localhost:4000"
```

.env (server)

```
MONGO_DB_URI="mongodb://localhost:27017/HelperHive"

ACCESS_CODE_SECRET="YOUR_ACCESS_CODE_SECRET"
REFRESH_CODE_SECRET="YOUR_REFRESH_CODE_SECRET"
ACCOUNT_CONFIRMATION_SECRET="YOUR_ACCOUNT_CONFIRMATION_SECRET"

CLIENT_URL="http://localhost:5173"
DOMAIN="localhost:5173"

AWS_REGION="YOUR_AWS_REGION"
AWS_BUCKET_NAME="YOUR_AWS_BUCKET"
AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID"
AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET"

(optional for development)
SMTP_HOST="YOUR_SMTP_HOST"
SMTP_USER="YOUR_SMTP_USER"
SMTP_PASS="YOUR_SMTP_PASS"
```

4. Run `npm run dev` in the client directory to start the client

5. Run `npm run watch` in the server directory to build the server

6. Run `npm run dev` in the server directory to start the server

Additionally, you can run `docker compose build -t "helper-hive-server" ." in the 
root directory  to build the server image and then run `docker compose up` to start
the server.
