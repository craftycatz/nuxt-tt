<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";

defineProps<{
  theme: "" | "bubble" | "snow" | undefined;
  className?: string;
}>();

const emit = defineEmits(["textChange"]);

const editorContent = ref("");
const editorRef = ref<typeof QuillEditor>();

const updateContent = () => {
  editorContent.value = editorRef.value?.getHTML();
  emit("textChange", editorContent.value);
};
</script>

<template>
  <ClientOnly>
    <div
      class="max-h-[19rem] min-h-[19rem] rounded-lg"
    >
      <QuillEditor
        :theme="theme"
        :content="editorContent"
        toolbar="essential"
        contentType="html"
        @textChange="updateContent"
        ref="editorRef"
        class="w-full overflow-y-auto max-h-[15rem] min-h-[15rem] -mt-1"
        :class="className"
      />
    </div>
  </ClientOnly>
</template>
