import { NEW_IN_DAYS } from './constants/common';
import {
  CloneObj, DeclOfNum,
  FindClosestNewInDays,
  GetDataFromStorage, GetLocalStorage, IsObjectsEqual, ParseDateString, SetLocalStorage,
} from './types/common.types';
import { BaseFormFields, NewInDays, Keyword } from './types/initialParams.types';

/* Storage actions */
export const setLS: SetLocalStorage = (key, payload) => localStorage.setItem(key, JSON.stringify(payload));
export const getLS: GetLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  } catch (e) {
    // If parsing fails, return null and clean up corrupted data
    console.warn(`Failed to parse localStorage item "${key}":`, e);
    localStorage.removeItem(key);
    return null;
  }
};

export const getDataFromStorage: GetDataFromStorage = (type: string, regions) => {
  try {
    const result = getLS(type);

    if (result) {
      // Миграция keywords
      if (type === BaseFormFields.necessary || type === BaseFormFields.unnecessary) {
        return migrateKeywords(result);
      }
      return result;
    }

    if (regions) {
      const hiddenGroups = {};

      regions.forEach((section) => {
        // @ts-ignore
        hiddenGroups[section.id] = [];
      });

      return hiddenGroups;
    }

    // if (type === BaseFormFields.minSalary || type === 'lastTimeDaysAgo') {
    if (type === BaseFormFields.minSalary) {
      return '';
    }

    return [];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return null;
  }
};

/*  Objects actions */
export const isObjectsEqual: IsObjectsEqual = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);
export const cloneObj: CloneObj = (arg) => JSON.parse(JSON.stringify(arg));

/* Keywords migration */
export const migrateKeywords = (keywords: any[]): Keyword[] => {
  if (!keywords || !keywords.length) return [];

  // Если это ещё не мигрировано (строки)
  if (typeof keywords[0] === 'string') {
    return keywords.map((word) => ({ word, applyTo: 'both' as const }));
  }

  return keywords;
};

/* Склонение от числового значения, формат: (1, ['минута', 'минуты', 'минут'])  */
export const declOfNum: DeclOfNum = (number, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

export const parseDateString: ParseDateString = (dateString) => {
  const arr: Array<any> = dateString.split(/\D/);
  return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
};

export const calcLastVisit = (): NewInDays => {
  const lastVisit = new Date(getLS('lastTimeDaysAgo'));

  if (!lastVisit) {
    return NEW_IN_DAYS;
  }

  const closest = findClosestNewInDays(lastVisit);

  return NEW_IN_DAYS.map((option) => {
    option.checked = option.value === closest;

    return option;
  });
};

const findClosestNewInDays: FindClosestNewInDays = (lastVisit) => {
  // @ts-ignore
  const diffInDays = Math.abs(new Date() - lastVisit) / 86400000;

  const result = NEW_IN_DAYS.reduce((closest, item) => {
    const currentDiff = Math.abs(diffInDays - item.value);
    if (currentDiff <= closest.diff) {
      return {
        value: item.value,
        diff: currentDiff,
      };
    }

    return closest;
  }, {
    value: NEW_IN_DAYS[0].value,
    diff: diffInDays - NEW_IN_DAYS[0].value,
  });

  return result.value;
};
