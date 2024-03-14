import { IncomingMessage, ServerResponse } from "http";
import { IInputProps } from "../core/interfaces/input.interface";
import { ITreeUsecase } from "../core/interfaces/tree-usecase.interface";

export class TreeController {
  private headers = { "Content-Type": "application/json" };

  constructor(private treeUsecase: ITreeUsecase) {}

  handler(req: IncomingMessage, res: ServerResponse) {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        const input: IInputProps[] = JSON.parse(data);
        const output = this.treeUsecase.execute(input);
        res.writeHead(201, this.headers);
        res.end(JSON.stringify(output));
      } catch (error: any) {
        res.writeHead(400, this.headers);
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  }
}
