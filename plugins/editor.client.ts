import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
// OR | AND
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
// you can use both themes at the same time and use them interchangeably

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("QuillEditor", QuillEditor);
});
