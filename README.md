# JIABA-4-NODE

REST сервис для управления задачами, реализованный на Express.js.

## Установка

```bash
npm install
```

## Запуск

```bash
# Запуск в режиме разработки
npm run dev

# Запуск в production режиме
npm start
```

Сервер запускается на порту 4000.

## API Endpoints

### Задачи (Tasks)

#### Получить все задачи
```http
GET /api/tasks
```

#### Получить задачу по ID
```http
GET /api/tasks/:id
```

#### Создать новую задачу
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Название задачи",
  "description": "Описание задачи",
  "status": "pending",
  "priority": "medium"
}
```

#### Обновить задачу
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Обновленное название",
  "status": "in-progress"
}
```

#### Удалить задачу
```http
DELETE /api/tasks/:id
```

## Структура проекта

- `src/index.js` - основной файл приложения
- `src/tasks/` - модуль задач
  - `task.model.js` - модель задачи
  - `task.router.js` - маршрутизация
  - `task.controller.js` - обработка HTTP запросов
  - `task.service.js` - бизнес-логика
  - `task.memory.repository.js` - хранение данных в памяти
  - `task.validator.js` - валидация данных

## Особенности

- Данные хранятся в памяти (in-memory)
- Поддерживается формат JSON для запросов и ответов
- Реализована валидация входных данных
- Обработка ошибок с соответствующими HTTP статусами 