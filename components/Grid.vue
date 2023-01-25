<script setup lang="ts">
import { cva, VariantProps } from "class-variance-authority";
import { getCurrentInstance } from "vue";
/*
    This is extremly hacky, but it works for now.
    Sadly vue3 does not provide a way to get the number of children in a slot.
    So we have to use the current instance and get the number of children from there.
    The problem is that getCurrentInstance() is a not properly documented API and might change in the future.
    So this might break, we should keep an eye out for when vue3 supports a better way to do this.

    -- Robin
*/
const numChildren = getCurrentInstance()?.slots.default?.().length;
const isEvenChildren = numChildren! % 2 === 0;

const gridClasses = cva("grid gap-4", {
  variants: {
    col: {
      "1": "grid-cols-1",
      "2": "lg:grid-cols-2 grid-cols-1",
      auto: "grid-flow-col auto-cols-max",
    },
  },
});

type GridProps = VariantProps<typeof gridClasses>;

defineProps<{
  classes?: string;
  col: GridProps["col"];
}>();
</script>

<template>
  <div
    :class="[
      gridClasses({
        col,
      }),
      classes,
      isEvenChildren
        ? ''
        : '[&>*:last-child]:lg:col-span-2 [&>*:last-child]:lg:w-1/2 [&>*:last-child]:lg:justify-center [&>*:last-child:lg:justify-self-center [&>*:last-child]:lg:mx-auto',
    ]"
  >
    <slot />
  </div>
</template>
