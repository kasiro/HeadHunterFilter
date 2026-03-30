import React, { useState } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { ReactComponent as Info } from '../../../assets/info.svg';
import {
  addExclusionGroup,
  removeExclusionGroup,
  updateExclusionGroup,
  addWordToGroup,
  removeWordFromGroup,
  toggleGroupEnabled,
} from '../../../redux/actions/form';
import { ExclusionGroup } from '../../../types/initialParams.types';
import styles from '../Form.module.scss';
import { EXCLUSION_GROUPS_DATA } from './ExclusionGroups.constants';
import { ExclusionGroupsProps } from './ExclusionGroups.types';
import { ExclusionGroupModal } from './ExclusionGroupModal';
import { ExclusionGroupItem } from './ExclusionGroupItem';

function ExclusionGroups(props: ExclusionGroupsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<ExclusionGroup | null>(null);

  const handleOpenModal = () => {
    setEditingGroup(null);
    setIsModalOpen(true);
  };

  const handleEditGroup = (group: ExclusionGroup) => {
    setEditingGroup(group);
    setIsModalOpen(true);
  };

  const handleSaveGroup = (groupData: Omit<ExclusionGroup, 'id'>) => {
    if (editingGroup) {
      props.onUpdateGroup(editingGroup.id, groupData);
    } else {
      props.onAddGroup(groupData);
    }
    setIsModalOpen(false);
    setEditingGroup(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGroup(null);
  };

  return (
    <div className={styles.exclusionGroups}>
      <div className={styles.exclusionGroupsHeader}>
        <span className={styles.label}>
          {EXCLUSION_GROUPS_DATA.label}
          <Info
            data-tip="Группы слов для исключения вакансий. Вакансия будет скрыта, если содержит любое слово из активной группы."
            data-effect="solid"
          />
          <ReactTooltip />
        </span>
        <button
          type="button"
          className={styles.btnAddGroup}
          onClick={handleOpenModal}
        >
          {EXCLUSION_GROUPS_DATA.addGroupButton}
        </button>
      </div>

      {props.exclusionGroups.length > 0 && (
        <div className={styles.exclusionGroupsList}>
          {props.exclusionGroups.map((group) => (
            <ExclusionGroupItem
              key={group.id}
              group={group}
              onRemove={props.onRemoveGroup}
              onUpdate={props.onUpdateGroup}
              onEdit={handleEditGroup}
              onAddWord={props.onAddWord}
              onRemoveWord={props.onRemoveWord}
              onToggleEnabled={props.onToggleEnabled}
            />
          ))}
        </div>
      )}

      <ExclusionGroupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveGroup}
        existingGroups={props.exclusionGroups}
        editingGroup={editingGroup || undefined}
      />
    </div>
  );
}

const mapStateToProps = ({ form }: { form: { exclusionGroups: ExclusionGroup[] } }) => ({
  exclusionGroups: form.exclusionGroups,
});

const mapDispatchToProps = {
  onAddGroup: addExclusionGroup,
  onRemoveGroup: removeExclusionGroup,
  onUpdateGroup: updateExclusionGroup,
  onAddWord: addWordToGroup,
  onRemoveWord: removeWordFromGroup,
  onToggleEnabled: toggleGroupEnabled,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExclusionGroups);
