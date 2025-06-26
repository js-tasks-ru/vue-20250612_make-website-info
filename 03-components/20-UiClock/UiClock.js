import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const formattedTime = ref('00:00:00')
    let intervalId

    function updateClock() {
      const date = new Date();
      // const formatter = new Intl.DateTimeFormat("ru-RU", { timeStyle: "medium" });
      const formatter = new Intl.DateTimeFormat(navigator.language, { timeStyle: "medium" }); navigator.language
      formattedTime.value = formatter.format(date);

      console.log('Clock updated');
    }

    onMounted(() => {
      intervalId = setInterval(updateClock, 1000);
      updateClock();
    })

    onUnmounted(() => clearInterval(intervalId))

    const currentTime = computed(() => {
      return formattedTime.value
    })


    return {
      currentTime
    }
  },

  template: `<div class="clock">{{ currentTime }}</div>`,
})
