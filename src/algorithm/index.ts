import { Tree } from "../core/service/tree";
import { inputList } from "../input";

console.log(JSON.stringify(new Tree(inputList).createTree(), null, 3));
