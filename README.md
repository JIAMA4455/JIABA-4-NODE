# JIABA-4-NODE

REST сервис для управления задачами, реализованный на Express.js и TypeScript.

## Установка

```bash
npm install
```

## Запуск

### Локальный запуск

```bash
# Запуск в режиме разработки
npm run dev

# Запуск в production режиме
npm run build
npm start
```

Сервер запускается на порту 4000.

### Запуск с Docker

1. Установите Docker и Docker Compose
2. Создайте файл `.env` в корневой директории проекта:
```env
# База данных
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=tasks_db
DB_HOST=postgres
DB_PORT=5432

# PgAdmin
PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=admin
```

3. Запустите приложение:
```bash
docker-compose up -d
```

4. Доступ к сервисам:
   - REST API: http://localhost:4000
   - PgAdmin: http://localhost:5050
     - Email: admin@admin.com
     - Password: admin

5. Остановка приложения:
```bash
docker-compose down
```

### Миграции базы данных

1. Генерация миграции:
```bash
npm run migration:generate -- src/migrations/CreateTasksTable
```

2. Запуск миграций:
```bash
npm run migration:run
```

3. Откат последней миграции:
```bash
npm run migration:revert
```

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

- `src/index.ts` - основной файл приложения
- `src/config/` - конфигурация приложения
  - `data-source.ts` - конфигурация TypeORM
- `src/tasks/` - модуль задач
  - `task.model.ts` - модель задачи
  - `task.router.ts` - маршрутизация
  - `task.controller.ts` - обработка HTTP запросов
  - `task.service.ts` - бизнес-логика
  - `task.repository.ts` - работа с базой данных
  - `task.validator.ts` - валидация данных
- `src/logger/` - модуль логирования
  - `logger.ts` - конфигурация и middleware для логирования
- `src/migrations/` - миграции базы данных

## Особенности

- PostgreSQL в качестве базы данных
- TypeORM для работы с базой данных
- Миграции для управления схемой базы данных
- Поддерживается формат JSON для запросов и ответов
- Реализована валидация входных данных
- Обработка ошибок с соответствующими HTTP статусами
- Логирование запросов и ошибок
- Docker-контейнеризация с PostgreSQL и PgAdmin
