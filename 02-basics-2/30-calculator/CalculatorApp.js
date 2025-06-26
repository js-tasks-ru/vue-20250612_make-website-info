import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const operands = ref({
      first: 10,
      second: 2
    })
    const operator = ref('sum')

    const output = computed(() => {
      let output = 0
      switch(operator.value) {
        case 'sum':
          output = operands.value.first + operands.value.second
          break;

        case 'subtract':
          output = operands.value.first - operands.value.second
          break;

        case 'multiply':
          output = operands.value.first * operands.value.second
          break;

        case 'divide':
          output = operands.value.first / operands.value.second
          break;
      }

      console.log('output = ', output);

      return output
    })

    return {
      operands,
      output,
      operator
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="operands.first"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="operator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="operator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="operands.second"/>

      <div>=</div>

      <output>{{ output }}</output>
    </div>
  `,
})
