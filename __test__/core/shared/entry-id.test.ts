import { Errors } from "../../../src/core/constants/errors";
import { EntryId } from "../../../src/core/shared/entry-id";

describe("EntryId", () => {
  it("should throw the error INVALID_ENTRY_ID if it has no id", () => {
    expect(() => new EntryId("")).toThrow(Errors.INVALID_ENTRY_ID);
  });

  it("should throw the error INVALID_ENTRY_ID if id is a number", () => {
    expect(() => new EntryId(1 as unknown as string)).toThrow(
      Errors.INVALID_ENTRY_ID
    );
  });

  it("should throw the error INVALID_ENTRY_ID if id is a letter", () => {
    expect(() => new EntryId("A")).toThrow(Errors.INVALID_ENTRY_ID);
  });

  it("should throw the error INVALID_ENTRY_ID if id contains numbers and letters", () => {
    expect(() => new EntryId("1ABc")).toThrow(Errors.INVALID_ENTRY_ID);
  });

  it("should throw the error INVALID_ENTRY_ID if id is less than 1", () => {
    expect(() => new EntryId("0")).toThrow(Errors.INVALID_ENTRY_ID);
  });

  it("should create a valid EntryId instance", () => {
    const entryId = new EntryId("1");
    expect(entryId.value).toBe("1");
  });

  it("should get the value of type number", () => {
    const entryId = new EntryId("1");
    expect(entryId.Int).toBe(1);
    expect(typeof entryId.Int).toBe("number");
  });
});
