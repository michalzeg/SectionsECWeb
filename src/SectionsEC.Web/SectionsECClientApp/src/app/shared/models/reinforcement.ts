import { BarResult } from "./bar-result";


export interface Reinforcement {
  epsilon: number;
  sigma: number;
  bar: BarResult;
  d: number;
  moment: number;
  force: number;
  isCompressed: boolean;
}
