import { IncomingMessage, ServerResponse } from "http";
import { addSong, getSongs } from "../controllers/songs";

const songsRoute = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/songs") && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const songData = JSON.parse(body);
        const newSong = addSong(songData);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newSong));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid request or server error" }));
      }
    });
  } else if (req.url?.startsWith("/songs") && req.method === "GET") {
    try {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(getSongs()));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid request or server error" }));
    }
  } 
};

export default songsRoute;
