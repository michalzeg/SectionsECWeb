import { CalculationResult } from "src/app/shared/models/calculation-result";
import { CalculationProgressType } from "src/app/shared/types/calculation-progress-type";
import { AppStateReducer } from "../reducer";
import { AppState } from "../state";


export const saveConcreteModal: AppStateReducer = (state: AppState): AppState => (
  {
    ...state,
    savedConcreteModalState: {
      ...state.selectedConcreteModalState,
    }
  });

export const saveSteelModal: AppStateReducer = (state: AppState): AppState => (
  {
    ...state,
    savedSteelModalState: {
      ...state.selectedSteelModalState
    }
  });

export const saveSectionsModal: AppStateReducer = (state: AppState): AppState => (
  {
    ...state,
    savedSectionsState: {
      ...state.selectedSectionsState
    }
  });

export const saveLoadsModal: AppStateReducer = (state: AppState): AppState => (
  {
    ...state,
    savedLoadsState: {
      ...state.selectedLoadsState,
      loads: state.selectedLoadsState.loads.map((e, id) => ({ ...e, id }))
    }
  });

export const saveModal = (state: AppState): AppState => {

  let result: AppStateReducer = state => state;

  switch (state.selectedModal) {
    case 'Concrete':
      result = saveConcreteModal;
      break;
    case 'Steel':
      result = saveSteelModal;
      break;
    case 'Section':
      result = saveSectionsModal;
      break;
    case 'Loads':
      result = saveLoadsModal;
      break;
  }

  return {
    ...result(state),
    selectedModal: 'None',
    calculationState: {
      ...state.calculationState,
      result: {} as CalculationResult,
      progress: 'OutOfDate' as CalculationProgressType,
    }
  };
}
