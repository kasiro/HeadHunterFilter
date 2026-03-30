# HeadHunterFilter - Product Guide

## Vision
Персональный инструмент для поиска и фильтрации вакансий на hh.ru с расширенными возможностями и кастомизацией.

## Target Audience
- **Основной пользователь**: Разработчик для личного использования
- **Вторичные**: Соискатели, ищущие эффективный способ мониторинга вакансий

## User Stories
1. **Как соискатель**, я хочу фильтровать вакансии по ключевым словам, чтобы видеть только релевантные предложения
2. **Как пользователь**, я хочу сохранять настройки в localStorage, чтобы не настраивать приложение каждый раз
3. **Как аналитик**, я хочу видеть статистику по вакансиям, чтобы понимать тренды рынка
4. **Как разработчик**, я хочу AI-рекомендации, чтобы находить скрытые возможности

## Functional Requirements
### P0 (Critical)
- Фильтрация вакансий по ключевым словам (necessary/unnecessary)
- Группировка по опыту работы (jun, 1-3, 3-6, >6 лет)
- Избранное и скрытые вакансии
- Переключение регионов поиска
- Тёмная/светлая тема

### P1 (High)
- ~~Страница настроек с экспортом/импортом конфигурации~~ ✅ **РЕАЛИЗОВАНО**
  - Theme toggle (light/dark)
  - Export/Import JSON configuration
  - Filter defaults (experience, days, salary)
  - Reset settings
  - Accessible via ⚙️ button in Header
- Реактивная фильтрация без перезагрузки
- Отображение зарплаты в рублях и долларах
- Группы исключений слов

### P2 (Medium)
- AI-рекомендации вакансий (Genkit)
- Аналитика и статистика
- Мобильная адаптация

## Non-Functional Requirements
### Performance
- **First Paint**: < 2 секунд
- **Filter Response**: < 100ms (client-side filtering)
- **API Requests**: Кэширование результатов на 5 минут
- **Bundle Size**: < 500KB (gzip)

### Reliability
- localStorage backup при ошибках
- Graceful degradation при недоступности hh.ru API
- Error boundaries для React компонентов

## Acceptance Criteria
- [x] Фильтрация работает без перезагрузки страницы
- [x] Тёма сохраняется между сессиями
- [x] Ключевые слова применяются к названию и описанию
- [x] Группы вакансий корректно приоритизируются
- [x] Settings page позволяет экспортировать/импортировать настройки ✅ **РЕАЛИЗОВАНО**

## Tech Stack
- **Frontend**: React 17, TypeScript, Redux, Redux Thunk
- **Styles**: SCSS (Sass 1.49)
- **Build**: Webpack (react-scripts 5 / CRA)
- **Backend (opt)**: Express.js, Body Parser, CORS
- **AI**: Genkit (для AI-функций)

## Out of Scope
- Интеграция с другими job-сайтами (пока только hh.ru)
- Полноценная мобильная app (только адаптация)
- Real-time уведомления
