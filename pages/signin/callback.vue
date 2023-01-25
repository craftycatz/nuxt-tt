<script>
import { defineComponent, h } from "vue";
export default defineComponent({
  name: "LoginCallback",
  data() {
    return {
      error: null,
    };
  },
  async beforeMount() {
    try {
      await this.$auth.handleLoginRedirect();
    } catch (e) {
      const isInteractionRequiredError =
        this.$auth.isInteractionRequiredError ||
        this.$auth.idx.isInteractionRequiredError;
      if (isInteractionRequiredError(e)) {
        const { onAuthResume, onAuthRequired } = this.$auth.options;
        const callbackFn = onAuthResume || onAuthRequired;
        if (callbackFn) {
          callbackFn(this.$auth);
          return;
        }
      }
      this.error = e.toString();
    }
  },
  render() {
    if (this.$slots.error) {
      return h("div", this.$slots.error({ error: this.error }));
    }
    return this.error;
  },
});
</script>
