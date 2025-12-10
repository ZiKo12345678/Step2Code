-- Insert Cybersecurity Engineer Roadmap
INSERT INTO roadmaps (id, slug, title, description, created_at)
VALUES 
  ('a4444444-4444-4444-4444-444444444444', 'cybersecurity', 'Cybersecurity Engineer', 'Roadmap for learning cybersecurity fundamentals and core defensive/offensive concepts.', now());

-- Insert Android Developer Roadmap
INSERT INTO roadmaps (id, slug, title, description, created_at)
VALUES 
  ('a5555555-5555-5555-5555-555555555555', 'android', 'Android Developer', 'Roadmap for learning Android development from basics to advanced mobile concepts.', now());

-- Insert Cybersecurity Steps
INSERT INTO roadmap_steps (id, roadmap_id, title, content, order_index, parent_step_id, created_at)
VALUES 
  ('b4444441-4444-4444-4444-444444444444', 'a4444444-4444-4444-4444-444444444444', 'Introduction to Cybersecurity', 'Основы кибербезопасности: CIA триада (конфиденциальность, целостность, доступность), типы угроз, основные концепции защиты информации.', 1, NULL, now()),
  ('b4444442-4444-4444-4444-444444444444', 'a4444444-4444-4444-4444-444444444444', 'Networking Basics', 'Основы сетевых технологий: TCP/IP, OSI модель, протоколы HTTP/HTTPS, DNS, основы сетевой безопасности.', 2, NULL, now()),
  ('b4444443-4444-4444-4444-444444444444', 'a4444444-4444-4444-4444-444444444444', 'Linux Security', 'Безопасность Linux систем: права доступа, SELinux, iptables, аудит системы, hardening.', 3, NULL, now()),
  ('b4444444-4444-4444-4444-444444444444', 'a4444444-4444-4444-4444-444444444444', 'Threat Analysis & Malware Basics', 'Анализ угроз и основы работы с вредоносным ПО: типы вредоносов, методы анализа, песочницы, индикаторы компрометации.', 4, NULL, now()),
  ('b4444445-4444-4444-4444-444444444444', 'a4444444-4444-4444-4444-444444444444', 'Web Application Security (OWASP)', 'Безопасность веб-приложений: OWASP Top 10, SQL injection, XSS, CSRF, authentication и authorization.', 5, NULL, now());

-- Insert Android Steps
INSERT INTO roadmap_steps (id, roadmap_id, title, content, order_index, parent_step_id, created_at)
VALUES 
  ('b5555551-5555-5555-5555-555555555555', 'a5555555-5555-5555-5555-555555555555', 'Kotlin Basics', 'Основы Kotlin: синтаксис, типы данных, функции, классы, null safety, расширения.', 1, NULL, now()),
  ('b5555552-5555-5555-5555-555555555555', 'a5555555-5555-5555-5555-555555555555', 'Android Studio & Project Structure', 'Android Studio: структура проекта, Gradle, Activities, Fragments, Intents, манифест.', 2, NULL, now()),
  ('b5555553-5555-5555-5555-555555555555', 'a5555555-5555-5555-5555-555555555555', 'UI Layouts & Jetpack Compose', 'Создание UI: XML layouts, ConstraintLayout, Jetpack Compose основы, Material Design.', 3, NULL, now()),
  ('b5555554-5555-5555-5555-555555555555', 'a5555555-5555-5555-5555-555555555555', 'Networking & APIs', 'Работа с сетью: Retrofit, OkHttp, REST API, JSON parsing, корутины для асинхронности.', 4, NULL, now()),
  ('b5555555-5555-5555-5555-555555555555', 'a5555555-5555-5555-5555-555555555555', 'Publishing to Play Store', 'Публикация приложения: подпись APK, Google Play Console, версионирование, релизные сборки.', 5, NULL, now());

-- Insert Step Verifications for Cybersecurity
INSERT INTO step_verifications (id, step_id, type, created_at)
VALUES 
  ('c4444441-4444-4444-4444-444444444444', 'b4444441-4444-4444-4444-444444444444', 'quiz', now()),
  ('c4444442-4444-4444-4444-444444444444', 'b4444442-4444-4444-4444-444444444444', 'quiz', now()),
  ('c4444443-4444-4444-4444-444444444444', 'b4444443-4444-4444-4444-444444444444', 'quiz', now()),
  ('c4444444-4444-4444-4444-444444444444', 'b4444444-4444-4444-4444-444444444444', 'quiz', now()),
  ('c4444445-4444-4444-4444-444444444444', 'b4444445-4444-4444-4444-444444444444', 'quiz', now());

-- Insert Step Verifications for Android
INSERT INTO step_verifications (id, step_id, type, created_at)
VALUES 
  ('c5555551-5555-5555-5555-555555555555', 'b5555551-5555-5555-5555-555555555555', 'quiz', now()),
  ('c5555552-5555-5555-5555-555555555555', 'b5555552-5555-5555-5555-555555555555', 'quiz', now()),
  ('c5555553-5555-5555-5555-555555555555', 'b5555553-5555-5555-5555-555555555555', 'quiz', now()),
  ('c5555554-5555-5555-5555-555555555555', 'b5555554-5555-5555-5555-555555555555', 'quiz', now()),
  ('c5555555-5555-5555-5555-555555555555', 'b5555555-5555-5555-5555-555555555555', 'quiz', now());

-- Insert Quiz Questions for Cybersecurity Step 1
INSERT INTO quiz_questions (id, verification_id, question_text, options, correct_index, created_at)
VALUES 
  (gen_random_uuid(), 'c4444441-4444-4444-4444-444444444444', 'Что означает CIA триада в кибербезопасности?', ARRAY['Confidentiality, Integrity, Availability', 'Computer, Internet, Application', 'Cyber, Information, Attack', 'Control, Investigation, Analysis'], 0, now()),
  (gen_random_uuid(), 'c4444441-4444-4444-4444-444444444444', 'Какой тип атаки направлен на отказ в обслуживании?', ARRAY['SQL Injection', 'DDoS', 'XSS', 'CSRF'], 1, now()),
  (gen_random_uuid(), 'c4444441-4444-4444-4444-444444444444', 'Что такое vulnerability?', ARRAY['Тип вируса', 'Антивирусная программа', 'Уязвимость в системе', 'Метод шифрования'], 2, now());

-- Insert Quiz Questions for Cybersecurity Step 2
INSERT INTO quiz_questions (id, verification_id, question_text, options, correct_index, created_at)
VALUES 
  (gen_random_uuid(), 'c4444442-4444-4444-4444-444444444444', 'На каком уровне OSI модели работает TCP?', ARRAY['Прикладной', 'Представительский', 'Сеансовый', 'Транспортный'], 3, now()),
  (gen_random_uuid(), 'c4444442-4444-4444-4444-444444444444', 'Какой порт по умолчанию использует HTTPS?', ARRAY['80', '8080', '443', '22'], 2, now()),
  (gen_random_uuid(), 'c4444442-4444-4444-4444-444444444444', 'Что такое firewall?', ARRAY['Программа для сжатия файлов', 'Межсетевой экран', 'Браузер', 'База данных'], 1, now());

-- Insert Quiz Questions for Cybersecurity Step 3
INSERT INTO quiz_questions (id, verification_id, question_text, options, correct_index, created_at)
VALUES 
  (gen_random_uuid(), 'c4444443-4444-4444-4444-444444444444', 'Какая команда Linux изменяет права доступа к файлу?', ARRAY['chown', 'chgrp', 'chmod', 'chattr'], 2, now()),
  (gen_random_uuid(), 'c4444443-4444-4444-4444-444444444444', 'Что означает разрешение 755 в Linux?', ARRAY['rwxr-xr-x', 'rwxrwxrwx', 'rw-r--r--', 'rwxrw-rw-'], 0, now());

-- Insert Quiz Questions for Cybersecurity Step 4
INSERT INTO quiz_questions (id, verification_id, question_text, options, correct_index, created_at)
VALUES 
  (gen_random_uuid(), 'c4444444-4444-4444-4444-444444444444', 'Что такое IoC (Indicator of Compromise)?', ARRAY['Тип вируса', 'Индикатор компрометации', 'Протокол шифрования', 'Метод аутентификации'], 1, now()),
  (gen_random_uuid(), 'c4444444-4444-4444-4444-444444444444', 'Какой тип вредоносного ПО шифрует файлы жертвы?', ARRAY['Троян', 'Червь', 'Ransomware', 'Spyware'], 2, now()),
  (gen_random_uuid(), 'c4444444-4444-4444-4444-444444444444', 'Что используется для безопасного анализа вредоносов?', ARRAY['Production сервер', 'Sandbox', 'Cloud storage', 'Personal computer'], 1, now());

-- Insert Quiz Questions for Cybersecurity Step 5
INSERT INTO quiz_questions (id, verification_id, question_text, options, correct_index, created_at)
VALUES 
  (gen_random_uuid(), 'c4444445-4444-4444-4444-444444444444', 'Какая уязвимость №1 в OWASP Top 10 2021?', ARRAY['XSS', 'Broken Access Control', 'SQL Injection', 'CSRF'], 1, now()),
  (gen_random_uuid(), 'c4444445-4444-4444-4444-444444444444', 'Что такое XSS атака?', ARRAY['SQL Injection', 'Cross-Site Scripting', 'Cross-Site Request Forgery', 'Denial of Service'], 1, now());

-- Insert Quiz Questions for Android Step 1
INSERT INTO quiz_questions (id, verification_id, question_text, options, correct_index, created_at)
VALUES 
  (gen_random_uuid(), 'c5555551-5555-5555-5555-555555555555', 'Какой тип безопасности от null по умолчанию в Kotlin?', ARRAY['Nullable', 'Non-nullable', 'Optional', 'Unsafe'], 1, now()),
  (gen_random_uuid(), 'c5555551-5555-5555-5555-555555555555', 'Какое ключевое слово используется для объявления неизменяемой переменной в Kotlin?', ARRAY['var', 'val', 'const', 'let'], 1, now()),
  (gen_random_uuid(), 'c5555551-5555-5555-5555-555555555555', 'Что такое extension function в Kotlin?', ARRAY['Функция внутри класса', 'Функция, расширяющая класс без наследования', 'Абстрактная функция', 'Статическая функция'], 1, now());

-- Insert Quiz Questions for Android Step 2
INSERT INTO quiz_questions (id, verification_id, question_text, options, correct_index, created_at)
VALUES 
  (gen_random_uuid(), 'c5555552-5555-5555-5555-555555555555', 'Какой файл содержит основную конфигурацию Android приложения?', ARRAY['build.gradle', 'AndroidManifest.xml', 'settings.gradle', 'proguard-rules.pro'], 1, now()),
  (gen_random_uuid(), 'c5555552-5555-5555-5555-555555555555', 'Что такое Activity в Android?', ARRAY['База данных', 'Экран с UI', 'Сетевой запрос', 'Файл конфигурации'], 1, now());

-- Insert Quiz Questions for Android Step 3
INSERT INTO quiz_questions (id, verification_id, question_text, options, correct_index, created_at)
VALUES 
  (gen_random_uuid(), 'c5555553-5555-5555-5555-555555555555', 'Что такое Jetpack Compose?', ARRAY['Старый способ создания UI', 'Современный UI toolkit для Android', 'База данных', 'Сетевая библиотека'], 1, now()),
  (gen_random_uuid(), 'c5555553-5555-5555-5555-555555555555', 'Какой layout рекомендуется для сложных UI в XML?', ARRAY['LinearLayout', 'RelativeLayout', 'ConstraintLayout', 'FrameLayout'], 2, now()),
  (gen_random_uuid(), 'c5555553-5555-5555-5555-555555555555', 'Что такое Material Design?', ARRAY['Язык программирования', 'Дизайн-система Google', 'База данных', 'Фреймворк для тестирования'], 1, now());

-- Insert Quiz Questions for Android Step 4
INSERT INTO quiz_questions (id, verification_id, question_text, options, correct_index, created_at)
VALUES 
  (gen_random_uuid(), 'c5555554-5555-5555-5555-555555555555', 'Какая библиотека используется для сетевых запросов в Android?', ARRAY['Volley', 'Retrofit', 'Glide', 'Room'], 1, now()),
  (gen_random_uuid(), 'c5555554-5555-5555-5555-555555555555', 'Что такое корутины в Kotlin?', ARRAY['Синхронный код', 'Способ асинхронного программирования', 'Тип данных', 'UI компонент'], 1, now());

-- Insert Quiz Questions for Android Step 5
INSERT INTO quiz_questions (id, verification_id, question_text, options, correct_index, created_at)
VALUES 
  (gen_random_uuid(), 'c5555555-5555-5555-5555-555555555555', 'Какой формат файла используется для подписи Android приложения?', ARRAY['.apk', '.aab', '.keystore', '.cer'], 2, now()),
  (gen_random_uuid(), 'c5555555-5555-5555-5555-555555555555', 'Что такое APK?', ARRAY['Android Package Kit', 'Android Programming Kit', 'Application Package Kit', 'Android Private Key'], 0, now()),
  (gen_random_uuid(), 'c5555555-5555-5555-5555-555555555555', 'Какой сервис используется для публикации Android приложений?', ARRAY['App Store', 'Google Play Console', 'Steam', 'Microsoft Store'], 1, now());

-- Insert Task Templates for Cybersecurity
INSERT INTO task_templates (id, step_id, title, description, difficulty, starter_code, tests_json, created_at)
VALUES 
  (gen_random_uuid(), 'b4444441-4444-4444-4444-444444444444', 'Проверка стойкости пароля', 'Создайте функцию, которая проверяет стойкость пароля. Пароль должен содержать минимум 8 символов, включать буквы верхнего и нижнего регистра, и хотя бы одну цифру.', 'Easy', 'function checkPasswordStrength(password) {\n  // Ваш код здесь\n  return false;\n}', '[{"input": ["Test123"], "expected": true}, {"input": ["weak"], "expected": false}]'::jsonb, now()),
  (gen_random_uuid(), 'b4444442-4444-4444-4444-444444444444', 'Определение типа IP адреса', 'Создайте функцию, которая определяет, является ли IP адрес приватным или публичным.', 'Easy', 'function isPrivateIP(ip) {\n  // Ваш код здесь\n  return false;\n}', '[{"input": ["192.168.1.1"], "expected": true}, {"input": ["8.8.8.8"], "expected": false}]'::jsonb, now()),
  (gen_random_uuid(), 'b4444443-4444-4444-4444-444444444444', 'Парсинг прав доступа Linux', 'Создайте функцию, которая преобразует числовые права доступа (например, 755) в строковое представление (rwxr-xr-x).', 'Easy', 'function parsePermissions(octal) {\n  // Ваш код здесь\n  return "";\n}', '[{"input": [755], "expected": "rwxr-xr-x"}, {"input": [644], "expected": "rw-r--r--"}]'::jsonb, now()),
  (gen_random_uuid(), 'b4444444-4444-4444-4444-444444444444', 'Детектор подозрительных файлов', 'Создайте функцию, которая проверяет, является ли файл потенциально опасным на основе его расширения.', 'Easy', 'function isSuspiciousFile(filename) {\n  // Ваш код здесь\n  return false;\n}', '[{"input": ["document.exe"], "expected": true}, {"input": ["image.jpg"], "expected": false}]'::jsonb, now()),
  (gen_random_uuid(), 'b4444445-4444-4444-4444-444444444444', 'Экранирование HTML', 'Создайте функцию для защиты от XSS атак путем экранирования специальных HTML символов.', 'Easy', 'function escapeHTML(str) {\n  // Ваш код здесь\n  return str;\n}', '[{"input": ["<script>alert(1)</script>"], "expected": "&lt;script&gt;alert(1)&lt;/script&gt;"}, {"input": ["Hello & goodbye"], "expected": "Hello &amp; goodbye"}]'::jsonb, now());

-- Insert Task Templates for Android
INSERT INTO task_templates (id, step_id, title, description, difficulty, starter_code, tests_json, created_at)
VALUES 
  (gen_random_uuid(), 'b5555551-5555-5555-5555-555555555555', 'Проверка на null в Kotlin', 'Создайте функцию, которая безопасно работает с nullable строкой и возвращает её длину или 0.', 'Easy', 'fun getStringLength(str: String?): Int {\n  // Ваш код здесь\n  return 0\n}', '[{"input": ["Hello"], "expected": 5}, {"input": [null], "expected": 0}]'::jsonb, now()),
  (gen_random_uuid(), 'b5555552-5555-5555-5555-555555555555', 'Создание Intent', 'Создайте функцию, которая формирует строку описания Intent для навигации между Activity.', 'Easy', 'function createIntentDescription(from, to) {\n  // Ваш код здесь\n  return "";\n}', '[{"input": ["MainActivity", "DetailActivity"], "expected": "Navigate from MainActivity to DetailActivity"}]'::jsonb, now()),
  (gen_random_uuid(), 'b5555553-5555-5555-5555-555555555555', 'Вычисление размеров View', 'Создайте функцию для вычисления размера View в dp с учетом плотности экрана.', 'Easy', 'function dpToPx(dp, density) {\n  // Ваш код здесь\n  return 0;\n}', '[{"input": [16, 2], "expected": 32}, {"input": [10, 3], "expected": 30}]'::jsonb, now()),
  (gen_random_uuid(), 'b5555554-5555-5555-5555-555555555555', 'Парсинг JSON ответа', 'Создайте функцию для извлечения значения из простого JSON объекта.', 'Easy', 'function parseJsonValue(json, key) {\n  // Ваш код здесь\n  return null;\n}', '[{"input": ["{\"name\":\"John\"}", "name"], "expected": "John"}]'::jsonb, now()),
  (gen_random_uuid(), 'b5555555-5555-5555-5555-555555555555', 'Генерация версии приложения', 'Создайте функцию, которая генерирует строку версии приложения в формате major.minor.patch.', 'Easy', 'function generateVersion(major, minor, patch) {\n  // Ваш код здесь\n  return "";\n}', '[{"input": [1, 0, 5], "expected": "1.0.5"}, {"input": [2, 3, 1], "expected": "2.3.1"}]'::jsonb, now());