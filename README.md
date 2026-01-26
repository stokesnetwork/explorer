# Stokes Explorer

This is the Stokes Network block explorer UI.

## Status

This project is a work-in-progress while we prepare for mainnet launch.

## Development

Prerequisites:

- Node.js
- A running `stokes-server` instance

Install:

```shell
npm install
```

Configure environment:

- Copy `.env.example` to `.env`
- Update the URLs if your `stokes-server` is not running on `127.0.0.1:8000`

Run:

```shell
npm start
```

### API expectations

The explorer expects:

- REST API at `REACT_APP_API_SERVER` (example: `http://127.0.0.1:8000`)
- Socket.IO at `WS_SERVER` using path `/ws/socket.io`
