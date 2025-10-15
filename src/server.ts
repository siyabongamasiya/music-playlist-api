import http, { IncomingMessage, ServerResponse } from "http";
import songsRoute from "./routes/songs";

const port = 3000;

const requestListerner = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/songs")) {
    songsRoute(req, res);
    return;
  }else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
};

const server = http.createServer(requestListerner);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
