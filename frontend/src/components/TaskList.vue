<template>
  <transition-group name="task" tag="div" v-if="tasks.length" class="space-y-3">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3"
    >
      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          :checked="task.status === 'completed'"
          @change="$emit('toggle-task', task.id)"
          class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <span
          :class="[
            'text-base',
            task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'
          ]"
        >
          {{ task.title }}
        </span>
      </div>
      <span
        class="text-xs font-semibold px-2 py-1 rounded-full"
        :class="{
          'bg-yellow-100 text-yellow-700': task.status === 'pending',
          'bg-green-100 text-green-700': task.status === 'completed'
        }"
      >
        {{ task.status }}
      </span>
    </div>
  </transition-group>

  <!-- Empty State -->
  <div v-else class="text-center text-gray-500 mt-4">
    No tasks yet. Add one above! ✨
  </div>
</template>

<script setup>

const emit = defineEmits(['toggle-task'])

const props = defineProps({
    tasks: {
        type: Array,
        required: true,
        default: () => []
    }
})
</script>