import { createAction, props } from '@ngrx/store';
import { ModalType } from '../shared/types/modal-type';
import { Material } from '../shared/models/materials';
import { Concrete } from '../shared/models/concrete';
import { RectangularSection } from '../shared/models/sections/rectangular-section';
import { SectionType } from '../shared/types/section-type';
import { CircularSection } from '../shared/models/sections/circular-section';
import { CustomSection } from '../shared/models/sections/custom-section';
import { LoadCase } from '../shared/models/loadCase';
import { Steel } from '../shared/models/steel';
import { CalculationResult } from '../shared/models/calculation-result';


export const showModal = createAction('[Modal] show modal', props<{ modalType: ModalType }>());
export const closeModal = createAction('[Modal] close modal');
export const saveModal = createAction('[Modal] save modal');
export const setModalValid = createAction('[Modal] set valid', props<{ valid: boolean }>());

export const requestMaterials = createAction('[Request] request materials');
export const requestMaterialsOk = createAction('[Request] request materials ok', props<{ material: Material }>());
export const requestMaterialsFailed = createAction('[Request] request materials failed');
export const requestCalculations = createAction('[Request] request calculations');
export const requestCalculationsOk = createAction('[Request] request calculations ok', props<{ result: CalculationResult }>());
export const requestCalculationsFailed = createAction('[Request] request calculations failed');


export const setConcrete = createAction('[Concrete] set concrete', props<{ concrete: Concrete }>());
export const setSteel = createAction('[Steel] set steel', props<{ steel: Steel }>());

export const setSectionType = createAction('[Sections] set section type', props<{ sectionType: SectionType }>());
export const setRectangularSection = createAction('[Sections] set rectangular section', props<{ section: RectangularSection }>());
export const setCircularSection = createAction('[Sections] set circular section', props<{ section: CircularSection }>());
export const setCustomSection = createAction('[Sections] set custom section', props<{ section: CustomSection }>());

export const addLoad = createAction('[Loads] add load');
export const removeLoad = createAction('[Loads] remove load', props<{ index: number }>());
export const setLoad = createAction('[Loads] set load', props<{ load: LoadCase, index: number }>());

export const setResultId = createAction('[Results] set result id', props<{ id: number }>());

