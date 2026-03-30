import * as types from '../types/form';
import { changeSelectedRegions, filterVacancies } from './regions';

export const formSubmit = ({ name, experience, formRegions }) => (dispatch, getState) => {
  const { regions } = getState();

  // eslint-disable-next-line no-restricted-syntax
  for (const region of regions) {
    region.checked = formRegions.find((formRegion) => formRegion.id === region.id).checked;
  }

  dispatch({ type: types.FORM_SUBMIT, name, experience });
  dispatch(changeSelectedRegions(regions));
};
export const changeNewInDays = (value) => (dispatch, getState) => {
  const newInDays = [...getState().form.newInDays].map((option) => {
    // eslint-disable-next-line no-param-reassign
    option.checked = option.value === value;

    return option;
  });

  dispatch({ type: types.CHANGE_NEW_IN_DAYS, newInDays });
  dispatch(filterVacancies());
};
export const addKeyword = (keywordType, word, applyTo = 'both') => (dispatch, getState) => {
  const keyword = { word, applyTo };
  const keywords = [...getState().form[keywordType], keyword];

  dispatch({ type: types.CHANGE_KEYWORDS, keywordType, keywords });
  dispatch(filterVacancies());
};
export const deleteKeyword = (keywordType, wordOrKeyword) => (dispatch, getState) => {
  const word = typeof wordOrKeyword === 'string' ? wordOrKeyword : wordOrKeyword.word;
  const keywords = [...getState().form[keywordType]].filter((kw) => {
    const kwWord = typeof kw === 'string' ? kw : kw.word;
    return kwWord.toLowerCase() !== word.toLowerCase();
  });

  dispatch({ type: types.CHANGE_KEYWORDS, keywordType, keywords });
  dispatch(filterVacancies());
};
export const updateKeywordApplyTo = (keywordType, word, applyTo) => (dispatch, getState) => {
  const keywords = [...getState().form[keywordType]].map((kw) => {
    const kwWord = typeof kw === 'string' ? kw : kw.word;
    if (kwWord.toLowerCase() === word.toLowerCase()) {
      return typeof kw === 'string' ? { word: kw, applyTo } : { ...kw, applyTo };
    }
    return kw;
  });

  dispatch({ type: types.CHANGE_KEYWORDS, keywordType, keywords });
  dispatch(filterVacancies());
};
export const clearKeywords = () => (dispatch) => {
  dispatch({ type: types.CLEAR_KEYWORDS });
  dispatch(filterVacancies());
};

// Exclusion groups actions
export const addExclusionGroup = (group) => (dispatch, getState) => {
  const groups = [...getState().form.exclusionGroups, group];

  dispatch({ type: types.ADD_EXCLUSION_GROUP, groups });
  dispatch(filterVacancies());
};

export const removeExclusionGroup = (groupId) => (dispatch, getState) => {
  const groups = [...getState().form.exclusionGroups].filter((group) => group.id !== groupId);

  dispatch({ type: types.REMOVE_EXCLUSION_GROUP, groups });
  dispatch(filterVacancies());
};

export const updateExclusionGroup = (groupId, updates) => (dispatch, getState) => {
  const groups = [...getState().form.exclusionGroups].map((group) => {
    if (group.id === groupId) {
      return { ...group, ...updates };
    }
    return group;
  });

  dispatch({ type: types.UPDATE_EXCLUSION_GROUP, groups });
  dispatch(filterVacancies());
};

export const addWordToGroup = (groupId, word) => (dispatch, getState) => {
  const groups = [...getState().form.exclusionGroups].map((group) => {
    if (group.id === groupId && !group.words.includes(word)) {
      return { ...group, words: [...group.words, word] };
    }
    return group;
  });

  dispatch({ type: types.UPDATE_EXCLUSION_GROUP, groups });
  dispatch(filterVacancies());
};

export const removeWordFromGroup = (groupId, word) => (dispatch, getState) => {
  const groups = [...getState().form.exclusionGroups].map((group) => {
    if (group.id === groupId) {
      return { ...group, words: group.words.filter((w) => w.toLowerCase() !== word.toLowerCase()) };
    }
    return group;
  });

  dispatch({ type: types.UPDATE_EXCLUSION_GROUP, groups });
  dispatch(filterVacancies());
};

export const toggleGroupEnabled = (groupId) => (dispatch, getState) => {
  const groups = [...getState().form.exclusionGroups].map((group) => {
    if (group.id === groupId) {
      return { ...group, isEnabled: !group.isEnabled };
    }
    return group;
  });

  dispatch({ type: types.TOGGLE_GROUP_ENABLED, groups });
  dispatch(filterVacancies());
};

// Action to remove exclusion group reference from keywords (necessary/unnecessary)
export const deleteExclusionGroupFromKeywords = (keywordType, groupName) => (dispatch, getState) => {
  const keywords = [...getState().form[keywordType]].filter((kw) => {
    const kwWord = typeof kw === 'string' ? kw : kw.word;
    return kwWord !== groupName;
  });

  dispatch({ type: types.CHANGE_KEYWORDS, keywordType, keywords });
  dispatch(filterVacancies());
};

