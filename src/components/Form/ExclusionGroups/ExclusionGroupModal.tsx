import React, { useState, useEffect } from 'react';
import styles from '../Form.module.scss';
import { MODAL_CONSTANTS, APPLY_TO_OPTIONS } from './ExclusionGroups.constants';
import { ExclusionGroupModalProps } from './ExclusionGroups.types';
import { ExclusionGroup } from '../../../types/initialParams.types';

interface ExclusionGroupModalWithEditProps extends ExclusionGroupModalProps {
  editingGroup?: ExclusionGroup;
}
export function ExclusionGroupModal(props: ExclusionGroupModalWithEditProps) {
  const [groupName, setGroupName] = useState('');
  const [applyTo, setApplyTo] = useState<'title' | 'description' | 'both'>('both');
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (props.editingGroup) {
      setGroupName(props.editingGroup.name);
      setApplyTo(props.editingGroup.applyTo);
      setWords(props.editingGroup.words);
    } else {
      setGroupName('');
      setApplyTo('both');
      setWords([]);
    }
    setError('');
  }, [props.editingGroup, props.isOpen]);

  const handleAddWord = () => {
    const trimmedWord = newWord.trim();
    if (!trimmedWord) return;

    if (words.some((w) => w.toLowerCase() === trimmedWord.toLowerCase())) {
      setError('Это слово уже добавлено');
      return;
    }

    setWords([...words, trimmedWord]);
    setNewWord('');
    setError('');
  };

  const handleRemoveWord = (wordToRemove: string) => {
    setWords(words.filter((w) => w !== wordToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddWord();
    }
  };

  const handleSave = () => {
    if (!groupName.trim()) {
      setError('Введите название группы');
      return;
    }

    if (words.length === 0) {
      setError('Добавьте хотя бы одно слово');
      return;
    }

    props.onSave({
      name: groupName.trim(),
      applyTo,
      words,
      isEnabled: true,
    });
  };

  if (!props.isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>
          {props.editingGroup ? MODAL_CONSTANTS.editTitle : MODAL_CONSTANTS.title}
        </h2>

        <div className={styles.modalContent}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="groupName">
              {MODAL_CONSTANTS.groupNameLabel}
            </label>
            <input
              id="groupName"
              type="text"
              className={styles.input}
              placeholder={MODAL_CONSTANTS.groupNamePlaceholder}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="applyTo">
              {MODAL_CONSTANTS.applyToLabel}
            </label>
            <select
              id="applyTo"
              className={styles.select}
              value={applyTo}
              onChange={(e) => setApplyTo(e.target.value as 'title' | 'description' | 'both')}
            >
              {APPLY_TO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="words">
              {MODAL_CONSTANTS.wordsLabel}
            </label>
            <div className={styles.wordsInput}>
              <input
                id="words"
                type="text"
                className={styles.input}
                placeholder={MODAL_CONSTANTS.wordsPlaceholder}
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                type="button"
                className={styles.btnAddWord}
                onClick={handleAddWord}
              >
                Добавить
              </button>
            </div>

            {words.length > 0 && (
              <div className={styles.wordsList}>
                {words.map((word) => (
                  <span key={word} className={styles.wordTag}>
                    {word}
                    <button
                      type="button"
                      className={styles.btnRemoveWord}
                      onClick={() => handleRemoveWord(word)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>

        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={props.onClose}
          >
            {MODAL_CONSTANTS.cancelButton}
          </button>
          <button
            type="button"
            className={styles.btnSave}
            onClick={handleSave}
          >
            {MODAL_CONSTANTS.saveButton}
          </button>
        </div>
      </div>
    </div>
  );
}

ExclusionGroupModal.defaultProps = {
  editingGroup: undefined,
};
