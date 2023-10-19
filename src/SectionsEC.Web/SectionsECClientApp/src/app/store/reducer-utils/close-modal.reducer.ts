import { AppStateReducer } from "../reducer";
import { AppState } from "../state";

export const closeConcreteModal: AppStateReducer = (state: AppState): AppState => (
  {
    ...state,
    selectedConcreteModalState: {
      ...state.savedConcreteModalState
    }
  });


export const closeSteelModal: AppStateReducer = (state: AppState): AppState => (
  {
    ...state,
    selectedSteelModalState: {
      ...state.savedSteelModalState
    }
  });


export const closeSectionsModal: AppStateReducer = (state: AppState): AppState => (
  {
    ...state,
    selectedSectionsState: {
      ...state.savedSectionsState
    }
  });


export const closeLoadsModal: AppStateReducer = (state: AppState): AppState => (
  {
    ...state,
    selectedLoadsState: {
      ...state.savedLoadsState
    }
  });



export const closeModal = (state: AppState): AppState => {
  let result: AppStateReducer = state => state;

  switch (state.selectedModal) {
    case 'Concrete':
      result = closeConcreteModal;
      break;
    case 'Steel':
      result = closeSteelModal;
      break;
    case 'Section':
      result = closeSectionsModal;
      break;
    case 'Loads':
      result = closeLoadsModal;
      break;
  }

  return { ...result(state), selectedModal: 'None', isModalValid: true };
}


