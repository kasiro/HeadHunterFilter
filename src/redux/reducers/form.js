import { formInitState } from '../initialParams';
import {
  CHANGE_NEW_IN_DAYS,
  CHANGE_KEYWORDS,
  CLEAR_KEYWORDS,
  FORM_SUBMIT,
  ADD_EXCLUSION_GROUP,
  REMOVE_EXCLUSION_GROUP,
  UPDATE_EXCLUSION_GROUP,
  TOGGLE_GROUP_ENABLED,
} from '../types/form';
import { cloneObj } from '../../helpers';

// eslint-disable-next-line default-param-last
const form = (state = formInitState, action) => {
  switch (action.type) {
    case FORM_SUBMIT:
      return {
        ...state,
        name: action.name,
        experience: cloneObj(action.experience),
      };
    case CHANGE_NEW_IN_DAYS:
      return {
        ...state,
        newInDays: action.newInDays,
      };
    case CHANGE_KEYWORDS:
      return {
        ...state,
        [action.keywordType]: action.keywords,
      };
    case CLEAR_KEYWORDS:
      return {
        ...state,
        necessary: [],
        unnecessary: [],
      };
    case ADD_EXCLUSION_GROUP:
      return {
        ...state,
        exclusionGroups: action.groups,
      };
    case REMOVE_EXCLUSION_GROUP:
      return {
        ...state,
        exclusionGroups: action.groups,
      };
    case UPDATE_EXCLUSION_GROUP:
      return {
        ...state,
        exclusionGroups: action.groups,
      };
    case TOGGLE_GROUP_ENABLED:
      return {
        ...state,
        exclusionGroups: action.groups,
      };
    default:
      return state;
  }
};

export default form;
