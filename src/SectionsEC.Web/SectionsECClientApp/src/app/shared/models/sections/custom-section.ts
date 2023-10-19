import { Bar } from "../bar";
import { Point } from "../point";

export interface CustomSection {
  sectionCoordinates: string;
  barCoordinates: string;
}

export const defaultCustomSection = () : CustomSection => ({
  sectionCoordinates: '0;0 200;0 300;200 -100;200',
  barCoordinates: '100;50;10'
});

export const customSectionFactory = {
  getCoordinates: (section: CustomSection): Point[] => {
    const coordinates: Point[] = [];

    const splitedCoordinates = section.sectionCoordinates.split(' ');

    for (let i = 0; i < splitedCoordinates.length; i++) {
      const tempCoord = splitedCoordinates[i].split(';');
      const x = parseFloat(tempCoord[0]);
      const y = parseFloat(tempCoord[1]);
      coordinates.push({ x, y });
    }

    return coordinates;
  },
  getBars: (section: CustomSection): Bar[] => {
    const bars: Bar[] = [];

    const splitedBars = section.barCoordinates.split(' ');

    for (let i = 0; i < splitedBars.length; i++) {
      const tempBar = splitedBars[i].split(';');
      const x = parseFloat(tempBar[0]);
      const y = parseFloat(tempBar[1]);
      const d = parseFloat(tempBar[2]);
      bars.push({ x, y, d });
    }

    return bars;
  }
};
