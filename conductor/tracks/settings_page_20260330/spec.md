# Settings Page - Specification

## Overview
Create a dedicated Settings page for HeadHunterFilter that allows users to manage application configuration including theme, filter defaults, and data export/import.

## Functional Requirements

### P0 (Critical)
1. **Theme Toggle**
   - Switch between light and dark themes
   - Preview current theme selection
   - Save preference to localStorage immediately

2. **Export Configuration**
   - Export all settings to JSON file
   - Include: keywords, exclusions, groups, theme, filter defaults
   - Download file with timestamp in name

3. **Import Configuration**
   - Upload JSON configuration file
   - Validate file structure before applying
   - Show preview of changes before confirm
   - Backup current settings before import

### P1 (High)
4. **Filter Defaults**
   - Default experience levels selection
   - Default "new vacancies" period (days)
   - Default min salary filter
   - Default regions selection

5. **Reset Settings**
   - Clear all settings to defaults
   - Confirmation dialog before reset
   - Option to selective reset (only theme, only keywords, etc.)

### P2 (Medium)
6. **UI/UX**
   - Accessible via dedicated button in Header
   - Responsive design for mobile
   - Smooth animations and transitions
   - Clear visual feedback for actions

## Non-Functional Requirements

### Performance
- Settings page load: < 500ms
- Export generation: < 1 second
- Import validation: < 500ms

### Security
- Validate imported JSON structure
- Sanitize any user-provided data
- No external API calls for settings

### Accessibility
- Keyboard navigation support
- ARIA labels for all interactive elements
- Clear focus states

## User Interface

### Layout
```
┌─────────────────────────────────────┐
│  Settings                    [Save] │
├─────────────────────────────────────┤
│                                     │
│  Theme                              │
│  ○ Light  ○ Dark  ○ Auto            │
│                                     │
│  Filter Defaults                    │
│  - Experience: [✓] Junior [✓] 1-3   │
│  - New Vacancies: [30 days]         │
│  - Min Salary: [50000]              │
│                                     │
│  Data Management                    │
│  [Export Settings]  [Import]        │
│  [Reset to Defaults]                │
│                                     │
└─────────────────────────────────────┘
```

## Acceptance Criteria
- [ ] Theme toggle works and persists across sessions
- [ ] Export creates valid JSON file with all settings
- [ ] Import validates and applies settings correctly
- [ ] Reset confirms before clearing data
- [ ] All settings persist in localStorage
- [ ] Page accessible from Header button
- [ ] Mobile responsive design

## Out of Scope
- User accounts/authentication
- Cloud sync of settings
- Settings for multiple users
