FROM node:18

# Установка пакета locales и генерация украинской локали
RUN apt-get update && apt-get install -y locales && \
    sed -i '/uk_UA.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen

# Установка переменных окружения для системы
ENV LANG uk_UA.UTF-8
ENV LC_ALL uk_UA.UTF-8

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