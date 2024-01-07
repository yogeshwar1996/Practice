const http = require("http");

const server = http.createServer((request, response) => {
  console.log("Mehod - URL", request.method, request.url);
  let body = [];
  request.on("data", (chunk) => {
    console.log(chunk.toString());
    body.push(chunk);
  });
  request.on("end", () => {
    body = Buffer.concat(body).toString();
    console.log("Body: ", body);
  });

  response.setHeader("Content-Type", "text/html");
  response.write(
    "<form method='POST' action='/form'><input name='inputValue'><button type='submit'> Submit </button></form>"
  );
  response.end();
});

server.listen(3000);

// Note in form, the method tells HTTP method to use when submitting the form, action tells where to send the request ie API end point
