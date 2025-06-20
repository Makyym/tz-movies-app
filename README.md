# Movies App

Це тестове завдання - додаток для роботи з фільмами.

## Опис

Додаток дозволяє:
- Переглядати, додавати, видаляти та імпортувати фільми.
- Конфігурувати URL адресу API через змінну оточення.

## Локальний запуск

### 1. Встановлення залежностей

Відкрийте термінал у корені проєкту та виконайте:

```bash
npm install
```

### 2. Запуск у режимі розробки
Для запуску програми в режимі розробки виконайте:
```bash
npm start
```
Відкрити застосунок можна за адресою https://localhost:3000.

### 3. Збірка додатку
Для збірки додатку для продакшн-оточення виконайте:
```bash
npm run build
```

### 4. Конфігурація через змінні оточення
Додаток використовує змінну оточення, щоб вказати API URL.
Створіть в коренні проєкту файл .env із наступним вмістом

```bash
API_URL=http://localhost:8000/api/v1
```
Якщо бекенд використовує іншу адресу, замініть значення API URL відповідно, наприклад:
```bash
API_URL=http://192.168.1.44:8000/api/v1
```
В проєкті ця змінна використовується для налаштування базового API URL.

## Робота с Docker

### 1. Збірка Docker образу
В корені проєкту є Dockerfile. Для збірки виконайте команду:
```bash
docker build -t your_super_account/movies .
```
Замените ``your_super_account`` на ваш логин в DockerHub.

### 2. Запуск Docker контейнеру
Запустіть контейнер, передавши змінну оточення з API URL:
```bash
docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 your_super_account/movies
```
Щоб вказати іншу адресу API, змініть значення змінної оточення, наприклад
```bash
docker run --name movies -p 3000:3000 -e API_URL=http://192.168.1.44:8000/api/v1 your_super_account/movies
```
Додаток буде доступний за адресою http://localhost:3000.

## DockerHub
Після збірки образу, залогінтесь у DockerHub:
```bash
docker login
```
Після уього відправте образ (push) у DockerHub:
```bash
docker push your_super_account/movies:latest
```
Образ будет доступен по ссылке:
``https://hub.docker.com/r/your_super_account/movies``

## Підсумкова команда запуску
Запуск програми через Docker здійснюється однією командою:
```bash
docker run --name movies -p 3000:3000 -e REACT_APP_API_URL=http://localhost:8000/api/v1 your_super_account/movies
```
Ця команда запускає контейнер з ім'ям ``movies``, публікує порт 3000 і передає змінну оточення для конфігурації API URL.