import { Input } from "../../../src/core/entity/input";

describe("Input", () => {
  it("should create a valid Input instance", () => {
    const input = new Input({
      entryId: "1",
      path: ["root1", "path1"],
    });
    expect(input.entryId.value).toBe("1");
    expect(input.path.value).toStrictEqual(["root1", "path1"]);
  });
});
