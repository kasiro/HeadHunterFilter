import { KeywordTypes, Keyword } from '../../../types/initialParams.types';
import { KeywordField } from '../KeywordFields/KeywordFields.types';

export interface KeywordListProps {
    keywordType: KeywordField,
    keywordsList: Array<Keyword | string>,
    deleteKeyword: (id: KeywordTypes, keyWord: Keyword | string) => void,
    updateKeywordApplyTo: (id: KeywordTypes, word: string | Keyword, applyTo: 'title' | 'description' | 'both') => void
}

