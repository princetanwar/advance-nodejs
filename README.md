# Streams

node.js streams allow use to handle large data efficiently. streams pass data in chunks so it can be processed as it come, instead of loading complete data in memory then processing it. Node.JS has first class support for streams.

NOTE:- every stream class is inherited from Events class.

* express request and response object are also streams object, readable and writable streams respectively.

## streams are mainly of 4 types
  1. readable streams
  2. writeable streams
  3. duplex stream
  4. transform stream

### readable streams


Creating a custom readable stream in Node.js involves calling Readable Class  from the stream module and implementing the _read method. The _read method is responsible for producing data to be read from the stream.

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
