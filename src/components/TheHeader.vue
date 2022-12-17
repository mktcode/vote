<script setup lang="ts">
import { ref } from "vue";
import prettyBytes from "pretty-bytes";
import { useWeb3 } from "@/composables/useWeb3";
import IconCog from "@/components/icons/IconCog.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconConnection from "./icons/IconConnection.vue";
import IconWallet from "./icons/IconWallet.vue";
import IconStorage from "./icons/IconStorage.vue";

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
  <header v-if="!account" class="p-3">
    <button @click="connect" class="w-full">Connect wallet</button>
  </header>

  <header v-if="account" class="flex flex-col mx-3">
    <div class="flex">
      <button @click="disconnect" class="secondary inset flex space-x-1 grow">
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
      <button class="secondary inset flex space-x-1 font-normal">
        <IconStorage class="mr-2" />
        {{ prettyBytes(usedBrowserStorage) }}
      </button>
      <button class="secondary inset flex space-x-1 font-normal">
        <IconConnection class="mr-2" /> 5
      </button>
      <button class="secondary inset">
        <IconCog />
      </button>
    </div>
    <button class="w-full secondary inset group h-12 mt-3">
      <IconSearch class="mr-2 opacity-30" />
      <div class="opacity-30 font-normal">Search profiles and proposals...</div>
    </button>
  </header>
</template>
