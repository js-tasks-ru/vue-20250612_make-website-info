import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const minNum = 0
    const maxNum = 5
    const number = ref('0')

    function changeCounter(action, event) {
      if (action === 'minus') number.value = +number.value - 1
      if (action === 'plus') number.value = +number.value + 1
    }

    return {
      number,
      minNum,
      maxNum,
      changeCounter
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="+number < minNum + 1"
        @click="changeCounter('minus')"
      >➖</button>

      <span class="count" data-testid="count">{{ number }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="+number > maxNum - 1"
        @click="changeCounter('plus')"
      >➕</button>
    </div>
  `,
})
