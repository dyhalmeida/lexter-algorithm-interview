import { IncomingMessage, ServerResponse } from "http";
import { ITreeUsecase } from "../../src/core/interfaces/tree-usecase.interface";
import { IInputProps } from "../../src/core/interfaces/input.interface";
import { TreeController } from "../../src/controller/tree-controller";
import { IOutputProps } from "../../src/core/interfaces/output.interface";

describe("TreeController", () => {
  let mockTreeUsecase: jest.Mocked<ITreeUsecase>;
  let mockReq: Partial<jest.Mocked<IncomingMessage>>;
  let mockRes: Partial<jest.Mocked<ServerResponse>>;

  beforeEach(() => {
    mockTreeUsecase = {
      execute: jest.fn(),
    } as jest.Mocked<ITreeUsecase>;

    mockReq = {
      on: jest.fn(),
    } as Partial<jest.Mocked<IncomingMessage>>;

    mockRes = {
      writeHead: jest.fn(),
      end: jest.fn(),
    } as Partial<jest.Mocked<ServerResponse>>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("handler", () => {
    it("should parse input data and call treeUsecase.execute", () => {
      const input: IInputProps[] = [{ entryId: "1", path: ["root1", "path1"] }];
      const output: IOutputProps[] = [
        {
          entryId: 1,
          fullPath: "root1",
          currentPath: "root1",
          children: [
            {
              entryId: 1,
              fullPath: "root1/path1",
              currentPath: "path1",
              children: [],
            },
          ],
        },
      ];
      mockTreeUsecase.execute.mockReturnValue(output);

      const controller = new TreeController(mockTreeUsecase);
      controller.handler(mockReq as IncomingMessage, mockRes as ServerResponse);

      const onDataCallback = (mockReq.on as jest.Mock).mock.calls[0][1];
      onDataCallback(JSON.stringify(input));

      const onEndCallback = (mockReq.on as jest.Mock).mock.calls[1][1];
      onEndCallback();

      expect(mockTreeUsecase.execute).toHaveBeenCalledWith(input);
      expect(mockRes.writeHead).toHaveBeenCalledWith(201, {
        "Content-Type": "application/json",
      });
      expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify(output));
    });

    it("should handle invalid input data and respond with status 400", () => {
      const invalidInput = "invalid input";
      const errorMessage = `Unexpected token 'i', "invalid input" is not valid JSON`;
      mockTreeUsecase.execute.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const controller = new TreeController(mockTreeUsecase);
      controller.handler(mockReq as IncomingMessage, mockRes as ServerResponse);

      const onDataCallback = (mockReq.on as jest.Mock).mock.calls[0][1];
      onDataCallback(invalidInput);

      const onEndCallback = (mockReq.on as jest.Mock).mock.calls[1][1];
      onEndCallback();

      expect(mockTreeUsecase.execute).not.toHaveBeenCalled();
      expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
        "Content-Type": "application/json",
      });
      expect(mockRes.end).toHaveBeenCalledWith(
        JSON.stringify({ error: errorMessage })
      );
    });
  });
});
