# HeadHunterFilter - Technology Stack

## Core Technologies

### Language
- **TypeScript 4.0** - Типизация для всего проекта

### Frontend
- **React 17** - UI библиотека
- **React Redux** - State management
- **Redux Thunk** - Асинхронные действия
- **React Router** - (опционально для Settings page)

### Styles
- **SCSS (Sass 1.49)** - Основные стили
- **Tailwind CSS** - Утилитарные классы (планируется)
- **CSS Custom Properties** - Темизация (light/dark)

### Build Tools
- **Webpack 5** (через react-scripts 5 / CRA)
- **Babel** - Транспиляция
- **PostCSS** - Обработка CSS

### Backend (Optional)
- **Express.js** - API сервер
- **Body Parser** - Парсинг request body
- **CORS** - Cross-origin requests

### AI/ML
- **Genkit** - AI рекомендации вакансий

### DevTools
- **ESLint** (Airbnb config) - Linting
- **Prettier** - Formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

## Planned Additions

### Tailwind CSS Integration
- **Purpose**: Утилитарные классы для быстрой разработки
- **Config**: tailwind.config.js с кастомной темой
- **Migration**: Постепенная замена SCSS классов на Tailwind

### Testing
- **Jest** - Unit тесты
- **React Testing Library** - Component тесты

## Version Constraints
```json
{
  "react": "^17.0.1",
  "typescript": "~4.0.5",
  "sass": "^1.49.9",
  "react-redux": "^7.2.2",
  "tailwindcss": "^3.0.0" (planned)
}
```

## Migration Notes
- Постепенная миграция на Tailwind CSS
- Сохранение обратной совместимости с SCSS
- Class Components → React Hooks (постепенно)
