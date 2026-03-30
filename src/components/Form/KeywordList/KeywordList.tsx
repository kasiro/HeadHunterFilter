/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import { deleteKeyword, updateKeywordApplyTo } from '../../../redux/actions/form';
import styles from './KeywordList.module.scss';
import { KeywordListProps } from './KeywordList.types';
import { Keyword } from '../../../types/initialParams.types';

function KeywordList({ keywordType, keywordsList, deleteKeyword }: KeywordListProps) {
  const getWord = (kw: Keyword | string): string => (typeof kw === 'string' ? kw : kw.word);
  const getApplyTo = (kw: Keyword | string): string => (typeof kw === 'string' ? 'both' : kw.applyTo);

  const handleApplyToChange = (e: React.ChangeEvent<HTMLSelectElement>, kw: Keyword | string): void => {
    const word = getWord(kw);
    updateKeywordApplyTo(keywordType.id, word, e.target.value as 'title' | 'description' | 'both');
  };

  return (
    <>
      <h4 key="title">
        {keywordType.itemsTitle}
        :
      </h4>
      {
        keywordsList.map((keyWord) => (
          <span
            className={styles.filterParam}
            onClick={() => deleteKeyword(keywordType.id, keyWord)}
            key={getWord(keyWord)}
          >
            {getWord(keyWord)}
            <select
              className={styles.keywordApplyToBadge}
              value={getApplyTo(keyWord)}
              onChange={(e) => handleApplyToChange(e, keyWord)}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="title">название</option>
              <option value="description">описание</option>
              <option value="both">оба</option>
            </select>
          </span>
        ))
      }
    </>
  );
}

const mapDispatchToProps = {
  deleteKeyword,
};

export default connect(null, mapDispatchToProps)(KeywordList);
