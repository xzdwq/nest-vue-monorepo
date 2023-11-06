### Installation

- `git clone <url> -b <branch-name>`
- `pnpm i`
- rename `env.example` to `.env` and configure application variables

---

### Development mode
- `pnpm dev`
  - app: `http://localhost:4444`
  - api: `http://localhost:7000`

### Docker
1. `docker build -f docker/development/Dockerfile -t mdm2:latest .`
2. `docker build -f docker/development/Dockerfile.nginx -t mdm2-ui:latest .`
3. `docker run -d -t -i -e DB_HOST='host.docker.internal' -p 7000:7000 --name mdm2 mdm2:latest`
4. `docker run -d -t -i -p 4444:80 --link mdm2 --name mdm2-ui mdm2-ui:latest`
- output: `http://localhost:4444/`

### Docker compose
1. `docker-compose -f docker/development/docker-compose.yml up --build`
- output: `http://localhost:4444`
