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

# Streams

node.js streams allow use to handle large data efficiently. streams pass data in chunks so it can be processed as it come, instead of loading complete data in memory then processing it. Node.JS has first class support for streams.

NOTE:- every stream class is inherited from Events class.

- express request and response object are also streams object, readable and writable streams respectively.

## streams are mainly of 4 types

1. readable streams
2. writeable streams
3. duplex stream
4. transform stream

### readable streams

Creating a custom readable stream in Node.js involves calling Readable Class from the stream module and implementing the \_read method. The \_read method is responsible for producing data to be read from the stream.

node has several builtin streams of all kind.

```diff

+ import { Readable } from "stream";


+ const customReadStream = new Readable({
+   read: function() {
+     this.push("1");
+     this.push("2");
+     this.push("3");
+     this.push("4");
+     this.push(null); // sending null will end the stream.
+   },
+ });

+ customReadStream.on("data", (chunk) => {
+   console.log({ chunk: chunk.toString() });
+ });

+ customReadStream.on('end',() =>{
+ 	console.log("end")
+ })


```

### writable streams

Creating a custom writable stream in Node.js involves calling the Writable class from the stream module and implementing the write method. The write method is responsible for processing and handling incoming data.

```diff

+ import {  Writable } from "stream";

+ const customWritableStream = new Writable({
+   write(chunk, encoding, callback) {
+     console.log({ chunk: chunk.toString(), encoding });
+     callback();
+ //  Call the callback to signal that processing is complete. pass error if something went wrong.
+   },
+ });


+ customWritableStream.write("1",(er) =>{
  // handle error here
});
+ customWritableStream.write("2");
+ customWritableStream.write("3");
+ customWritableStream.write("4");

```

### transform streams

Creating a custom transform stream in Node.js involves calling the Transform class from the stream module and implementing the transform method. The transform method is responsible for modifying or transforming the incoming data.

```diff

+ import { Transform  } from "stream";

+ const upperCase = new Transform({
+ 	transform(chunk, encoding, callback) {
+ 		let upperCase = chunk.toString().toUpperCase();
+ 	  callback(null,upperCase)
+ 	},
+ })


+ upperCase.write('hello')
+ upperCase.write('world')

+ upperCase.on('data',(chunk) =>{
+ 	console.log({data: chunk.toString()})
+ })

```

Fun Fact:- transform is duplex stream.

### duplex stream

Creating a custom duplex stream involves extending the Duplex class from the stream module and implementing both the \_read and \_write methods. The \_read method is responsible for producing data to be read, and the \_write method is responsible for processing incoming data.

```diff

+ class Throttle extends Duplex {
+   delay: number;
+   constructor(ms: number) {
+     super();
+     this.delay = ms;
+   }
+   _read(size: number): void {
+   }


+   _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
+     this.push(chunk);
+     setTimeout(() => {
+       callback(null);
+     }, this.delay);
+   }
+
+ }
```

above is a duplex stream that throttle the read's by calling the callback(that single for work complete) after specified delay in \_write method.

helpful tip -> use pipe method when transfer data from read stream to write stream/transfer stream/duplex stream.

```diff
readStream.pipe(write/transfer/duplex Stream/)
```

example of pipe is below

```diff
 customReadStream.pipe(myThrottle).pipe(customWritableStream)
```

below are some helpful streams

- createReadStream from fs module to read file content from disk.
- createWriteStream from fs module to write data into file.

# Buffer

Buffer is a impotent part of nodeJS and it allow nodejs to handle RAW binary data efficiently.
Binary data refers to data that consists of binary values, as opposed to text data, which consists of characters and symbols. Examples of binary data include images, audio and video files, and raw data from a network.

Why is this important? The reason is that when you work with binary data, you often need to manipulate it in-memory, which can be difficult and inefficient using JavaScript’s standard data structures. For example, you might need to concatenate two binary data streams, slice a large binary file into smaller pieces, or encode and decode binary data into different character encodings. This is where Buffers come in: they provide a fast and efficient way to store and manipulate binary data in Node.js.

to store data in buffer we first need to create a Buffer Object using the Buffer constructor.
if we might create a buffer of fixed size (bytes) like this. and it will have the default value 0 for every byte,
to fill the buffer with different value use second argument of alloc function and pass the default value.

```
const myBuffer = Buffer.alloc(100);
```

we can also create the buffer from existing data like this.

```
const myBuffer = Buffer.from('Hello, world!');
```

Once we have a Buffer, we can use its various methods to manipulate the binary data it contains. For example, we might use the “slice” method to extract a portion of the binary data:

```
const slice = myBuffer.slice(0, 5);
console.log(slice.toString()); // Output: "Hello"
```

We can also use the “concat” method to concatenate two or more Buffers instances and get a new Buffer with concatenated data.

```
const firstBuffer = Buffer.from('Hello, ');
const secondBuffer = Buffer.from('world!');
const combinedBuffer = Buffer.concat([firstBuffer, secondBuffer]);
console.log(combinedBuffer.toString()); // Output: "Hello, world!"
```

Note - the data we get in streams as chunks is also a buffer.

## Web Sockets

Web sockets allow us to create bidirectional full duplex connection using that we can send from any end of the connection to the other end anytime and any amount of data.

below show the difference between http and websocket. in http/https the client always have to ask for the information then server send the data and close the connection. but in case of websocket once the connection is made the server can send data to client without any problem and client can ask for data as many time as it want without creating a new connection.

<img src='https://miro.medium.com/v2/resize:fit:640/format:webp/1*9OAhDpzdgtOzlr-tr1sqkg.png'>

in node.js we can use socket.io to make web-socket setup easy.

## cron jobs

cron jobs are those jobs that are going to run in future at specified time after a regular interval. like some task is going to be run on every month's 1st.

to create in nodejs we can use a module called "node-cron" below is the syntax for create a cron job that is going to run on every month's 1st at 1 pm.

```diff

+ const cron = require('node-cron');

+ cron.schedule('00 13 1 * *', () => {
+   console.log('running a task every minute');
+ });

```
