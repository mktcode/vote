<script setup lang="ts">
import { ref } from "vue";
import { useWeb3 } from "@/composables/useWeb3";
import IconCog from "@/components/icons/IconCog.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconWallet from "./icons/IconWallet.vue";
import IconFeather from "./icons/IconFeather.vue";

defineEmits<{
  (e: "create-proposal"): void;
}>();

const { account, accountShort, ensName, connect, disconnect } = useWeb3();

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
    <template v-if="!account">
      <button @click="connect" class="ml-2">Connect wallet</button>
    </template>
    <template v-if="account">
      <button @click="disconnect" class="secondary inset flex space-x-1 font-normal">
        <div
          class="rounded-full w-5 h-5 bg-center bg-cover"
          :style="`background-image: url('https://ui-avatars.com/api/?background=0D8ABC&color=fff');`"
        />
        <div>
          {{ ensName || accountShort }}
        </div>
      </button>
      <button class="secondary inset flex space-x-1 font-normal">
        <IconWallet />
        <div>2.68 ETH</div>
      </button>
      <button class="ml-2" @click="$emit('create-proposal')">
        <IconFeather />
      </button>
    </template>
  </header>
</template>
