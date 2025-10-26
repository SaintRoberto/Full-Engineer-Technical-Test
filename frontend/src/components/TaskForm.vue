<template>
  <form @submit.prevent="handleSubmit" class="mb-6">
    <!-- Input + Button Container -->
    <div class="flex gap-2 mb-1">
      <input 
        v-model="title" 
        type="text" 
        placeholder="Enter task title..."
        class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        required 
      />
      <button
        type="submit"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200"
      >
        Add Task
      </button>
    </div>
    
    <div v-if="error" class="text-sm text-red-600 mt-1">{{ error }}</div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    onSubmit: {
        type: Function,
        required: true
    },
    error: {
        type: String,
        default: ''
    }
})

const title = ref('')

const handleSubmit = () => {
    const trimmedTitle = title.value.trim()
    if (trimmedTitle) {
        props.onSubmit(trimmedTitle)
        title.value = ''
    }
}
</script>