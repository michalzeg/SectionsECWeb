import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as SVG from 'svg.js';
import { Point } from '../../models/point';
import { Bar } from '../../models/bar';

const ratio = 2;
const patternSize = 20;
const sectionScaleFactor = 2;

@Component({
  selector: 'app-drawing-base',
  templateUrl: './drawing-base.component.html',
  styleUrls: ['./drawing-base.component.scss']
})
export class DrawingBaseComponent implements AfterViewInit, AfterViewChecked, OnChanges {

  @Input()
  coordinates: Point[] = [];

  @Input()
  bars: Bar[] = [];

  private initialized = false;

  private width!: number;
  private height!: number;
  private sectionCentreX!: number;
  private sectionCentreY!: number;
  private scale!: number;
  private elements: SVG.Shape[] = [];
  canvas!: SVG.Doc;

  constructor(private readonly el: ElementRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized){
      this.redraw();
    }
  }
  ngAfterViewChecked(): void {

    if (!this.initialized){
      this.ngAfterViewInit();
    }
  }
  ngAfterViewInit(): void {
    const canvasElement = (this.el.nativeElement as Element).querySelector('.canvas') as HTMLElement;

    if (canvasElement.offsetWidth === 0){
      return;
    }
    canvasElement.innerHTML = ''
    this.width = canvasElement.offsetWidth;
    this.height = this.width / ratio;
    canvasElement.setAttribute('style', 'height:' + (this.height).toFixed(0) + 'px');
    this.canvas = SVG(canvasElement);
    this.drawBackgroundPattern();
    this.redraw();
    this.initialized = true;
  }

  private redraw() {
    this.elements.forEach(element => {
      this.canvas.removeElement(element);
    });
    this.elements = [];

    this.drawSection();
    this.drawBars();
  }

  private drawBackgroundPattern() {

    //canvas width and height are rouned such way that they are multiplier of patternSize
    const correctedWidth = Math.floor(this.width / patternSize) * patternSize;
    const correctedHeight = Math.floor(this.height / patternSize) * patternSize;

    const patternCentre = patternSize / 2;
    const pattern = this.canvas.pattern(patternSize, patternSize, function (add) {
      add.line(0, patternCentre, patternSize, patternCentre).stroke({ width: 1, color: 'LightGrey' });
      add.line(patternCentre, 0, patternCentre, patternSize).stroke({ width: 1, color: 'LightGrey' });
    });
     this.canvas.rect(correctedWidth, correctedHeight).fill(pattern);
  }

  drawBars() {
    for (let i = 0; i < this.bars.length; i++) {
        const bar = this.bars[i];
        const x = this.transferXToCanvasSystem(bar.x);
        const y = this.transferYToCanvasSystem(bar.y);
        const d = bar.d * this.scale;

        const circle = this.canvas.circle(d).fill({ color: '#248f24' }).stroke({ width: 1, color: '#196619' });
        circle.cx(x).cy(y);
        this.elements.push(circle);
    }
}

  drawSection() {
    const x = this.coordinates.map(a => a.x);
    const y = this.coordinates.map(a => a.y);

    const maxX = Math.max(...x);
    const minX = Math.min(...x);
    const maxY = Math.max(...y);
    const minY = Math.min(...y);
    const sectionWidth = maxX - minX;
    const sectionHeight = maxY - minY;

    this.sectionCentreX = sectionWidth / 2 + minX;
    this.sectionCentreY = sectionHeight / 2 + minY;
    this.scale = this.getDrawingScale(sectionHeight, sectionWidth);

    const transferedToCanvas = this.coordinates.map(c => ({
      x: this.transferXToCanvasSystem(c.x),
      y: this.transferYToCanvasSystem(c.y)
    }))

    const chainCoordinates = this.transferCoordinatesToPlot(transferedToCanvas);

    const polygon = this.canvas.polygon(chainCoordinates).fill({ color: '#3276b1', opacity: 0.9 }).stroke({ width: 3, color: '#054072' });
    this.elements.push(polygon);
  }

  private transferXToCanvasSystem(pointX: number): number {
    const x = ((pointX - this.sectionCentreX) * this.scale) + this.width / 2;
    return x;
  }

  private transferYToCanvasSystem(pointY: number): number {
    const y = (-(pointY - this.sectionCentreY) * this.scale) + this.height / 2;
    return y;
  }

  private getDrawingScale(sectionHeight: number, sectionWidth: number): number {
    const scale1 = this.height / sectionHeight / sectionScaleFactor;
    const scale2 = this.width / sectionWidth / sectionScaleFactor;

    const scale = Math.min(scale1, scale2);
    return scale;
  }

  private transferCoordinatesToPlot(coordinates: Point[]) {
    const result = coordinates
      .map(c => ({ x: c.x.toFixed(2), y: c.y.toFixed(2) }))
      .map(c => `${c.x},${c.y}`)
      .reduce((prev, next) => `${prev} ${next}`);

    return result;
  }
}
