## Web Sockets

Web sockets allow us to create bidirectional full duplex connection using that we can send from any end of the connection to the other end anytime and any amount of data.

below show the difference between http and websocket. in http/https the client always have to ask for the information then server send the data and close the connection. but in case of websocket once the connection is made the server can send data to client without any problem and client can ask for data as many time as it want without creating a new connection.

<img src='https://miro.medium.com/v2/resize:fit:640/format:webp/1*9OAhDpzdgtOzlr-tr1sqkg.png'>

in node.js we can use socket.io to make web-socket setup easy.
