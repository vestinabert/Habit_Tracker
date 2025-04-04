<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <div class="form-group">
      <label for="habitName" class="form-label">Habit Name</label>
      <input
        id="habitName"
        v-model="formData.name"
        type="text"
        placeholder="Enter habit name"
        required
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Category</label>
      <div class="category-buttons">
        <button
          v-for="category in habitStore.categories"
          :key="category.name"
          type="button"
          class="category-button"
          @click="formData.category = category.name"
          :class="[
            `category-${category.name}`,
            { active: formData.category === category.name },
          ]"
        >
          <span class="habit-icon">{{ category.icon }}</span>
          {{ category.name }}
        </button>
      </div>
    </div>

    <div class="form-group">
      <label for="habitDescription" class="form-label"
        >Description (Optional)</label
      >
      <textarea
        id="habitDescription"
        v-model="formData.description"
        placeholder="Enter habit description"
        class="form-input"
        rows="3"
      ></textarea>
    </div>

    <div class="form-actions">
      <slot name="actions"></slot>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHabitStore } from '../stores/habitStore'

const habitStore = useHabitStore()

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      name: '',
      category: 'personal',
      description: '',
    }),
  },
})

const emit = defineEmits(['submit'])

const formData = ref({
  name: '',
  category: 'personal',
  description: '',
})

onMounted(() => {
  formData.value = { ...props.initialData }
})

const handleSubmit = () => {
  if (formData.value.name.trim()) {
    emit('submit', { ...formData.value })
  }
}
</script>
