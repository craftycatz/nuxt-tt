<script setup lang="ts">
definePageMeta({
  title: "Dashboard",
  middleware: "auth",
});

</script>

<template>
  <div class="h-screen w-full flex flex-col justify-center items-center">
    <Grid :col="'2'">
      <p>1</p>
      <p>2</p>
      <p>3</p>
    </Grid>
  </div>
</template>
