import { isInteger } from "../utils";

export interface LoadCase {
  id: number;
  name: string;
  normalForce: number;
}

export const emptyLoad = (): LoadCase => ({id: 0, name:'Load',normalForce:0});

export const isValidLoad = (load: LoadCase): boolean => {
  if (!load) {
    return false;
  }
  else if (!load.name || load.name === '') {
    return false;
  }
  else if (!isInteger(load.normalForce)) {
    return false;
  }
  return true;
}
