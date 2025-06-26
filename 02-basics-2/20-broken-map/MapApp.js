import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    // Реактивные переменные для хранения координат метки
    let x = ref(0)
    let y = ref(0)

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event) {
      x.value = event.offsetX
      y.value = event.offsetY
    }

    // Следим за X и Y для установки нового положения
    // ❗ В Vue за редкими исключениями нельзя манипулировать DOM напрямую.
    // watch([x, y], () => {
    //   console.log('x = ', x.value);
    //   console.log('y = ', y.value);
    //
    //   // Находим метку и изменяем её положение
    //   const map = document.querySelector('.pin')
    //
    //   console.log('map - ', map);
    //
    //   map.style.left = `${x.value}px`
    //   map.style.top = `${y.value}px`
    // })

    return {
      handleClick,
      x,
      y
    }
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false" />
      <span class="pin"
      :style="{
        left: \`\${x}px\`,
        top: \`\${y}px\`,
      }"
      >📍</span>
    </div>
  `,
})
