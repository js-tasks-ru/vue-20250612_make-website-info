import { defineComponent, toRef, onMounted } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Infinity
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
    const countVal = toRef(() => props.count)

    onMounted(() => {
      console.log('count : ', props.count);
      console.log('min : ', props.min);
      console.log('max : ', props.max);
      console.log('countVal : ', countVal);
    })

    function updateCounter(action) {
      if (action === 'minus')
        emit('update:count', +countVal.value - 1)
      if (action === 'plus')
        emit('update:count', +countVal.value + 1)
    }

    return {
      countVal,
      updateCounter
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement"
        :disabled="countVal === min"
        @click="updateCounter('minus')">➖</UiButton>

      <span class="count" data-testid="count">{{ countVal }}</span>

      <UiButton aria-label="Increment"
        :disabled="countVal === max"
        @click="updateCounter('plus')">➕</UiButton>
    </div>
  `,
})
