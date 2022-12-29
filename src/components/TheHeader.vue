<script setup lang="ts">
import { ref } from "vue";
import { user } from "@/database";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconWallet from "./icons/IconWallet.vue";
import IconFeather from "./icons/IconFeather.vue";

defineEmits<{
  (e: "create-proposal"): void;
  (e: "login"): void;
  (e: "logout"): void;
  (e: "create-account"): void;
  (e: "open-user-modal"): void;
}>();

const freeBrowserStorage = ref(0);
const usedBrowserStorage = ref(0);

navigator.storage.estimate().then((estimate) => {
  if (estimate.quota && estimate.usage) {
    freeBrowserStorage.value = estimate.quota - estimate.usage;
    usedBrowserStorage.value = estimate.usage;
  }
});
</script>

<template>
  <header class="flex mx-3">
    <button class="secondary inset grow">
      <IconSearch />
      <span class="text-gray-300 ml-2 font-normal">Search</span>
    </button>
    <template v-if="!user">
      <button @click="$emit('create-account')" class="ml-2">
        create account
      </button>
      <button @click="$emit('login')" class="ml-2">login</button>
    </template>
    <template v-if="user">
      <button
        @click="$emit('open-user-modal')"
        class="secondary inset flex space-x-1 font-normal"
      >
        <div
          class="rounded-full w-5 h-5 bg-center bg-cover"
          :style="`background-image: url('https://ui-avatars.com/api/?background=0D8ABC&color=fff');`"
        />
        <div>
          {{ user.alias }}
        </div>
      </button>
      <button
        class="secondary inset flex space-x-1 font-normal"
        @click="$emit('open-user-modal')"
      >
        <IconWallet />
        <div>2.68 ETH</div>
      </button>
      <button class="ml-2" @click="$emit('create-proposal')">
        <IconFeather />
      </button>
    </template>
  </header>
</template>
