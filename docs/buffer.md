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
