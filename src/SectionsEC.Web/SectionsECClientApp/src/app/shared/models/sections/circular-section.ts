import { Bar } from "../bar";
import { Point } from "../point";

export interface CircularSection {
  diameter: number;
  barDiameter: number;
  barCount: number;
  cover: number;
}

export const defaultCircularSection = (): CircularSection => ({
  diameter: 500,
  barDiameter: 20,
  barCount: 6,
  cover: 20
});

export const circularSectionFactory = {
  getCoordinates: (section: CircularSection): Point[] => {
    const coordinates: Point[] = [];

    for (let i = 0; i < 360; i++) {
      const alpha = (i - 90) * Math.PI / 180;
      const x = section.diameter / 2 * Math.sin(alpha);
      const y = section.diameter / 2 * Math.cos(alpha);
      coordinates.push({ x, y });
    }

    return coordinates;
  },
  getBars: (section: CircularSection): Bar[] => {
    const bars: Bar[] = [];

    const deltaAlfa = 360 / section.barCount;
    for (let i = 1; i <= section.barCount; i++) {
      const alpha = (-180 + (i - 1) * deltaAlfa) * Math.PI / 180;
      const x = (section.diameter / 2 - section.cover - section.barDiameter / 2) * Math.sin(alpha);
      const y = (section.diameter / 2 - section.cover - section.barDiameter / 2) * Math.cos(alpha);
      const d = section.barDiameter;
      bars.push({ x, y, d });
    }
    return bars;
  }
};
