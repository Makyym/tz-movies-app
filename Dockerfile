# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем глобально пакет serve для раздачи статики
RUN npm install -g serve

# Экспортируем порт (например, 3000)
EXPOSE 3000

# Запускаем приложение (serve будет раздавать файлы из папки build)
CMD ["serve", "-s", "build", "-l", "3000"]