import { EntryId } from "../shared/entry-id";
import { Path } from "../shared/path";
import { IInputProps } from "../interfaces/input.interface";

export class Input {
  readonly entryId: EntryId;
  readonly path: Path;

  constructor(props: IInputProps) {
    this.entryId = new EntryId(props.entryId);
    this.path = new Path(props.path);
  }
}
