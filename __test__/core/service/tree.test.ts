import { Tree } from "../../../src/core/service/tree";
import { inputList } from "../../../src/input";
import { outputList } from "../../../src/output";

describe("Tree", () => {
  it("should return an output correctly based on the input", () => {
    const output = new Tree(inputList).createTree();
    expect(output).toStrictEqual(outputList);
  });

  it("should return an empty output based on the empty input", () => {
    const output = new Tree([]).createTree();
    expect(output).toStrictEqual([]);
  });
});
