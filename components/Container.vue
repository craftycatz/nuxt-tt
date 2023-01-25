<script setup lang="ts">
defineProps({
    classes: {
        type: String,
        required: false
    }
})

</script>


<template>
    <div 
        class="mx-auto max-w-[120px] px-8"
        :class="classes"
    >
        <slot />
    </div>
</template>