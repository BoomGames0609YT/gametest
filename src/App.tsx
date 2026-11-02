import { useState } from 'react';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "Клонируйте репозиторий",
      icon: "📥",
      description: "Скачайте копию репозитория на ваш компьютер с помощью команды git clone.",
      commands: [
        { code: "git clone https://github.com/username/repository.git", description: "Клонирование по HTTPS" },
        { code: "git clone git@github.com:username/repository.git", description: "Клонирование по SSH" },
        { code: "cd repository", description: "Перейти в папку проекта" },
      ],
      tip: "💡 SSH-ключ удобнее — не нужно каждый раз вводить логин и пароль. Настройте его один раз и забудьте."
    },
    {
      title: "Настройте Git",
      icon: "⚙️",
      description: "Укажите своё имя и email — они будут привязаны к вашим коммитам.",
      commands: [
        { code: "git config --global user.name \"Ваше Имя\"", description: "Установить имя пользователя" },
        { code: "git config --global user.email \"email@example.com\"", description: "Установить email" },
        { code: "git config --global core.editor \"code --wait\"", description: "Установить VS Code как редактор (опционально)" },
      ],
      tip: "💡 Используйте тот же email, что и на GitHub/GitLab — так коммиты будут корректно привязаны к вашему профилю."
    },
    {
      title: "Создайте ветку для работы",
      icon: "🌿",
      description: "Никогда не работайте напрямую в main/master. Создайте отдельную ветку для каждой задачи.",
      commands: [
        { code: "git branch", description: "Посмотреть список веток" },
        { code: "git checkout -b feature/my-feature", description: "Создать и перейти в новую ветку" },
        { code: "git checkout -b fix/bug-name", description: "Ветка для исправления бага" },
      ],
      tip: "💡 Хорошие названия веток: feature/login-page, fix/header-alignment, docs/readme-update"
    },
    {
      title: "Работайте с кодом",
      icon: "💻",
      description: "Вносите изменения в код, создавайте новые файлы, редактируйте существующие.",
      commands: [
        { code: "git status", description: "Проверить статус изменений" },
        { code: "git diff", description: "Посмотреть что изменилось" },
        { code: "git add .", description: "Добавить все изменения в staging" },
        { code: "git add src/App.tsx", description: "Добавить конкретный файл" },
      ],
      tip: "💡 Используйте git status часто — это ваш лучший друг при работе с Git."
    },
    {
      title: "Сделайте коммит",
      icon: "📝",
      description: "Сохраните ваши изменения с понятным сообщением.",
      commands: [
        { code: "git commit -m \"feat: add login form\"", description: "Коммит с сообщением" },
        { code: "git commit -m \"fix: resolve header overlap on mobile\"", description: "Коммит с описанием исправления" },
        { code: "git commit -m \"docs: update README with setup instructions\"", description: "Коммит документации" },
      ],
      tip: "💡 Формат Conventional Commits: feat:, fix:, docs:, style:, refactor:, test:, chore:"
    },
    {
      title: "Отправьте изменения на сервер",
      icon: "🚀",
      description: "Запушьте вашу ветку в удалённый репозиторий и создайте Pull Request.",
      commands: [
        { code: "git push origin feature/my-feature", description: "Отправить ветку на сервер" },
        { code: "git push -u origin feature/my-feature", description: "Отправить и установить upstream" },
        { code: "git pull origin main", description: "Подтянуть свежие изменения из main" },
      ],
      tip: "💡 Перед пушем всегда делайте git pull, чтобы избежать конфликтов слияния."
    },
    {
      title: "Создайте Pull Request",
      icon: "🔀",
      description: "Откройте PR на GitHub/GitLab для ревью кода и слияния с основной веткой.",
      commands: [
        { code: "# Откройте GitHub/GitLab в браузере", description: "Перейдите на страницу репозитория" },
        { code: "# Нажмите 'New Pull Request' или 'Create Merge Request'", description: "Создайте PR" },
        { code: "# Опишите что вы сделали и почему", description: "Заполните описание PR" },
      ],
      tip: "💡 Хороший PR: маленький, с понятным описанием, скриншотами для UI-изменений."
    },
  ];

  const additionalTips = [
    { icon: "🔄", title: "Часто коммитьте", text: "Делайте маленькие коммиты с понятными сообщениями — это упрощает откат и ревью." },
    { icon: "📋", title: "Используйте .gitignore", text: "Исключите node_modules, .env, build-папки и другие ненужные файлы." },
    { icon: "🤝", title: "Синхронизируйтесь с командой", text: "Регулярно подтягивайте изменения из main, чтобы избежать больших конфликтов." },
    { icon: "🔒", title: "Не коммитьте секреты", text: "Пароли, API-ключи, токены — никогда не должны попасть в репозиторий!" },
    { icon: "📖", title: "Читайте README", text: "В каждом проекте есть README с инструкциями по настройке и запуску." },
    { icon: "🧪", title: "Тестируйте перед коммитом", text: "Убедитесь что ваш код работает и не ломает существующую функциональность." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/10">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Пошаговое руководство
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Как начать работать<br />в репозитории
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Полный гайд по началу работы с Git-репозиторием — от клонирования до создания Pull Request
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#steps" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors">
              Начать →
            </a>
            <a href="#tips" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors border border-white/10">
              Советы
            </a>
          </div>
        </div>
      </header>

      {/* Prerequisites */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="text-3xl">📦</span> Что нужно перед началом
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="text-2xl mb-2">⬇️</div>
              <h3 className="font-semibold mb-1">Git</h3>
              <p className="text-sm text-slate-400">Скачайте с <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">git-scm.com</a></p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="text-2xl mb-2">🐙</div>
              <h3 className="font-semibold mb-1">GitHub аккаунт</h3>
              <p className="text-sm text-slate-400">Зарегистрируйтесь на <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com</a></p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="text-2xl mb-2">🖥️</div>
              <h3 className="font-semibold mb-1">Терминал</h3>
              <p className="text-sm text-slate-400">Terminal, iTerm, или встроенный в VS Code</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Пошаговая инструкция</h2>
        
        {/* Step navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeStep === index
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="mr-1">{step.icon}</span>
              <span className="hidden sm:inline">Шаг {index + 1}</span>
            </button>
          ))}
        </div>

        {/* Active step content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{steps[activeStep].icon}</span>
            <div>
              <span className="text-sm text-blue-400 font-medium">Шаг {activeStep + 1} из {steps.length}</span>
              <h3 className="text-2xl font-bold">{steps[activeStep].title}</h3>
            </div>
          </div>
          <p className="text-slate-300 mb-6 text-lg">{steps[activeStep].description}</p>
          
          <div className="space-y-3 mb-6">
            {steps[activeStep].commands.map((cmd, cmdIndex) => (
              <div key={cmdIndex} className="bg-slate-900/80 rounded-xl overflow-hidden border border-white/5">
                <div className="flex items-center justify-between px-4 py-2 bg-white/5">
                  <span className="text-xs text-slate-400">{cmd.description}</span>
                  <button
                    onClick={() => copyToClipboard(cmd.code, cmdIndex)}
                    className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
                  >
                    {copiedIndex === cmdIndex ? '✓ Скопировано' : '📋 Копировать'}
                  </button>
                </div>
                <div className="px-4 py-3 font-mono text-sm sm:text-base">
                  <span className="text-green-400">$ </span>
                  <span className="text-slate-200">{cmd.code}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <p className="text-blue-200 text-sm">{steps[activeStep].tip}</p>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Назад
            </button>
            <button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Далее →
            </button>
          </div>
        </div>
      </section>

      {/* Workflow diagram */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-center">🔄 Рабочий процесс (Workflow)</h2>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            {["Pull", "Branch", "Code", "Add", "Commit", "Push", "PR"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-center min-w-[70px]">
                  <div className="font-bold text-sm sm:text-base">{item}</div>
                </div>
                {i < 6 && <span className="text-slate-500 text-lg">→</span>}
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 mt-4 text-sm">
            Этот цикл повторяется для каждой задачи или фичи
          </p>
        </div>
      </section>

      {/* Tips */}
      <section id="tips" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">💡 Полезные советы</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalTips.map((tip, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors">
              <div className="text-3xl mb-3">{tip.icon}</div>
              <h3 className="font-bold mb-2">{tip.title}</h3>
              <p className="text-sm text-slate-400">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Useful commands */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-center">🛠️ Шпаргалка команд</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-blue-400 mb-3">Основные команды</h3>
              <div className="space-y-2">
                {[
                  ["git init", "Инициализировать репозиторий"],
                  ["git clone <url>", "Клонировать репозиторий"],
                  ["git status", "Статус изменений"],
                  ["git add .", "Добавить все файлы"],
                  ["git commit -m \"msg\"", "Закоммитить"],
                  ["git push", "Отправить на сервер"],
                  ["git pull", "Получить изменения"],
                  ["git log --oneline", "История коммитов"],
                ].map(([cmd, desc], i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-900/50 rounded-lg px-3 py-2">
                    <code className="text-green-400 text-xs sm:text-sm">{cmd}</code>
                    <span className="text-xs text-slate-400 hidden sm:inline">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-purple-400 mb-3">Работа с ветками</h3>
              <div className="space-y-2">
                {[
                  ["git branch", "Список веток"],
                  ["git branch <name>", "Создать ветку"],
                  ["git checkout <name>", "Переключиться на ветку"],
                  ["git checkout -b <name>", "Создать и переключиться"],
                  ["git merge <branch>", "Слить ветку"],
                  ["git branch -d <name>", "Удалить ветку"],
                  ["git stash", "Временно сохранить изменения"],
                  ["git stash pop", "Восстановить сохранённые"],
                ].map(([cmd, desc], i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-900/50 rounded-lg px-3 py-2">
                    <code className="text-purple-400 text-xs sm:text-sm">{cmd}</code>
                    <span className="text-xs text-slate-400 hidden sm:inline">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-center">⚠️ Частые ошибки новичков</h2>
          <div className="space-y-4">
            {[
              { mistake: "Коммитить в main напрямую", fix: "Всегда создавайте отдельную ветку для работы" },
              { mistake: "Не делать git pull перед началом работы", fix: "Синхронизируйтесь с сервером перед каждым рабочим сеансом" },
              { mistake: "Писать непонятные сообщения коммитов", fix: "Используйте формат: 'feat: добавлена авторизация' или 'fix: исправлен баг с формой'" },
              { mistake: "Коммитить node_modules или .env", fix: "Настройте .gitignore с самого начала проекта" },
              { mistake: "Бояться команд git reset / git revert", fix: "Это нормальные инструменты — изучите их для отката изменений" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-3 bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex-1">
                  <span className="text-red-400 text-sm font-medium">❌ {item.mistake}</span>
                </div>
                <div className="flex-1">
                  <span className="text-green-400 text-sm font-medium">✅ {item.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-12 text-center">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-3">Готовы начать? 🚀</h2>
          <p className="text-slate-300 mb-6">
            Следуйте шагам выше, и вы быстро освоитесь в любом репозитории!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://git-scm.com/doc" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10">
              📚 Документация Git
            </a>
            <a href="https://docs.github.com" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10">
              🐙 Документация GitHub
            </a>
            <a href="https://learngitbranching.js.org" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
              🎮 Интерактивный курс
            </a>
          </div>
        </div>
        <p className="text-slate-500 text-sm mt-8">
          Создано с ❤️ для начинающих разработчиков
        </p>
      </footer>
    </div>
  );
}

export default App;
