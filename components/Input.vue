<script setup lang="ts">
import { cva, VariantProps } from "class-variance-authority";

const value = ref<any | null>(null);

const inputClasses = cva(
  "w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  {
    variants: {
      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-6 py-4 text-lg",
      },
      variant: {
        outline: "bg-white text-gray-700",
        filled: "bg-gray-100 text-gray-700",
        "outline-error": "bg-white text-red-500",
        "filled-error": "bg-red-100 text-red-500",
      },
    },
  }
);

type inputProps = VariantProps<typeof inputClasses>;
defineProps<{
  size?: inputProps["size"];
  variant?: inputProps["variant"];
  type: string;
  placeholder?: string;
  name?: string;
  classes?: string; 
}>();

const emit = defineEmits(["valueChange"]);

const handleChange = (e: any) => {
  value.value = e.target.value;
  emit("valueChange", value.value);
};
</script>

<template>
  <div>
    <input
      :class="[
        inputClasses({
          size,
          variant,
        }),
        classes
      ]"
      :type="type"
      :placeholder="placeholder"
      :name="name"
      @change="handleChange"
    />
  </div>
</template>
