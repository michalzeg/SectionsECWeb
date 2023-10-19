import { Bar } from "./bar";
import { Concrete } from "./concrete";
import { LoadCase } from "./loadCase";
import { Point } from "./point";
import { Steel } from "./steel";

export interface CalculationInput {
  concrete?: Concrete;
  steel?: Steel;
  sectionCoordinates?: Point[];
  bars?: Bar[];
  loadCases?: LoadCase[];
}
