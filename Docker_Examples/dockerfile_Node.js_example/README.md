# Sample Node.js application

This repository is a sample Node.js application for Docker's documentation.

To run:

```bash
docker build -t node-app-iamge:latest .
docker run -d -p 3000:3000 --name node-container node-app-iamge:latest
```

To Stop:

```bash
docker stop node-container
docker rm node-container
```