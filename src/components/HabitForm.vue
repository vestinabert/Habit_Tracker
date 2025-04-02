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
          v-for="category in categories"
          :key="category.name"
          type="button"
          class="category-button"
          :class="[
            `category-${category.name}`,
            { active: formData.category === category.name },
          ]"
          @click="formData.category = category.name"
        >
          <span class="category-icon">{{ category.icon }}</span>
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
import { useHabitCategory } from '../composables/useHabitCategory'

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

const { categories } = useHabitCategory()

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
