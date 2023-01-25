<script setup lang="ts">
import { TRPCClientError } from "@trpc/client";
definePageMeta({
  layout: "empty",
  title: "Sign in",
});

const { $oktaAuth, $client } = useNuxtApp();

const login = async () => {
  try {
    await $oktaAuth.signInWithRedirect({
      redirectUri: "http://localhost:3000/signin/callback",
      originalUri: "/",
      scopes: ["openid", "profile", "groups"],
    });

    const token = await $oktaAuth.getAccessToken();
    const refreshToken = await $oktaAuth.tokenManager.get("refreshToken");
    const userToken = await $oktaAuth.getUser();

    const user = {
      name: userToken.name!,
      email: userToken.preferred_username!,
      role: "apprentice",
      token: String(token),
      refreshToken: String(refreshToken),
    };
    await $client.userRouter.login.mutate(user);
  } catch (error) {
    if (error instanceof TRPCClientError) {
      console.log(error);
    }
  }
};
</script>

<template>
  <ClientOnly>
    <div class="flex justify-center items-center h-screen">
      <Card :classes="'w-1/3'">
        <div class="flex flex-col items-center justify-center">
          <h1 class="font-semi text-lg">Login</h1>
          <div class="flex justify-center mt-2">
            <Button :size="'large'" :onClick="login">
              Sign in with Okta
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </ClientOnly>
</template>
