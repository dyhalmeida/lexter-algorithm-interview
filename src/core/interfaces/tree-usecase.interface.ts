import { IInputProps } from "./input.interface";
import { IOutputProps } from "./output.interface";

export interface ITreeUsecase {
  execute(input: IInputProps[]): IOutputProps[];
}
