import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailListItem',

  props: {
    id: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    marked: {
      type: Boolean,
      default: false,
    },
  },

  template: `
    <li :class="{ marked }">
      {{ email }}
      <button type="button" aria-label="Удалить"
      @click.stop="$emit('deleteEmail')"
      >❌</button>
    </li>
  `,
})
