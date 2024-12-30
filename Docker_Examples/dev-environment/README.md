# About the project

This is a development environment for python that contains:

1) Python container with fastapi, pydantic, uvicorn, and redis installed.
2) Redis Container.

To run:

```bash
docker compose up --build  -d
```
Navigate to http://localhost and http://localhost/hits for sample app.

Attach to the container python-server from your IDE (ex. vscode).

To Stop:

```bash
docker compose down
```