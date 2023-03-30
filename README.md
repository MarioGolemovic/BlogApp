## Project Setup

```sh
npm install
```

### Local database

#### Start local database

```sh
docker-compose -f local_database.yaml up -d
```

#### Stop local database
```sh
docker-compose -f local_database.yaml down
```

### Compile and Hot-Reload for Development

```sh
npm run start
```
