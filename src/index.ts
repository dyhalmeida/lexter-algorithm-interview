import { createServer } from "http";

import { TreeUsecase } from "./usecase/tree-usecase";
import { TreeController } from "./controller/tree-controller";

const treeUsecase = new TreeUsecase();
const treeController = new TreeController(treeUsecase);

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Lexter Algorithm Test Interview" }));
  } else if (req.method === "POST" && req.url === "/tree") {
    treeController.handler(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
