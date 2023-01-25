<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
const buttonClasses = cva("w-max relative rounded-lg font-medium focus:outline-none", {
    variants: {
        variant: {
        primary: [
          "bg-primary text-white  border border-transparent-white backdrop-filter-[12px] hover:bg-opacity-20 transition-colors ease-in",
          "[&_.icon-wrapper]: ml-2",
        ],
        secondary: [
          "text-white bg-secondary bg-opacity-10 border border-transparent-white backdrop-filter-[12px] hover:bg-opacity-20 transition-colors ease-in",
          "[&_.icon-wrapper]: ml-2",
        ],
        ghost: [
          "text-primary bg-transparent border border-primary hover:bg-primary hover:bg-opacity-20 transition-colors border-none ease-in",
          "[&_.icon-wrapper]: mr-2",
        ],
      },
      size: {
        small: "text-xs px-3 h-6",
        medium: "text-sm px-4 h-8",
        large: "text-md px-6 h-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
})

type ButtonProps = VariantProps<typeof buttonClasses>;
defineProps<{
    classes?: string
    onClick?: () => void
    size?: ButtonProps['size']
    variant?: ButtonProps['variant']
}>()

const IconWrapper = (props: any, context:any) => {
    h('div', {
        class: 'icon-wrapper px-2'
    }, context.slots)
}

</script>

<template>
    <button
        :class="[
            buttonClasses({
                size,
                variant
            }),
            classes
        ]"
        @click="onClick"
    >
        <slot />
    </button>
</template>