import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { ReactComponent as Edit } from '../../../assets/edit.svg';
import { ReactComponent as Trash } from '../../../assets/trash.svg';
import { ReactComponent as Plus } from '../../../assets/plus.svg';
import { ReactComponent as X } from '../../../assets/x.svg';
import styles from '../Form.module.scss';
import { APPLY_TO_OPTIONS, TOOLTIPS } from './ExclusionGroups.constants';
import { ExclusionGroupItemProps } from './ExclusionGroups.types';
import { ExclusionGroup } from '../../../types/initialParams.types';

interface ExclusionGroupItemWithEditProps extends ExclusionGroupItemProps {
  onEdit: (group: ExclusionGroup) => void;
}

export function ExclusionGroupItem(props: ExclusionGroupItemWithEditProps) {
  const { group } = props;
  const [newWord, setNewWord] = useState('');

  const handleAddWord = () => {
    if (newWord.trim()) {
      props.onAddWord(group.id, newWord.trim());
      setNewWord('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddWord();
    }
  };

  const getApplyToLabel = (applyTo: string) => {
    const option = APPLY_TO_OPTIONS.find((opt) => opt.value === applyTo);
    return option?.label || applyTo;
  };

  return (
    <div className={`${styles.exclusionGroupItem} ${!group.isEnabled ? styles.disabled : ''}`}>
      <div className={styles.exclusionGroupHeader}>
        <div className={styles.exclusionGroupInfo}>
          <input
            type="checkbox"
            checked={group.isEnabled}
            onChange={() => props.onToggleEnabled(group.id)}
            className={styles.groupCheckbox}
            data-tip={TOOLTIPS.groupEnabled}
          />
          <ReactTooltip />
          <span className={styles.groupName}>{group.name}</span>
          <span className={styles.groupApplyTo}>{getApplyToLabel(group.applyTo)}</span>
          <span className={styles.wordsCount}>
            (
            {group.words.length}
            {' '}
            слов)
          </span>
        </div>
        <div className={styles.exclusionGroupActions}>
          <button
            type="button"
            className={styles.btnIcon}
            onClick={() => props.onEdit(group)}
            data-tip={TOOLTIPS.editGroup}
          >
            <Edit />
          </button>
          <ReactTooltip />
          <button
            type="button"
            className={styles.btnIcon}
            onClick={() => props.onRemove(group.id)}
            data-tip={TOOLTIPS.removeGroup}
          >
            <Trash />
          </button>
          <ReactTooltip />
        </div>
      </div>

      {group.words.length > 0 && (
        <div className={styles.wordsList}>
          {group.words.map((word) => (
            <span key={word} className={styles.wordTag}>
              {word}
              <button
                type="button"
                className={styles.btnRemoveWord}
                onClick={() => props.onRemoveWord(group.id, word)}
                data-tip={TOOLTIPS.removeWord}
              >
                <X />
              </button>
              <ReactTooltip />
            </span>
          ))}
        </div>
      )}

      <div className={styles.addWordForm}>
        <input
          type="text"
          className={styles.wordInput}
          placeholder="Добавить слово..."
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          className={styles.btnIconSmall}
          onClick={handleAddWord}
          disabled={!newWord.trim()}
          data-tip={TOOLTIPS.addWord}
        >
          <Plus />
        </button>
        <ReactTooltip />
      </div>
    </div>
  );
}
