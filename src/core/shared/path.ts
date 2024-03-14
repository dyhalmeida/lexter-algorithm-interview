import { Errors } from "../constants/errors";

export class Path {
  readonly value: string[];

  constructor(path: string[]) {
    const isValidPath = path.every((p, index) =>
      index === 0 ? /^root\d{1,3}$/.test(p) : /^path\d{1,3}$/.test(p)
    );
    if (!isValidPath) throw new Error(Errors.INVALID_PATH);
    this.value = [...path];
  }

  getFullPath() {
    return this.value.join("/");
  }

  getCurrentPath(value: number) {
    return this.value[value];
  }

  get length() {
    return this.value.length;
  }
}
