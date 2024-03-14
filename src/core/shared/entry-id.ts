import { Errors } from "../constants/errors";

export class EntryId {
  readonly value: string;
  constructor(value: string) {
    if (!value || typeof value !== "string" || parseInt(value) < 1)
      throw new Error(Errors.INVALID_ENTRY_ID);
    if (!/^\d+$/.test(value)) throw new Error(Errors.INVALID_ENTRY_ID);
    this.value = value;
  }

  get Int() {
    return parseInt(this.value);
  }
}
