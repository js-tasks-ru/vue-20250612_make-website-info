import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const minMtpId = 1
    const maxMtpId = 5
    const meetups = ref(null)
    const currentMeetup = ref(null)
    const currentMtpId = ref(1)
    const selectedMeetupId = ref('1')


    const currentMeetupData = computed(() => {
      if (meetups.value !== null)
        currentMeetup.value = meetups.value.find((meetup) => {
          console.log('meetup.id = ', meetup.id);
          return meetup.id === currentMtpId.value
        })
      console.log('currentMeetup : ', currentMeetup.value);

      return currentMeetup.value
    })


    watch(selectedMeetupId, async (newValue, oldValue) => {
      console.log('Выбрано:', newValue);
      currentMtpId.value = +newValue
    });


    function changeMeetup(action) {
      if (action === 'prev') currentMtpId.value = +currentMtpId.value - 1
      if (action === 'next') currentMtpId.value = +currentMtpId.value + 1

      selectedMeetupId.value = currentMtpId.value
    }

    // Устанавливаем хук жизненного цикла mounted
    // Он сработает, когда экземпляр компонента будет создан и затем смонтирован в DOM дерево
    // Запрашивать данные можно и просто в setup в IIFE или с .then()
    // Но с onMounted чуть безопаснее - непойманное исключение не сломает setup компонента
    onMounted(async () => {
      const meetupArr = []
      for (let i = minMtpId; i <= maxMtpId; i++) {
        try {
          const meetup = await getMeetup(i)
          meetupArr.push(meetup)
          // console.log('meetup : ', meetup);
        } catch (error) {
          console.error(error)
        }
      }
      meetups.value = meetupArr
    })

    return {
      minMtpId,
      maxMtpId,
      currentMtpId,
      currentMeetup,
      changeMeetup,
      selectedMeetupId,
      currentMeetupData
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary"
          type="button"
          :disabled="+currentMtpId < minMtpId + 1"
          @click="changeMeetup('prev')"
        >Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button">
            <input
              id="meetup-id-1"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="1"
              v-model="selectedMeetupId"
            />
            <label for="meetup-id-1" class="radio-group__label">1</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-2"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="2"
              v-model="selectedMeetupId"
            />
            <label for="meetup-id-2" class="radio-group__label">2</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-3"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="3"
              v-model="selectedMeetupId"
            />
            <label for="meetup-id-3" class="radio-group__label">3</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-4"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="4"
              v-model="selectedMeetupId"
            />
            <label for="meetup-id-4" class="radio-group__label">4</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-5"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="5"
              v-model="selectedMeetupId"
            />
            <label for="meetup-id-5" class="radio-group__label">5</label>
          </div>
        </div>

        <button class="button button--secondary" type="button"
          :disabled="+currentMtpId > maxMtpId - 1"
          @click="changeMeetup('next')"
        >Следующий</button>
      </div>



      <div class="meetup-selector__cover">
        <div class="meetup-cover">
        <h1 v-if="currentMeetupData === null" class="meetup-cover__title">Some Meetup Title</h1>
        <h1 v-else class="meetup-cover__title">{{ currentMeetupData.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
