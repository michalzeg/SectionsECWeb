import { circularSectionFactory } from "src/app/shared/models/sections/circular-section";
import { customSectionFactory } from "src/app/shared/models/sections/custom-section";
import { rectangularSectionFactory } from "src/app/shared/models/sections/rectangular-section";
import { SectionType } from "src/app/shared/types/section-type";
import { SectionsModalState } from "../state";

export const setSectiontype = (state: SectionsModalState, sectionType: SectionType): SectionsModalState => {
  let coordinates = state.coordinates;
  let bars = state.bars;

  switch (sectionType) {
    case 'Rectangular':
      coordinates = rectangularSectionFactory.getCoordinates(state.rectangularSection);
      bars = rectangularSectionFactory.getBars(state.rectangularSection);
      break;
    case 'Circular':
      coordinates = circularSectionFactory.getCoordinates(state.circularSection);
      bars = circularSectionFactory.getBars(state.circularSection);
      break;
    case 'Custom':
      coordinates = customSectionFactory.getCoordinates(state.customSection);
      bars = customSectionFactory.getBars(state.customSection);
      break;
  }

  return { ...state, sectionType, coordinates, bars };
}
