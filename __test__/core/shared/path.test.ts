import { Errors } from "../../../src/core/constants/errors";
import { Path } from "../../../src/core/shared/path";

describe("Path", () => {
  it("should throw the error INVALID_PATH if index 0 of the path array does not match the root name", () => {
    expect(() => new Path(["roo1", "path1"])).toThrow(Errors.INVALID_PATH);
  });

  it("should throw the error INVALID_PATH if the other indices after 0 of the path array do not match the name path", () => {
    expect(() => new Path(["root1", "abc1"])).toThrow(Errors.INVALID_PATH);
  });

  it("should throw the INVALID_PATH error if index 0 of the path array does not correspond to a root from 0 to 999", () => {
    expect(() => new Path(["root1000", "path1"])).toThrow(Errors.INVALID_PATH);
  });

  it("should throw the INVALID_PATH error if the other indices after 0 of the path array do not correspond to a path from 0 to 999", () => {
    expect(() => new Path(["root1", "path1000"])).toThrow(Errors.INVALID_PATH);
  });

  it("should create a valid Path instance", () => {
    const path = new Path(["root1", "path1", "path2"]);
    expect(path.value).toStrictEqual(["root1", "path1", "path2"]);
  });

  it("should get the fullpath correctly", () => {
    const path = new Path(["root1", "path1", "path2"]);
    expect(path.getFullPath()).toBe("root1/path1/path2");
  });

  it("should get the path size correctly", () => {
    const path = new Path(["root1", "path1", "path2"]);
    expect(path.length).toBe(3);
  });

  it("should get the current path correctly", () => {
    const path = new Path(["root1", "path1", "path2"]);
    expect(path.getCurrentPath(2)).toBe("path2");
  });
});
