import { defineComponent, ref, onMounted } from 'vue'
import { getWeatherData } from './weather.service.ts'
import './WeatherApp.css'
import WeatherList from './components/WeatherList.js'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherList
  },

  setup() {
    const weatherData = ref(null)

    onMounted(() => {
      weatherData.value = getWeatherData();
      console.log('weatherData : ', weatherData.value);
    })

    return {
      weatherData
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <template v-if="weatherData !== null">
        <WeatherList :cardlist="weatherData" />
      </template>
      <p v-else>Загружаем земли Средиземья...</p>
    </div>
  `,
})
