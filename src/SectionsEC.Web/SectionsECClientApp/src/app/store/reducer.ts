import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { AppState, initialState } from './state';
import { rectangularSectionFactory } from '../shared/models/sections/rectangular-section';
import { circularSectionFactory } from '../shared/models/sections/circular-section';
import { customSectionFactory } from '../shared/models/sections/custom-section';
import { emptyLoad } from '../shared/models/loadCase';
import { CalculationProgressType } from '../shared/types/calculation-progress-type';
import { setSectiontype } from './reducer-utils/section-type.reducer';
import { closeModal } from './reducer-utils/close-modal.reducer';
import { saveModal } from './reducer-utils/save-modal.reducer';

export type AppStateReducer = (state: AppState) => AppState;


export const appReducer = createReducer(
  initialState,

  on(actions.showModal, (state, { modalType }) => ({ ...state, selectedModal: modalType })),
  on(actions.closeModal, state => closeModal(state)),
  on(actions.saveModal, state => saveModal(state)),
  on(actions.setModalValid, (state, { valid }) => ({ ...state, isModalValid: valid })),

  on(actions.requestMaterialsOk, (state, { material }) => (
    {
      ...state,
      materialState: {
        ...state.materialState,
        material,
      },
      savedConcreteModalState: {
        concrete: material.concrete[0]
      },
      selectedConcreteModalState: {
        concrete: material.concrete[0]
      },
      savedSteelModalState: {
        steel: material.steel[0]
      },
      selectedSteelModalState: {
        steel: material.steel[0]
      }

    })),

  on(actions.requestCalculations, (state) => ({
    ...state,
    calculationState: {
      ...state.calculationState,
      progress: 'Processing' as CalculationProgressType
    }
  })
  ),

  on(actions.requestCalculationsOk, (state, { result }) => ({
    ...state,
    calculationState: {
      ...state.calculationState,
      result: result,
      progress: 'Success' as CalculationProgressType
    }
  })
  ),

  on(actions.requestCalculationsFailed, (state) => ({
    ...state,
    calculationState: {
      ...state.calculationState,
      progress: 'Error' as CalculationProgressType
    }
  })
  ),

  on(actions.setConcrete, (state, { concrete }) => (
    {
      ...state,
      selectedConcreteModalState: {
        ...state.selectedConcreteModalState,
        concrete
      }
    }
  )),

  on(actions.setSteel, (state, { steel }) => (
    {
      ...state,
      selectedSteelModalState: {
        ...state.selectedSteelModalState,
        steel
      }
    }
  )),

  on(actions.setSectionType, (state, { sectionType }) => ({
    ...state,
    selectedSectionsState: setSectiontype(state.selectedSectionsState, sectionType)
  })),

  on(actions.setRectangularSection, (state, { section }) => ({
    ...state,
    selectedSectionsState: {
      ...state.selectedSectionsState,
      rectangularSection: section,
      coordinates: rectangularSectionFactory.getCoordinates(section),
      bars: rectangularSectionFactory.getBars(section)
    }
  })),

  on(actions.setCircularSection, (state, { section }) => ({
    ...state,
    selectedSectionsState: {
      ...state.selectedSectionsState,
      circularSection: section,
      coordinates: circularSectionFactory.getCoordinates(section),
      bars: circularSectionFactory.getBars(section)
    }
  })),

  on(actions.setCustomSection, (state, { section }) => ({
    ...state,
    selectedSectionsState: {
      ...state.selectedSectionsState,
      customSection: section,
      coordinates: customSectionFactory.getCoordinates(section),
      bars: customSectionFactory.getBars(section)
    }
  })),

  on(actions.addLoad, (state) => ({
    ...state,
    selectedLoadsState: {
      ...state.selectedLoadsState,
      loads: [
        ...state.selectedLoadsState.loads,
        emptyLoad()
      ]
    }
  })),

  on(actions.setLoad, (state, { load, index }) => ({
    ...state,
    selectedLoadsState: {
      ...state.selectedLoadsState,
      loads: [...state.selectedLoadsState.loads.slice(0, index), load, ...state.selectedLoadsState.loads.slice(index + 1)]
    }
  })),

  on(actions.removeLoad, (state, { index }) => ({
    ...state,
    selectedLoadsState: {
      ...state.selectedLoadsState,
      loads: [...state.selectedLoadsState.loads.slice(0, index), ...state.selectedLoadsState.loads.slice(index + 1)]
    }
  })),

  on(actions.setResultId, (state, { id }) => ({
    ...state,
    calculationState:{
      ...state.calculationState,
      resultId: id
    }
  }))
);
