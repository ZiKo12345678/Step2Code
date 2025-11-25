-- Insert 3 Roadmaps
INSERT INTO roadmaps (id, title, slug, description) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Frontend Developer', 'frontend', 'Изучите современную frontend-разработку от основ до React'),
  ('a2222222-2222-2222-2222-222222222222', 'Backend Developer', 'backend', 'Освойте backend-разработку с Node.js и базами данных'),
  ('a3333333-3333-3333-3333-333333333333', 'DevOps Engineer', 'devops', 'Станьте DevOps инженером: Docker, CI/CD, облачные платформы');

-- Insert Frontend Roadmap Steps
INSERT INTO roadmap_steps (id, roadmap_id, title, content, order_index, parent_step_id) VALUES
  ('b1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'HTML Basics', 'Основы HTML: теги, атрибуты, семантическая разметка', 1, NULL),
  ('b1111112-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'CSS Basics', 'Основы CSS: селекторы, box model, flexbox и grid', 2, NULL),
  ('b1111113-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'JavaScript Basics', 'Основы JavaScript: переменные, функции, объекты и массивы', 3, NULL),
  ('b1111114-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Git & GitHub', 'Система контроля версий Git и работа с GitHub', 4, NULL),
  ('b1111115-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'React Intro', 'Введение в React: компоненты, props, state и hooks', 5, NULL);

-- Insert Backend Roadmap Steps
INSERT INTO roadmap_steps (id, roadmap_id, title, content, order_index, parent_step_id) VALUES
  ('b2222221-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'Node.js Basics', 'Основы Node.js: модули, npm, асинхронное программирование', 1, NULL),
  ('b2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'Express.js', 'Создание REST API с помощью Express.js', 2, NULL),
  ('b2222223-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'PostgreSQL', 'Реляционные базы данных и SQL запросы', 3, NULL),
  ('b2222224-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'Authentication', 'JWT токены и безопасная аутентификация', 4, NULL),
  ('b2222225-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'API Design', 'REST API best practices и документация', 5, NULL);

-- Insert DevOps Roadmap Steps
INSERT INTO roadmap_steps (id, roadmap_id, title, content, order_index, parent_step_id) VALUES
  ('b3333331-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', 'Linux Basics', 'Основы Linux: командная строка, файловая система', 1, NULL),
  ('b3333332-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', 'Docker Basics', 'Контейнеризация с Docker: образы и контейнеры', 2, NULL),
  ('b3333333-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', 'CI/CD Pipeline', 'Настройка CI/CD с GitHub Actions', 3, NULL),
  ('b3333334-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', 'Cloud Basics', 'Облачные платформы: AWS, GCP, Azure', 4, NULL),
  ('b3333335-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', 'Monitoring', 'Мониторинг и логирование приложений', 5, NULL);

-- Insert Step Verifications (quiz type for all steps)
INSERT INTO step_verifications (id, step_id, type) VALUES
  -- Frontend
  ('c1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'quiz'),
  ('c1111112-1111-1111-1111-111111111111', 'b1111112-1111-1111-1111-111111111111', 'quiz'),
  ('c1111113-1111-1111-1111-111111111111', 'b1111113-1111-1111-1111-111111111111', 'quiz'),
  ('c1111114-1111-1111-1111-111111111111', 'b1111114-1111-1111-1111-111111111111', 'quiz'),
  ('c1111115-1111-1111-1111-111111111111', 'b1111115-1111-1111-1111-111111111111', 'quiz'),
  -- Backend
  ('c2222221-2222-2222-2222-222222222222', 'b2222221-2222-2222-2222-222222222222', 'quiz'),
  ('c2222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', 'quiz'),
  ('c2222223-2222-2222-2222-222222222222', 'b2222223-2222-2222-2222-222222222222', 'quiz'),
  ('c2222224-2222-2222-2222-222222222222', 'b2222224-2222-2222-2222-222222222222', 'quiz'),
  ('c2222225-2222-2222-2222-222222222222', 'b2222225-2222-2222-2222-222222222222', 'quiz'),
  -- DevOps
  ('c3333331-3333-3333-3333-333333333333', 'b3333331-3333-3333-3333-333333333333', 'quiz'),
  ('c3333332-3333-3333-3333-333333333333', 'b3333332-3333-3333-3333-333333333333', 'quiz'),
  ('c3333333-3333-3333-3333-333333333333', 'b3333333-3333-3333-3333-333333333333', 'quiz'),
  ('c3333334-3333-3333-3333-333333333333', 'b3333334-3333-3333-3333-333333333333', 'quiz'),
  ('c3333335-3333-3333-3333-333333333333', 'b3333335-3333-3333-3333-333333333333', 'quiz');

-- Insert Quiz Questions (3 questions per verification)
-- Frontend - HTML Basics
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c1111111-1111-1111-1111-111111111111', 'Что означает HTML?', ARRAY['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], 0),
  ('c1111111-1111-1111-1111-111111111111', 'Какой тег используется для создания гиперссылки?', ARRAY['<link>', '<a>', '<href>', '<url>'], 1),
  ('c1111111-1111-1111-1111-111111111111', 'Какой тег определяет заголовок самого высокого уровня?', ARRAY['<head>', '<h6>', '<h1>', '<header>'], 2);

-- Frontend - CSS Basics
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c1111112-1111-1111-1111-111111111111', 'Что означает CSS?', ARRAY['Computer Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'], 2),
  ('c1111112-1111-1111-1111-111111111111', 'Какое свойство используется для изменения цвета текста?', ARRAY['text-color', 'font-color', 'color', 'text-style'], 2),
  ('c1111112-1111-1111-1111-111111111111', 'Что такое Box Model в CSS?', ARRAY['Модель для создания коробок', 'Модель отступов и границ элемента', 'Способ группировки стилей', 'Метод позиционирования'], 1);

-- Frontend - JavaScript Basics
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c1111113-1111-1111-1111-111111111111', 'Какой оператор используется для объявления переменной?', ARRAY['var, let, const', 'variable', 'int', 'dim'], 0),
  ('c1111113-1111-1111-1111-111111111111', 'Что вернет typeof []?', ARRAY['array', 'object', 'list', 'collection'], 1),
  ('c1111113-1111-1111-1111-111111111111', 'Какой метод добавляет элемент в конец массива?', ARRAY['append()', 'push()', 'add()', 'insert()'], 1);

-- Frontend - Git & GitHub
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c1111114-1111-1111-1111-111111111111', 'Какая команда создает новый коммит?', ARRAY['git push', 'git commit', 'git save', 'git add'], 1),
  ('c1111114-1111-1111-1111-111111111111', 'Что делает команда git clone?', ARRAY['Создает копию репозитория', 'Удаляет репозиторий', 'Обновляет код', 'Создает ветку'], 0),
  ('c1111114-1111-1111-1111-111111111111', 'Какая команда показывает статус файлов?', ARRAY['git show', 'git status', 'git state', 'git check'], 1);

-- Frontend - React Intro
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c1111115-1111-1111-1111-111111111111', 'Что такое JSX?', ARRAY['JavaScript Extended', 'Расширение синтаксиса JavaScript', 'Java Syntax Extension', 'JSON XML'], 1),
  ('c1111115-1111-1111-1111-111111111111', 'Какой хук используется для управления состоянием?', ARRAY['useEffect', 'useState', 'useContext', 'useReducer'], 1),
  ('c1111115-1111-1111-1111-111111111111', 'Что такое props в React?', ARRAY['Методы компонента', 'Свойства, передаваемые компоненту', 'Состояние компонента', 'События компонента'], 1);

-- Backend - Node.js Basics
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c2222221-2222-2222-2222-222222222222', 'Что такое Node.js?', ARRAY['Фреймворк JavaScript', 'Среда выполнения JavaScript', 'База данных', 'Библиотека для фронтенда'], 1),
  ('c2222221-2222-2222-2222-222222222222', 'Какой менеджер пакетов используется по умолчанию?', ARRAY['yarn', 'pnpm', 'npm', 'bower'], 2),
  ('c2222221-2222-2222-2222-222222222222', 'Что делает require()?', ARRAY['Создает модуль', 'Импортирует модуль', 'Экспортирует модуль', 'Удаляет модуль'], 1);

-- Backend - Express.js
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c2222222-2222-2222-2222-222222222222', 'Что такое Express.js?', ARRAY['База данных', 'Web-фреймворк для Node.js', 'Язык программирования', 'CSS фреймворк'], 1),
  ('c2222222-2222-2222-2222-222222222222', 'Какой метод используется для GET-запроса?', ARRAY['app.request()', 'app.get()', 'app.fetch()', 'app.retrieve()'], 1),
  ('c2222222-2222-2222-2222-222222222222', 'Что такое middleware?', ARRAY['База данных', 'Функция-обработчик запросов', 'Тип роута', 'Метод HTTP'], 1);

-- Backend - PostgreSQL
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c2222223-2222-2222-2222-222222222222', 'Что такое SQL?', ARRAY['Язык программирования', 'Язык запросов к базе данных', 'Фреймворк', 'Протокол'], 1),
  ('c2222223-2222-2222-2222-222222222222', 'Какая команда используется для выборки данных?', ARRAY['GET', 'SELECT', 'FETCH', 'RETRIEVE'], 1),
  ('c2222223-2222-2222-2222-222222222222', 'Что такое PRIMARY KEY?', ARRAY['Внешний ключ', 'Уникальный идентификатор записи', 'Индекс', 'Тип данных'], 1);

-- Backend - Authentication
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c2222224-2222-2222-2222-222222222222', 'Что означает JWT?', ARRAY['Java Web Token', 'JSON Web Token', 'JavaScript Web Tool', 'Just Web Token'], 1),
  ('c2222224-2222-2222-2222-222222222222', 'Где хранится JWT на клиенте?', ARRAY['Только в cookies', 'localStorage или cookies', 'В URL', 'На сервере'], 1),
  ('c2222224-2222-2222-2222-222222222222', 'Что такое хеширование пароля?', ARRAY['Шифрование пароля', 'Односторонняя функция преобразования', 'Сжатие данных', 'Кодирование'], 1);

-- Backend - API Design
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c2222225-2222-2222-2222-222222222222', 'Что означает REST?', ARRAY['Rapid Easy Simple Transfer', 'Representational State Transfer', 'Remote Server Technology', 'Real Estate Software Tool'], 1),
  ('c2222225-2222-2222-2222-222222222222', 'Какой HTTP метод используется для создания ресурса?', ARRAY['GET', 'PUT', 'POST', 'DELETE'], 2),
  ('c2222225-2222-2222-2222-222222222222', 'Что такое API endpoint?', ARRAY['URL для доступа к ресурсу', 'База данных', 'Сервер', 'Клиент'], 0);

-- DevOps - Linux Basics
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c3333331-3333-3333-3333-333333333333', 'Какая команда показывает текущую директорию?', ARRAY['cd', 'ls', 'pwd', 'dir'], 2),
  ('c3333331-3333-3333-3333-333333333333', 'Что делает команда chmod?', ARRAY['Меняет владельца файла', 'Меняет права доступа', 'Копирует файл', 'Удаляет файл'], 1),
  ('c3333331-3333-3333-3333-333333333333', 'Какая команда используется для просмотра содержимого файла?', ARRAY['read', 'view', 'cat', 'open'], 2);

-- DevOps - Docker Basics
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c3333332-3333-3333-3333-333333333333', 'Что такое Docker контейнер?', ARRAY['Виртуальная машина', 'Изолированная среда выполнения', 'Тип базы данных', 'Облачная платформа'], 1),
  ('c3333332-3333-3333-3333-333333333333', 'Какой файл описывает Docker образ?', ARRAY['docker.json', 'Dockerfile', 'container.yaml', 'image.config'], 1),
  ('c3333332-3333-3333-3333-333333333333', 'Какая команда запускает контейнер?', ARRAY['docker start', 'docker run', 'docker execute', 'docker launch'], 1);

-- DevOps - CI/CD Pipeline
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c3333333-3333-3333-3333-333333333333', 'Что означает CI/CD?', ARRAY['Container Integration / Deployment', 'Continuous Integration / Continuous Deployment', 'Code Integration / Deploy', 'Central Integration / Deploy'], 1),
  ('c3333333-3333-3333-3333-333333333333', 'Что делает CI pipeline?', ARRAY['Только деплоит код', 'Автоматически тестирует и собирает код', 'Мониторит сервер', 'Создает базу данных'], 1),
  ('c3333333-3333-3333-3333-333333333333', 'Какой файл используется для GitHub Actions?', ARRAY['.github/workflows/*.yml', 'ci-cd.config', 'pipeline.json', 'actions.yaml'], 0);

-- DevOps - Cloud Basics
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c3333334-3333-3333-3333-333333333333', 'Что такое облачные вычисления?', ARRAY['Хранение файлов в интернете', 'Предоставление вычислительных ресурсов через интернет', 'Тип базы данных', 'Протокол передачи данных'], 1),
  ('c3333334-3333-3333-3333-333333333333', 'Какая модель предоставляет только инфраструктуру?', ARRAY['SaaS', 'PaaS', 'IaaS', 'FaaS'], 2),
  ('c3333334-3333-3333-3333-333333333333', 'Что такое AWS?', ARRAY['Язык программирования', 'Облачная платформа Amazon', 'База данных', 'Протокол'], 1);

-- DevOps - Monitoring
INSERT INTO quiz_questions (verification_id, question_text, options, correct_index) VALUES
  ('c3333335-3333-3333-3333-333333333333', 'Зачем нужен мониторинг?', ARRAY['Для красоты', 'Для отслеживания работы системы', 'Для ускорения кода', 'Для тестирования'], 1),
  ('c3333335-3333-3333-3333-333333333333', 'Что такое логи приложения?', ARRAY['Ошибки кода', 'Записи о событиях в системе', 'База данных', 'Конфигурация'], 1),
  ('c3333335-3333-3333-3333-333333333333', 'Какой инструмент используется для мониторинга?', ARRAY['Docker', 'Git', 'Prometheus', 'npm'], 2);

-- Insert Task Templates (1 per step)
-- Frontend Tasks
INSERT INTO task_templates (id, step_id, title, description, difficulty, starter_code, tests_json) VALUES
  ('d1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'Создать HTML структуру', 'Создайте функцию, которая возвращает базовую HTML структуру страницы', 'Easy', 'function createHTML() {\n  // Ваш код здесь\n}', '[{"input": "", "expected": "<!DOCTYPE html><html><head><title>Page</title></head><body></body></html>"}]'),
  ('d1111112-1111-1111-1111-111111111111', 'b1111112-1111-1111-1111-111111111111', 'Центрировать элемент', 'Напишите CSS класс для центрирования элемента с помощью flexbox', 'Easy', '.center {\n  /* Ваш CSS */\n}', '[{"input": "", "expected": "display: flex; justify-content: center; align-items: center;"}]'),
  ('d1111113-1111-1111-1111-111111111111', 'b1111113-1111-1111-1111-111111111111', 'Сумма массива', 'Создайте функцию, которая возвращает сумму всех элементов массива', 'Easy', 'function sumArray(arr) {\n  // Ваш код здесь\n}', '[{"input": "[1, 2, 3]", "expected": "6"}, {"input": "[10, 20]", "expected": "30"}]'),
  ('d1111114-1111-1111-1111-111111111111', 'b1111114-1111-1111-1111-111111111111', 'Git команды', 'Напишите последовательность git команд для коммита изменений', 'Easy', '// Напишите команды через запятую\nfunction gitCommands() {\n  return "";\n}', '[{"input": "", "expected": "git add ., git commit -m message"}]'),
  ('d1111115-1111-1111-1111-111111111111', 'b1111115-1111-1111-1111-111111111111', 'React компонент', 'Создайте простой функциональный компонент Button', 'Easy', 'function Button() {\n  // Ваш код\n}', '[{"input": "", "expected": "<button>Click</button>"}]');

-- Backend Tasks
INSERT INTO task_templates (id, step_id, title, description, difficulty, starter_code, tests_json) VALUES
  ('d2222221-2222-2222-2222-222222222222', 'b2222221-2222-2222-2222-222222222222', 'Асинхронная функция', 'Создайте async функцию, которая возвращает Promise', 'Easy', 'async function fetchData() {\n  // Ваш код\n}', '[{"input": "", "expected": "Promise"}]'),
  ('d2222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', 'Express маршрут', 'Создайте GET маршрут /api/hello', 'Easy', 'app.get("/api/hello", (req, res) => {\n  // Ваш код\n});', '[{"input": "", "expected": "Hello World"}]'),
  ('d2222223-2222-2222-2222-222222222222', 'b2222223-2222-2222-2222-222222222222', 'SQL запрос', 'Напишите SELECT запрос для получения всех пользователей', 'Easy', 'const query = "";', '[{"input": "", "expected": "SELECT * FROM users"}]'),
  ('d2222224-2222-2222-2222-222222222222', 'b2222224-2222-2222-2222-222222222222', 'Хеширование пароля', 'Создайте функцию для хеширования пароля', 'Medium', 'function hashPassword(password) {\n  // Используйте bcrypt\n}', '[{"input": "test123", "expected": "hashed"}]'),
  ('d2222225-2222-2222-2222-222222222222', 'b2222225-2222-2222-2222-222222222222', 'REST endpoint', 'Создайте POST endpoint для создания пользователя', 'Medium', 'app.post("/api/users", (req, res) => {\n  // Ваш код\n});', '[{"input": "{\"name\": \"John\"}", "expected": "201"}]');

-- DevOps Tasks
INSERT INTO task_templates (id, step_id, title, description, difficulty, starter_code, tests_json) VALUES
  ('d3333331-3333-3333-3333-333333333333', 'b3333331-3333-3333-3333-333333333333', 'Bash скрипт', 'Создайте bash скрипт для вывода списка файлов', 'Easy', '#!/bin/bash\n# Ваш код', '[{"input": "", "expected": "ls -la"}]'),
  ('d3333332-3333-3333-3333-333333333333', 'b3333332-3333-3333-3333-333333333333', 'Dockerfile', 'Создайте Dockerfile для Node.js приложения', 'Easy', 'FROM node:18\n# Ваш код', '[{"input": "", "expected": "WORKDIR /app"}]'),
  ('d3333333-3333-3333-3333-333333333333', 'b3333333-3333-3333-3333-333333333333', 'GitHub Actions', 'Создайте workflow для запуска тестов', 'Medium', 'name: CI\non: [push]\njobs:\n  # Ваш код', '[{"input": "", "expected": "run: npm test"}]'),
  ('d3333334-3333-3333-3333-333333333333', 'b3333334-3333-3333-3333-333333333333', 'AWS команда', 'Напишите AWS CLI команду для создания S3 bucket', 'Medium', '# Напишите команду\n', '[{"input": "", "expected": "aws s3 mb s3://bucket-name"}]'),
  ('d3333335-3333-3333-3333-333333333333', 'b3333335-3333-3333-3333-333333333333', 'Prometheus метрики', 'Создайте базовую метрику для мониторинга', 'Medium', '// Создайте counter метрику\n', '[{"input": "", "expected": "counter"}]');

-- Insert sample achievements
INSERT INTO achievements (id, code, title, description) VALUES
  ('e1111111-1111-1111-1111-111111111111', 'FIRST_STEP', 'Первый шаг', 'Завершите первый шаг в любом roadmap'),
  ('e2222222-2222-2222-2222-222222222222', 'QUIZ_MASTER', 'Мастер викторин', 'Пройдите 5 quiz подряд без ошибок'),
  ('e3333333-3333-3333-3333-333333333333', 'TASK_SOLVER', 'Решатель задач', 'Решите 10 практических задач'),
  ('e4444444-4444-4444-4444-444444444444', 'PERFECTIONIST', 'Перфекционист', 'Получите 100 баллов за одну задачу'),
  ('e5555555-5555-5555-5555-555555555555', 'ROADMAP_COMPLETE', 'Завершитель пути', 'Завершите полный roadmap');