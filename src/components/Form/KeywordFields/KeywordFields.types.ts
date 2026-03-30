import { KeywordTypes, Necessary, Unnecessary } from '../../../types/initialParams.types';

export interface KeywordTooltip {
  type: string,
  text: string,
}

export interface KeywordField {
  label: string,
  id: KeywordTypes,
  itemsTitle: string,
  placeholder: string,
  baseTooltip: string,
}

export interface KeywordFieldProps {
  keyword: KeywordField,
  necessary: Necessary,
  unnecessary: Unnecessary,
  AddKeyword: (name: string, inputValue: string, applyTo?: 'title' | 'description' | 'both') => void,
  DeleteKeyword: (diffName: string, inputValue: string) => void
}

export type KeywordFieldsData = Array<KeywordField>

export type CheckKeywordInList = (keywordList: Array<string>, keyword: string) => boolean
