import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setLS, getLS } from '../../helpers';
import { BaseFormFields } from '../../types/initialParams.types';
import { toggleTheme as toggleThemeAction } from '../../redux/actions/app';
import styles from './Settings.module.scss';
import { SettingsState, ExportData } from './Settings.types';

interface SettingsProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

function Settings({ theme, toggleTheme }: SettingsProps) {
  const [settings, setSettings] = useState<SettingsState>({
    theme: theme,
    filterDefaults: {
      experience: {
        noExperience: false,
        between1And3: true,
        between3And6: false,
        moreThan6: false,
      },
      newInDays: 30,
      minSalary: getLS(BaseFormFields.minSalary) || 0,
    },
    dataManagement: {
      lastExportDate: null,
      lastImportDate: null,
    },
  });

  const [importError, setImportError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Load settings on mount - sync with actual localStorage
  useEffect(() => {
    const savedTheme = getLS('theme') || 'light';
    const savedMinSalary = getLS(BaseFormFields.minSalary) || 0;
    const savedNewInDays = getLS('newInDays') || 30;

    setSettings(prev => ({
      ...prev,
      theme: savedTheme,
      filterDefaults: {
        ...prev.filterDefaults,
        minSalary: savedMinSalary,
        newInDays: savedNewInDays,
      },
    }));
  }, []);

  // Theme toggle handler - uses Redux action
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    const isDark = newTheme === 'dark';
    document.documentElement.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', newTheme);
    setSettings(prev => ({ ...prev, theme: newTheme }));
    toggleTheme(); // Dispatch Redux action to sync state
  };

  // Back to main page
  const handleBack = () => {
    window.location.reload();
  };

  // Filter defaults handlers
  const handleExperienceChange = (experience: keyof SettingsState['filterDefaults']['experience']) => {
    setSettings(prev => ({
      ...prev,
      filterDefaults: {
        ...prev.filterDefaults,
        experience: {
          ...prev.filterDefaults.experience,
          [experience]: !prev.filterDefaults.experience[experience],
        },
      },
    }));
  };

  const handleMinSalaryChange = (value: number) => {
    setSettings(prev => ({
      ...prev,
      filterDefaults: { ...prev.filterDefaults, minSalary: value },
    }));
    setLS(BaseFormFields.minSalary, value);
  };

  const handleNewInDaysChange = (value: number) => {
    setSettings(prev => ({
      ...prev,
      filterDefaults: { ...prev.filterDefaults, newInDays: value },
    }));
    setLS('newInDays', value);
  };

  // Export settings
  const handleExport = () => {
    const exportData: ExportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      settings: {
        theme: settings.theme,
        minSalary: settings.filterDefaults.minSalary,
        newInDays: settings.filterDefaults.newInDays,
      },
      keywords: {
        necessary: getLS(BaseFormFields.necessary) || [],
        unnecessary: getLS(BaseFormFields.unnecessary) || [],
      },
      exclusionGroups: getLS(BaseFormFields.exclusionGroups) || [],
      favorites: getLS(BaseFormFields.favorites) || [],
      blacklist: getLS(BaseFormFields.blacklist) || [],
      hiddenGroups: getLS(BaseFormFields.hiddenGroups) || {},
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hh-filter-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSettings(prev => ({
      ...prev,
      dataManagement: { ...prev.dataManagement, lastExportDate: new Date().toISOString() },
    }));
  };

  // Import settings
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as ExportData;
        
        // Validate structure
        if (!data.version || !data.settings) {
          throw new Error('Invalid file structure');
        }

        // Show confirmation
        if (window.confirm('Import settings? This will overwrite current settings.')) {
          // Apply settings
          if (data.settings.theme) {
            handleThemeChange(data.settings.theme as 'light' | 'dark');
          }
          if (data.settings.minSalary !== undefined) {
            handleMinSalaryChange(data.settings.minSalary);
          }
          if (data.settings.newInDays !== undefined) {
            handleNewInDaysChange(data.settings.newInDays);
          }
          if (data.keywords) {
            setLS(BaseFormFields.necessary, data.keywords.necessary);
            setLS(BaseFormFields.unnecessary, data.keywords.unnecessary);
          }
          if (data.exclusionGroups) {
            setLS(BaseFormFields.exclusionGroups, data.exclusionGroups);
          }
          if (data.favorites) {
            setLS(BaseFormFields.favorites, data.favorites);
          }
          if (data.blacklist) {
            setLS(BaseFormFields.blacklist, data.blacklist);
          }
          if (data.hiddenGroups) {
            setLS(BaseFormFields.hiddenGroups, data.hiddenGroups);
          }

          setSettings(prev => ({
            ...prev,
            dataManagement: { ...prev.dataManagement, lastImportDate: new Date().toISOString() },
          }));
          setImportError(null);
        }
      } catch (err) {
        setImportError('Failed to import: Invalid JSON file');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  // Reset settings
  const handleReset = () => {
    if (window.confirm('Reset all settings to defaults? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className={styles.settings}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack}>
          ← Назад
        </button>
        <h1 className={styles.title}>Settings</h1>
      </div>

      {/* Theme Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Theme</h2>
        <div className={styles.themeOptions}>
          <label className={styles.themeOption}>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={settings.theme === 'light'}
              onChange={() => handleThemeChange('light')}
            />
            <span className={styles.themeLabel}>☀️ Light</span>
          </label>
          <label className={styles.themeOption}>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={settings.theme === 'dark'}
              onChange={() => handleThemeChange('dark')}
            />
            <span className={styles.themeLabel}>🌙 Dark</span>
          </label>
        </div>
      </section>

      {/* Filter Defaults Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Filter Defaults</h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Experience Levels:</label>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={settings.filterDefaults.experience.noExperience}
                onChange={() => handleExperienceChange('noExperience')}
              />
              <span>No Experience</span>
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={settings.filterDefaults.experience.between1And3}
                onChange={() => handleExperienceChange('between1And3')}
              />
              <span>1-3 Years</span>
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={settings.filterDefaults.experience.between3And6}
                onChange={() => handleExperienceChange('between3And6')}
              />
              <span>3-6 Years</span>
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={settings.filterDefaults.experience.moreThan6}
                onChange={() => handleExperienceChange('moreThan6')}
              />
              <span>6+ Years</span>
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>New Vacancies (days):</label>
          <input
            type="number"
            className={styles.input}
            value={settings.filterDefaults.newInDays}
            onChange={(e) => handleNewInDaysChange(Number(e.target.value))}
            min="1"
            max="365"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Min Salary:</label>
          <input
            type="number"
            className={styles.input}
            value={settings.filterDefaults.minSalary}
            onChange={(e) => handleMinSalaryChange(Number(e.target.value))}
            min="0"
            step="1000"
          />
        </div>
      </section>

      {/* Data Management Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Data Management</h2>
        
        <div className={styles.buttonGroup}>
          <button className={styles.btn} onClick={handleExport}>
            Export Settings
          </button>
          
          <label className={styles.btn}>
            Import Settings
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
          
          <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleReset}>
            Reset All
          </button>
        </div>

        {importError && <p className={styles.error}>{importError}</p>}
        
        <div className={styles.lastActions}>
          {settings.dataManagement.lastExportDate && (
            <p className={styles.info}>
              Last export: {new Date(settings.dataManagement.lastExportDate).toLocaleString()}
            </p>
          )}
          {settings.dataManagement.lastImportDate && (
            <p className={styles.info}>
              Last import: {new Date(settings.dataManagement.lastImportDate).toLocaleString()}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = ({ app }: { app: { theme: 'light' | 'dark' } }) => ({
  theme: app.theme,
});

const mapDispatchToProps = {
  toggleTheme: toggleThemeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
