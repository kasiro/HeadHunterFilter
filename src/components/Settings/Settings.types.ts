export interface SettingsState {
  theme: 'light' | 'dark' | 'auto';
  filterDefaults: {
    experience: {
      noExperience: boolean;
      between1And3: boolean;
      between3And6: boolean;
      moreThan6: boolean;
    };
    newInDays: number;
    minSalary: number;
  };
  dataManagement: {
    lastExportDate: string | null;
    lastImportDate: string | null;
  };
}

export interface ExportData {
  version: string;
  exportedAt: string;
  settings: {
    theme: string;
    minSalary: number;
    newInDays: number;
  };
  keywords: {
    necessary: any[];
    unnecessary: any[];
  };
  exclusionGroups: any[];
  favorites: string[];
  blacklist: string[];
  hiddenGroups: any;
}
