<script setup lang="ts">
defineProps<{
  classes?: string;
}>();
</script>

<template>
  <div
    class="my-2 rounded-lg dark:bg-neutral bg-white drop-shadow-lg p-6 text-black dark:text-white min-h-fit min-w-fit"
    :class="classes"
  >
    <slot />
  </div>
</template>
