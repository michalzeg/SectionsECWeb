import { Bar } from "../bar";
import { Point } from "../point";

export interface RectangularSection {
  width: number;
  height: number;
  topBarDiameter: number;
  topBarCount: number;
  bottomBarDiameter: number;
  bottomBarCount: number;
  cover: number;
}

export const defaultRectangularSection = (): RectangularSection => ({
  width: 500,
  height: 200,
  topBarDiameter: 10,
  topBarCount: 3,
  bottomBarDiameter: 20,
  bottomBarCount: 5,
  cover: 5
})

export const rectangularSectionFactory = {
  getCoordinates: (section: RectangularSection): Point[] => {
    const coordinates: Point[] = [];

    coordinates.push({ x: 0, y: 0 });
    coordinates.push({ x: 0.5 * section.width, y: 0 });
    coordinates.push({ x: 0.5 * section.width, y: -section.height });
    coordinates.push({ x: -0.5 * section.width, y: -section.height });
    coordinates.push({ x: -0.5 * section.width, y: 0 });
    coordinates.push({ x: 0, y: 0 });

    return coordinates;
  },
  getBars: (section: RectangularSection): Bar[] => {
    const bars: Bar[] = [];

    const distanceBetweenTopBars = (section.width - 2 * section.cover - section.topBarDiameter) / (section.topBarCount + 1);
    const distnaceBetweenBottomBars = (section.width - 2 * section.cover - section.bottomBarDiameter) / (section.bottomBarCount + 1);

    //bottom bars
    for (let i = 1; i <= section.bottomBarCount; i++) {
      const x = i * distnaceBetweenBottomBars - (section.width / 2 - section.cover - section.bottomBarDiameter / 2);
      const y = -section.height + section.cover + section.bottomBarDiameter / 2;
      const d = section.bottomBarDiameter;
      bars.push({ x, y, d });
    }
    //top bars
    for (let i = 1; i <= section.topBarCount; i++) {
      const x = i * distanceBetweenTopBars - (section.width / 2 - section.cover - section.topBarDiameter / 2);
      const y = -section.cover - section.topBarDiameter / 2;
      const d = section.topBarDiameter;
      bars.push({ x, y, d });
    }
    return bars;
  }
};
