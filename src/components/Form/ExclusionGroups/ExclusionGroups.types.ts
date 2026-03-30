import { ExclusionGroup } from '../../../types/initialParams.types';

export interface ExclusionGroupsProps {
  exclusionGroups: ExclusionGroup[];
  onAddGroup: (group: Omit<ExclusionGroup, 'id'>) => void;
  onRemoveGroup: (groupId: string) => void;
  onUpdateGroup: (groupId: string, updates: Partial<ExclusionGroup>) => void;
  onAddWord: (groupId: string, word: string) => void;
  onRemoveWord: (groupId: string, word: string) => void;
  onToggleEnabled: (groupId: string) => void;
}

export interface ExclusionGroupItemProps {
  group: ExclusionGroup;
  onRemove: (groupId: string) => void;
  onUpdate: (groupId: string, updates: Partial<ExclusionGroup>) => void;
  onAddWord: (groupId: string, word: string) => void;
  onRemoveWord: (groupId: string, word: string) => void;
  onToggleEnabled: (groupId: string) => void;
}

export interface ExclusionGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (group: Omit<ExclusionGroup, 'id'>) => void;
  existingGroups: ExclusionGroup[];
}

export interface WordSelectorProps {
  selectedWords: string[];
  availableWords: string[];
  onAddWord: (word: string) => void;
  onRemoveWord: (word: string) => void;
}
