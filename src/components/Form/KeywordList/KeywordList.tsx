/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { deleteKeyword, updateKeywordApplyTo, deleteExclusionGroupFromKeywords } from '../../../redux/actions/form';
import styles from './KeywordList.module.scss';
import { KeywordListProps } from './KeywordList.types';
import { Keyword, ExclusionGroup } from '../../../types/initialParams.types';

interface ExtendedKeywordListProps extends KeywordListProps {
  exclusionGroups: ExclusionGroup[];
}

function KeywordList({ keywordType, keywordsList, deleteKeyword, updateKeywordApplyTo, exclusionGroups }: ExtendedKeywordListProps) {
  const getWord = (kw: Keyword | string): string => (typeof kw === 'string' ? kw : kw.word);
  const getApplyTo = (kw: Keyword | string): string => (typeof kw === 'string' ? 'both' : kw.applyTo);

  // Determine if this is excluded words (unnecessary) or keywords (necessary)
  const isExcluded = keywordType.id === 'unnecessary';

  // Check if a keyword is a group reference
  const findGroupByKeyword = (keyword: Keyword | string): ExclusionGroup | undefined => {
    const word = getWord(keyword);
    return exclusionGroups?.find(group => group.name === word && group.isEnabled);
  };

  const handleApplyToChange = (e: React.ChangeEvent<HTMLSelectElement>, kw: Keyword | string): void => {
    const word = getWord(kw);
    updateKeywordApplyTo(keywordType.id, word, e.target.value as 'title' | 'description' | 'both');
  };

  const handleDelete = (keyword: Keyword | string) => {
    const group = findGroupByKeyword(keyword);
    if (group) {
      // Delete group reference from keywords
      deleteExclusionGroupFromKeywords(keywordType.id, group.name);
    } else {
      deleteKeyword(keywordType.id, keyword);
    }
  };

  return (
    <>
      <h4 key="title">
        {keywordType.itemsTitle}
        :
      </h4>
      {
        keywordsList.map((keyWord) => {
          const group = findGroupByKeyword(keyWord);
          const isGroup = !!group;
          const wordId = getWord(keyWord).replace(/\s+/g, '-');

          return (
            <span
              key={getWord(keyWord)}
              className={`${styles.filterParam} ${isExcluded ? styles['filterParam--excluded'] : styles['filterParam--keyword']}`}
              onClick={() => handleDelete(keyWord)}
              data-tip={isGroup && group ? `Группа: ${group.words.join(', ')}` : undefined}
              data-effect="solid"
              data-for={`keyword-tooltip-${keywordType.id}-${wordId}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleDelete(keyWord);
                }
              }}
            >
              {getWord(keyWord)}
              {isGroup && (
                <span className={styles.groupBadge}>Группа</span>
              )}
            </span>
          );
        })
      }
      <ReactTooltip id={`keyword-tooltip-${keywordType.id}`} />
    </>
  );
}

const mapStateToProps = ({ form }: { form: { exclusionGroups: ExclusionGroup[] } }) => ({
  exclusionGroups: form.exclusionGroups,
});

const mapDispatchToProps = {
  deleteKeyword,
  updateKeywordApplyTo,
  deleteExclusionGroupFromKeywords,
};

export default connect(mapStateToProps, mapDispatchToProps)(KeywordList);
