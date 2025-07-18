import { defineComponent, toRef, onMounted } from 'vue'
import { WeatherConditionIcons } from '../weather.service.ts'
import '../WeatherApp.css'

export default defineComponent({
  name: 'WeatherCard',

  props: {
    card: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const card = toRef(() => props.card)

    onMounted(() => {
      console.log('- - - - - - - - - - - - - - - - - - - - -');
      console.log('card : ', card.value);
      console.log('card.alert : ', card.value.alert);
    })

    return {
      icons: WeatherConditionIcons,
    }
  },

  template: `
    <div v-if="card.alert !== null" class="weather-alert">
      <span class="weather-alert__icon">⚠️</span>
      <span class="weather-alert__description">{{ card.alert.sender_name }}: {{ card.alert.description }}</span>
    </div>

    <div>
      <h2 class="weather-card__name">
        {{ card.geographic_name }}
      </h2>
      <div class="weather-card__time">
        {{ card.current.dt }}
      </div>
    </div>
    <div class="weather-conditions">
      <div class="weather-conditions__icon" :title="card.current.weather.description">{{ icons[card.current.weather.id] }}</div>
      <div class="weather-conditions__temp">{{ (+card.current.temp - 273.15).toFixed(1) }} °C</div>
    </div>
    <div class="weather-details">
      <div class="weather-details__item">
        <div class="weather-details__item-label">Давление, мм рт. ст.</div>
        <div class="weather-details__item-value">{{ Math.round(card.current.pressure * 0.75) }}</div>
      </div>
      <div class="weather-details__item">
        <div class="weather-details__item-label">Влажность, %</div>
        <div class="weather-details__item-value">{{ card.current.humidity }}</div>
      </div>
      <div class="weather-details__item">
        <div class="weather-details__item-label">Облачность, %</div>
        <div class="weather-details__item-value">{{ card.current.clouds }}</div>
      </div>
      <div class="weather-details__item">
        <div class="weather-details__item-label">Ветер, м/с</div>
        <div class="weather-details__item-value">{{ card.current.wind_speed }}</div>
      </div>
    </div>
  `,
})
