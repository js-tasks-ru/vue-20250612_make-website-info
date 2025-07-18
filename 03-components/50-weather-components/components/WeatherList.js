import { defineComponent } from 'vue'
import '../WeatherApp.css'
import WeatherCard from './WeatherCard.js'

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherCard,
  },

  props: {
    cardlist: {
      type: Array,
      required: true,
    },
  },

  setup() {
    function isNightNow(dt, sunrise, sunset) {
      let isNight = false;

      const timeNow = new Date().setHours(+dt.split(':')[0], +dt.split(':')[1]);
      const timeSunrise = new Date().setHours(+sunrise.split(':')[0], +sunrise.split(':')[1]);
      const timeSunset = new Date().setHours(+sunset.split(':')[0], +sunset.split(':')[1]);

      if (timeNow < timeSunrise || timeNow > timeSunset) isNight = true;
      return isNight;
    }

    return {
      isNightNow
    }
  },

  template: `
    <ul class="weather-list unstyled-list">
      <li v-for="item in cardlist" :key="item.geographic_name"
      class="weather-card"
      :class="{ 'weather-card--night': isNightNow(item.current.dt, item.current.sunrise, item.current.sunset) }">

        <WeatherCard :card="item" />
      </li>
    </ul>
  `,
})
