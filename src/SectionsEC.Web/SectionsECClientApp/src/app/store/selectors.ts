import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './state';



export const selectFeature = createFeatureSelector<AppState>('app');

export const selectCurrentModal = createSelector(selectFeature,(state: AppState) => state.selectedModal);
export const selectIsModalValid = createSelector(selectFeature, (state: AppState) => state.isModalValid);

export const concrete = createSelector(selectFeature,({materialState}) => materialState.material.concrete);
export const selectedConcrete = createSelector(selectFeature,({selectedConcreteModalState}) => selectedConcreteModalState.concrete);
export const savedConcrete = createSelector(selectFeature,({savedConcreteModalState}) => savedConcreteModalState.concrete);

export const steel = createSelector(selectFeature,({materialState}) => materialState.material.steel);
export const selectedSteel = createSelector(selectFeature,({selectedSteelModalState}) => selectedSteelModalState.steel);
export const savedSteel = createSelector(selectFeature,({savedSteelModalState}) => savedSteelModalState.steel);

export const selectedSectionType = createSelector(selectFeature, ({selectedSectionsState}) => selectedSectionsState.sectionType);
export const selectedCircularSection = createSelector(selectFeature, ({selectedSectionsState}) => selectedSectionsState.circularSection);
export const savedCircularSection = createSelector(selectFeature, ({savedSectionsState}) => savedSectionsState.circularSection);
export const selectedRectangularSection = createSelector(selectFeature, ({selectedSectionsState}) => selectedSectionsState.rectangularSection);
export const savedRectangularSection = createSelector(selectFeature, ({savedSectionsState}) => savedSectionsState.rectangularSection);
export const selectedCustomSection = createSelector(selectFeature, ({selectedSectionsState}) => selectedSectionsState.customSection);
export const savedCustomSection = createSelector(selectFeature, ({savedSectionsState}) => savedSectionsState.customSection);
export const selectedCoordinates = createSelector(selectFeature, ({selectedSectionsState}) => selectedSectionsState.coordinates);
export const savedCoordinates = createSelector(selectFeature, ({savedSectionsState}) => savedSectionsState.coordinates);
export const selectedBars = createSelector(selectFeature, ({selectedSectionsState}) => selectedSectionsState.bars);
export const savedBars = createSelector(selectFeature, ({savedSectionsState}) => savedSectionsState.bars);

export const selectedLoads = createSelector(selectFeature, ({selectedLoadsState}) => selectedLoadsState.loads);
export const savedLoads = createSelector(selectFeature, ({savedLoadsState}) => savedLoadsState.loads);

export const calculationResults = createSelector(selectFeature, ({calculationState}) => calculationState.result);
export const calculationResultId = createSelector(selectFeature, ({calculationState}) => calculationState.resultId);
export const calculationProgress = createSelector(selectFeature, ({calculationState}) => calculationState.progress);

