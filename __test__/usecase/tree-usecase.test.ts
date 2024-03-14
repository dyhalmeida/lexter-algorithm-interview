import { inputList } from "../../src/input";
import { outputList } from "../../src/output";
import { TreeUsecase } from "../../src/usecase/tree-usecase";

describe("TreeUsecase", () => {
  it("should return an output correctly based on the input", () => {
    const treeUsecase = new TreeUsecase();
    const output = treeUsecase.execute(inputList);
    expect(output).toStrictEqual(outputList);
  });
});
