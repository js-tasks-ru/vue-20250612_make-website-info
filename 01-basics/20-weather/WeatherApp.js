import { defineComponent, onMounted } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData();

    function isNightNow(dt, sunrise, sunset) {
      let isNight = false;

      const timeNow = new Date().setHours(+dt.split(':')[0], +dt.split(':')[1]);
      const timeSunrise = new Date().setHours(+sunrise.split(':')[0], +sunrise.split(':')[1]);
      const timeSunset = new Date().setHours(+sunset.split(':')[0], +sunset.split(':')[1]);

      if (timeNow < timeSunrise || timeNow > timeSunset) isNight = true;
      return isNight;
    }

    return {
      weatherData,
      icons: WeatherConditionIcons,
      isNightNow
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="item in weatherData" :key="item.geographic_name"
        class="weather-card"
        :class="{ 'weather-card--night': isNightNow(item.current.dt, item.current.sunrise, item.current.sunset) }">

          <div v-if="item.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ item.alert.sender_name }}: {{ item.alert.description }}</span>
          </div>

          <div>
            <h2 class="weather-card__name">
              {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ item.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="item.current.weather.description">{{ icons[item.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ (+item.current.temp - 273.15).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ Math.round(item.current.pressure * 0.75) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ item.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ item.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ item.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
