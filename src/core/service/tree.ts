import { Input } from "../entity/input";
import { IInputProps } from "../interfaces/input.interface";
import { IOutputProps } from "../interfaces/output.interface";

export class Tree {
  private inputs: Input[];

  constructor(props: IInputProps[]) {
    this.inputs = props.map(
      ({ entryId, path }) => new Input({ entryId, path })
    );
  }

  private filterChildrens(parentPath: string[]): Input[] {
    const childrens = this.inputs.filter((input) => {
      const isChild = input.path.length === parentPath.length + 1;

      // Verifica se os primeiros elementos do caminho do nó filho correspondem ao caminho do nó pai
      const matchesParentPath = input.path.value
        .slice(0, parentPath.length)
        .every((value, index) => value === parentPath[index]);

      return isChild && matchesParentPath;
    });
    return childrens;
  }

  private mapToOutput(
    childrens: Input[],
    parentPath: string[]
  ): IOutputProps[] {
    const output = childrens.map((input) => ({
      entryId: input.entryId.Int,
      fullPath: input.path.getFullPath(),
      currentPath: input.path.getCurrentPath(parentPath.length),
      children: this.createTree(input.path.value),
    }));
    return output;
  }

  private sortOutputChildren(outputChildren: IOutputProps[]): IOutputProps[] {
    return outputChildren.sort((a, b) => a.entryId - b.entryId);
  }

  public createTree(parentPath: string[] = []): IOutputProps[] {
    const childrens = this.filterChildrens(parentPath);
    const outputChildren = this.mapToOutput(childrens, parentPath);
    const outputSorted = this.sortOutputChildren(outputChildren);
    return outputSorted;
  }
}
