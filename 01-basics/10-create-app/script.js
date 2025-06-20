import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'App',

  // setup - сборка экземпляра
  // Для сборки — настройки и определения свойств экземпляра компонента – в Composition API используется функция setup
  setup() {
    function formatAsLocalDate() {
      return new Date().toLocaleString(navigator.language, {
      // return new Date().toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
    return {
      formatAsLocalDate
    }
  },

  template: `
    <div>Сегодня {{ formatAsLocalDate() }}</div>
  `,
});

// Для создания Vue приложения (Vue Application, Vue App) из корневого компонента
const app = createApp(App);

// Монтирование приложения на страницу
const vm = app.mount('#app');
// vm - экземпляр компонента App

// Для отладки - добавим в глобальную переменную
// Позже научимся делать это через vue-devtools
window.vm = vm;
