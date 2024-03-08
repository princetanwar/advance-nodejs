## Inspecting Node.js Applications with `--inspect`

#### Introduction

When developing Node.js applications, it's crucial to have robust debugging and inspection capabilities to identify issues, optimize performance, and diagnose memory-related problems. Node.js provides a built-in inspector tool that allows developers to inspect and debug their applications using a web-based interface.

- Enabling Debugging with --inspect

  To enable debugging in a Node.js application, simply start the application with the --inspect flag. This flag instructs Node.js to start the inspector agent, allowing you to connect and debug the application using a debugger client. This command starts the application and listens for debugger connections on the default address and port (127.0.0.1:9229).

  ```
  node --inspect index.js
  ```

#### Using Chrome DevTools

Once the application is running with the --inspect flag, you can connect to it using Chrome DevTools or any other debugger client that supports the Chrome DevTools Protocol example vscode.

1. Open Google Chrome or Chromium.
2. Navigate to `chrome://inspect` in the address bar.
3. Under the "Remote Target" section, you should see your Node.js application listed.
4. Click "Inspect" to open the DevTools window for your application. then you can start your debugging

#### Using Chrome DevTool inside VsCode

create a file named `launch.json` inside the .vscode folder at the project root.

```diff
+ {
+   "version": "0.2.0",
+   "configurations": [
+     {
+       "type": "node",
+       "request": "launch",
+       "name": "Launch Program",
+       "skipFiles": ["<node_internals>/**"],
+       "program": "${workspaceFolder}\\entry-file-name.js"
+     }
+   ]
+ }
```

Note - change the entry-file-name.js to the main program file/entry point file name. works only with .js files. if you have a typescript project then you can use the npm script debugging mode like below

```diff
+ {
+   "version": "0.2.0",
+   "configurations": [
+     {
+       "type": "node",
+       "request": "launch",
+       "name": "Debug NPM Script",
+       "runtimeExecutable": "npm",
+       "runtimeArgs": ["run-script", "dev"] // second augment is the script name
+     },
+
+   ]
+ }

```

you can have multiple object inside the array to create multiple debugging script.

#### attach vscode debugger to a running nodejs process with inspect

create the add/update the config in `launch.json` file

```diff
+  {
+      "name": "Attach",
+      "port": 9229,
+      "request": "attach",
+      "skipFiles": ["<node_internals>/**"],
+      "type": "node"
+    },

```

#### programmatic cpu profiling

we can use `console.profile()` to start collecting the data for cpu profiling and `console.profileEnd()` to end collecting data for cpu profiling. we must have a debugger attached to the process to collect and show the data. it can be a chrome based debugger or vs-code.

#### memory profiling

we can use the chrome's memory profiler to profile memory consumption of the node.js application

#### Memory leaks in Node.js applications can occur due to various reasons. Some common problems that cause memory leaks include:

1. Unclosed Resources:

- Failure to close resources such as database connections, file descriptors, or network sockets can lead to memory leaks. When resources are not properly closed after use, they remain in memory, gradually consuming more memory over time.

```
// Example of not closing a database connection properly
const mysql = require('mysql');

function fetchDataFromDatabase() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydatabase'
    });

    connection.connect();

    connection.query('SELECT * FROM mytable', (error, results, fields) => {
        if (error) throw error;
        console.log(results);
    });

    // Connection is not closed properly
    // connection.end(); // This line should be uncommented to properly close the connection
}

fetchDataFromDatabase();

```

2. Cyclic References:

- Circular references between objects can prevent them from being garbage collected even when they are no longer needed. This often happens when objects reference each other in a loop, creating a cycle that prevents the garbage collector from reclaiming memory.

```
// Example of cyclic references causing memory leak
let obj1 = {};
let obj2 = {};

obj1.ref = obj2;
obj2.ref = obj1;

// Both obj1 and obj2 hold references to each other,
// preventing them from being garbage collected

```

3. Global Variables:

- Global variables in Node.js applications can cause memory leaks if they hold references to large objects or data structures. Since global variables persist throughout the lifetime of the application, any objects they reference will also remain in memory until the application exits.

```
// Example of global variable causing memory leak
let globalVariable = [];

function addToGlobalVariable() {
    globalVariable.push(new Array(1000000).fill('some data')); // Pushing a large array to global variable
}

addToGlobalVariable();


```

4. Event Listeners:

- Failure to remove event listeners when they are no longer needed can lead to memory leaks. Event listeners that are not properly removed continue to hold references to objects, preventing them from being garbage collected.

```
// Example of event listener causing memory leak
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

function eventHandler() {
    console.log('Event handled');
}

myEmitter.on('myEvent', eventHandler); // Adding event listener

// Forgetting to remove event listener
// myEmitter.removeListener('myEvent', eventHandler);

```

5. Memory Intensive Operations:

- Performing memory-intensive operations such as large data processing or recursive functions without proper memory management can lead to memory leaks. If memory is not released after these operations complete, it can accumulate over time and cause the application to run out of memory.

```
// Example of memory intensive operation causing memory leak
let data = [];

function processLargeData() {
    for (let i = 0; i < 1000000; i++) {
        data.push(new Array(100).fill('some data')); // Pushing large arrays to data
    }
}

processLargeData();


```

6. External Dependencies:

- External dependencies or modules used in Node.js applications may have memory leak issues of their own. It's important to stay updated with the latest versions of dependencies and monitor their memory usage to avoid potential leaks.

```
// Example of external dependency causing memory leak
const leakyLibrary = require('leaky-library');

// Using a function from the leaky library that has a memory leak issue
leakyLibrary.someLeakyFunction();

```

7. Cache Mismanagement:

- Inefficient caching mechanisms or caching large amounts of data without proper expiration or eviction policies can lead to memory leaks. Stale or unused cached data may accumulate in memory, consuming valuable resources.

```
// Example of inefficient cache management causing memory leak
const cache = {};

function fetchDataFromCache(key) {
    if (cache[key]) {
        return cache[key];
    } else {
        // Fetch data from external source
        const data = fetchDataFromExternalSource(key);
        cache[key] = data; // Adding data to cache without proper expiration or eviction
        return data;
    }
}


```

8. Asynchronous Operations:

- Incorrect handling of asynchronous operations such as callbacks or promises can result in memory leaks. If references to objects are unintentionally retained in closures or callbacks, they may prevent garbage collection even after the operation completes.
