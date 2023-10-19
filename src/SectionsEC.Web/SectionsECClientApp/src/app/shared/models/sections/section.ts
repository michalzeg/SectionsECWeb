import { Bar } from "../bar";
import { Point } from "../point";


export interface Section {
  coordinates(): Point[];
  bars(): Bar[];
}
