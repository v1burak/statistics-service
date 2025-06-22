# Деталі взаємодії з проектом

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **API сервіс статистики**: `http://localhost:3000/api/statistics`

  ## `GET /api/statistics/:autoId`

  Отримує агреговану статистику для конкретного ID.

  **URL Параметри:**

  - `autoId` (обов'язково, integer): Ідентифікатор лістингу.

  **Приклад відповіді (200 OK):**

  ```json
  {
    "autoid": 123,
    "page_views": 2,
    "phone_views": 10
  }
  ```

  ## `POST /api/statistics`

  Трекає нову подію (відкриття лістингу або номеру телефону).

  **Параметри тіла запиту (JSON):**

  - `autoId` (обов'язково, string): Ідентифікатор лістингу.
  - `type` (обов'язково, string): Тип події. Можливі значення: `"page_view"` або `"phone_view"`.
  - `fingerprint` (обов'язково, string): Ідентифікатор користувача. Значення має починатись з fingerprint-auto

  **Приклад тіла запиту:**

  ```json
  {
    "autoId": 123,
    "type": "page_view",
    "fingerprint": "fingerprint-auto-502385c710c9578e8527e589d03e4e7a"
  }
  ```

  **Відповідь:**

  - `201 Created` у разі успіху.
  ```json
  {
    message: "Event type: phone_view for hyundai-ioniq-5 has been recorded successfully"
  }
  ```
  - `400 Bad Request` у разі невалідних даних.
  - `500 Internal Server Error` у разі якоїсь біди з бд

## Попередні вимоги для запуску

- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Запуск проєкту

Проєкт можна запустити у двох режимах: **продакшн** та **дев**.

---

### 1. Prod mode:

Запуск у root папці проекту:

#### _Запуск прод моду:_

`make prod-up`

або

`docker compose -f docker-compose.prod.yml up --build -d`

#### _Зупинка прод моду:_

`make prod-down`

або

`docker compose -f docker-compose.prod.yml down`

### 2. Dev mode:

Для роботи цього режиму необхідно надати Docker дозвіл на доступ до папки з проєктом.
Щоб це зробити треба відкрити `Docker Desktop > Settings > Resources > File Sharing` і додати туди папку з проектом

#### _Запуск дев моду:_

Запуск у root папці проекту:

`make dev-up`

або

`docker compose -f docker-compose.dev.yml up --build -d`

#### _Зупинка дев моду:_

`make dev-down`

або

`docker compose -f docker-compose.dev.yml down`
