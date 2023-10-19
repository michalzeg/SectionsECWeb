import { CalculationProgressType } from "../shared/types/calculation-progress-type";
import { ModalType } from "../shared/types/modal-type";
import { Bar } from "../shared/models/bar";
import { CalculationResult } from "../shared/models/calculation-result";
import { Concrete } from "../shared/models/concrete";
import { LoadCase } from "../shared/models/loadCase";
import { Material } from "../shared/models/materials";
import { Point } from "../shared/models/point";
import { CircularSection, defaultCircularSection } from "../shared/models/sections/circular-section";
import { CustomSection, defaultCustomSection } from "../shared/models/sections/custom-section";
import { RectangularSection, defaultRectangularSection, rectangularSectionFactory } from "../shared/models/sections/rectangular-section";
import { Steel } from "../shared/models/steel";
import { SectionType } from "../shared/types/section-type";


export interface MaterialState {
  material: Material;
}

export interface ConcreteModalState {
  concrete: Concrete
}

export interface SteelModalState {
  steel: Steel
}

export interface SectionsModalState {
  sectionType: SectionType;
  rectangularSection: RectangularSection;
  circularSection: CircularSection;
  customSection: CustomSection;

  coordinates: Point[];
  bars: Bar[];
}

export interface LoadsModalState {
  loads: LoadCase[];
}

export interface CalculationState {
  result: CalculationResult;
  progress: CalculationProgressType;
  resultId: number;
}

export interface AppState {
  materialState: MaterialState,
  selectedModal: ModalType;
  isModalValid: boolean;
  selectedConcreteModalState: ConcreteModalState,
  savedConcreteModalState: ConcreteModalState,

  selectedSteelModalState: SteelModalState,
  savedSteelModalState: SteelModalState,

  selectedSectionsState: SectionsModalState;
  savedSectionsState: SectionsModalState;

  selectedLoadsState: LoadsModalState;
  savedLoadsState: LoadsModalState;

  calculationState: CalculationState;
}

export const initialState: AppState = {

  selectedModal: 'None',
  isModalValid: true,
  materialState: {
    material: {
      steel: [],
      concrete: []
    }
  },

  selectedConcreteModalState: {
    concrete: {} as Concrete
  },
  savedConcreteModalState: {
    concrete: {} as Concrete
  },

  selectedSteelModalState: {
    steel: {} as Steel
  },
  savedSteelModalState: {
    steel: {} as Steel
  },

  selectedSectionsState: {
    sectionType: 'Rectangular',
    rectangularSection: defaultRectangularSection(),
    circularSection: defaultCircularSection(),
    customSection: defaultCustomSection(),

    coordinates: rectangularSectionFactory.getCoordinates(defaultRectangularSection()),
    bars: rectangularSectionFactory.getBars(defaultRectangularSection()),
  },
  savedSectionsState: {
    sectionType: 'Rectangular',
    rectangularSection: defaultRectangularSection(),
    circularSection: defaultCircularSection(),
    customSection: defaultCustomSection(),

    coordinates: rectangularSectionFactory.getCoordinates(defaultRectangularSection()),
    bars: rectangularSectionFactory.getBars(defaultRectangularSection()),
  },

  selectedLoadsState: {
    loads: [
      {id:0, name: 'Load1', normalForce: 100000 },
      {id:1, name: 'Load2', normalForce: -200000 }
    ]
  },
  savedLoadsState: {
    loads: [
      {id:0, name: 'Load1', normalForce: 100000 },
      {id:1, name: 'Load2', normalForce: 200000 }
    ]
  },

  calculationState: {
    result: { loadCaseResults: [] },
    progress: 'OutOfDate',
    resultId: 0
  }
};
