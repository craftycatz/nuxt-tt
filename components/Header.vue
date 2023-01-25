<script setup lang="ts">
import { useAuth } from '~~/composables/useAuth';
const menuOpen = ref(false);

const { $oktaAuth } = useNuxtApp();

const closeMenu = () => (menuOpen.value = false);
const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const {signOut} = useAuth();

onMounted(() => {
  window.addEventListener("resize", closeMenu);
  window.addEventListener("orientationchange", closeMenu);
});

onUnmounted(() => {
  window.removeEventListener("resize", closeMenu);
  window.removeEventListener("orientationchange", closeMenu);
});
</script>

<template>
  <header
    class="fixed top-0 left-0 z-10 w-full border-b border-b-white backdrop-blur-[12px]"
  >
    <Container class="flex max-h-[var(--navigation-height)]">
      <div
        class="md:visible transition-[visibility]"
        :class="menuOpen ? 'visible' : 'invisible delay-500'"
      >
        <nav
          class="bg-transparent md:bg-transparent fixed top-[var(--navigation-height)] left-0 h-[calc(100vh_-_var(--navigation-height))] w-full overflow-auto transition-opacity duration-500 md:relative md:top-0 md:block md:h-auto md:w-auto md:translate-x-0 md:overflow-hidden md:opacity-100 md:transition-none"
          :class="
            menuOpen
              ? 'translate-x-0 opacity-100'
              : 'translate-x-[-100vw] opacity-0'
          "
        >
          <ul
            class="[&_li]:border-grey-dark flex h-full flex-col md:flex-row md:items-center [&_li]:ml-6 [&_li]:border-b md:[&_li]:visible md:[&_li]:border-none [&_a:hover]:text-secondary [&_a]:dark:text-white ease-in [&_a]:flex [&_a]:h-[var(--navigation-height)] [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:text-lg [&_a]:transition-[color,transform] [&_a]:duration-300 md:[&_a]:translate-y-0 md:[&_a]:text-sm [&_a]:md:transition-colors"
            :class="{ menuOpen: '[&_a]:translate-y-0' }"
          >
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <Button :size="'medium'" :onClick="signOut">
              <p class="break-keep">Sign Out</p>
            </Button>
          </ul>
        </nav>
      </div>
      <Button class="ml-6 md:hidden" :onClick="toggleMenu">
        <span class="sr-only">Menu</span>
        Menu hkhjh
      </Button>
    </Container>
  </header>
</template>
