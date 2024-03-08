## Run Locally

Clone the project

```bash
  git clone https://github.com/princetanwar/advance-nodejs.git
```

Go to the project directory

```bash
  cd advance-nodejs
```

Install dependencies

```bash
  npm install
```

Create Mock data for services.

```bash
  npm run create-mock
```

Start the dev server

```bash
  npm run dev
```

## Routes Reference

#### Get A Big file using streams

```http
  GET /streams/stream-big-file
```

#### Get A Big file using callback

```http
  GET /streams/big-file
```

Note: non-blocking but load complete file in memory before sending to client.

#### Get A File using streams and transform

```http
  GET /streams/stream-big-file-uppercase
```

return a big file using stream and transform to send manipulated content without writing to the disk.

#### Chat with other websocket client

```http
  GET /websocket/chat
```

send messages and receive message from other connected websocket client.

## <a href='/docs/streams.md'>Streams </a>

## <a href='/docs/buffer.md'>Buffer </a>

## <a href="/docs/web-sockets.md">Web Sockets </a>

## <a href="/docs/cron-jobs.md">cron jobs </a>

## <a href="/docs/reactor-pattern.md">Reactor Pattern </a>

## <a href="/docs/normalization-in-database.md">Normalization in DataBase </a>

## <a href="/docs/micro-services.md">Micro-Services </a>

## <a href="/docs/Git_notes.md">Git Tips/notes<a>
