# HeadHunterFilter - Product Guidelines

## Code Style
- **Standard**: Airbnb Style Guide для JavaScript/TypeScript
- **ESLint**: eslint-config-airbnb с кастомными правилами
- **Prettier**: Автоматическое форматирование кода

## Naming Conventions
- **Переменные/функции**: snake_case (например, `handle_click`, `user_data`)
- **Компоненты**: PascalCase (например, `KeywordFields`, `ExclusionGroups`)
- **Файлы**: kebab-case для SCSS, PascalCase для React компонентов
- **CSS классы**: BEM-like (например, `.exclusionGroupItem`, `.btnKeyword`)

## Theme Implementation
- **CSS Custom Properties**: --bg-primary, --text-primary и т.д.
- **Темы**: .dark-theme класс на documentElement
- **SCSS Variables**: Мэппинг на CSS variables для темизации
- **Tailwind-inspired**: Утилитарный подход к классам

## Component Architecture
- **React Hooks**: Функциональные компоненты для новой функциональности
- **Class Components**: Существующие классы сохраняются
- **Mixed Approach**: Постепенная миграция на хуки
- **Redux**: Connect HOC для state management

## UX Principles
- **Минимализм**: Только необходимые элементы управления
- **Простота**: Интуитивная навигация без обучения
- **Реактивность**: Мгновенный отклик на действия пользователя
- **Доступность**: ARIA labels, keyboard navigation

## Performance Guidelines
- **Client-side Filtering**: Приоритет локальной фильтрации
- **Lazy Loading**: Загрузка данных по требованию
- **Memoization**: useMemo/useCallback для тяжёлых вычислений
- **Bundle Optimization**: Code splitting для больших модулей
