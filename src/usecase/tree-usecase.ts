import { Tree } from "../core/service/tree";
import { IInputProps } from "../core/interfaces/input.interface";
import { IOutputProps } from "../core/interfaces/output.interface";

export class TreeUsecase {
  execute(input: IInputProps[]): IOutputProps[] {
    return new Tree(input).createTree();
  }
}
