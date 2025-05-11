## Blog Api Setup Guide
This guide covers how to clone, set up, and run the blog API application, both with and without Docker.

### Clone the Repository

```
git clone https://github.com/Iyed73/blog-platform.git
cd blog-platform
```

### Environment Setup
First, you need to set up your env variables:
1. Create `.env` file in the project root, you can copy the `.env-example`
```
cp .env-example .env
```
2. Configure the env variables according to your environment.

  **Note**: When using Docker, the `DATABASE_HOST` should be set to postgres service name in docker-compose: `postgres`

### Running without Docker
1. Install dependencies
```
npm install
```
2. Ensure that your PostgreSQL server is running and that its credentials are updated in `.env` (you can use a local instance or a managed/cloud provider).
3. Run the application
```
npx nx serve blog-api
```
* **GraphQL Playground**: [http://localhost:3000/graphql](http://localhost:3000/graphql) (Available if `GRAPHQL_PLAYGROUND` env variable is set to true)

### Running with Docker
Docker setup makes it easy to run both the application and the database in isolated containers.
1. Build the containers
```
docker compose build
```
2. Start the containers
```
docker compose up -d
```
3. To access logs:
```
docker compose logs -f
```
To access only the api logs:
```
docker compose logs -f blog-api
```

