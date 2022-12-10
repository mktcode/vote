<script setup lang="ts">
import { ref } from "vue";
import prettyBytes from "pretty-bytes";
import { useWeb3 } from "@/composables/useWeb3";
import IconCog from "@/components/icons/IconCog.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconConnection from "./icons/IconConnection.vue";
import IconWallet from "./icons/IconWallet.vue";
import IconStorage from "./icons/IconStorage.vue";
import { peer } from "@/peer";

const { account, accountShort, ensName, connect, disconnect } = useWeb3();

const freeBrowserStorage = ref(0);
const usedBrowserStorage = ref(0);

navigator.storage.estimate().then((estimate) => {
  if (estimate.quota && estimate.usage) {
    freeBrowserStorage.value = estimate.quota - estimate.usage;
    usedBrowserStorage.value = estimate.usage;
  }
});

const peerCount = ref(0);
setInterval(() => {
  peer.listAllPeers((peers: any) => {
    peerCount.value = peers.length;
  });
}, 1000);
</script>

<template>
  <header v-if="!account" class="p-3 pt-5 mb-3">
    <button @click="connect">Connect wallet</button>
  </header>

  <header
    v-if="account"
    class="flex flex-col m-3 mt-5 bg-white rounded-xl overflow-hidden"
  >
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
      <button class="secondary inset flex space-x-1 flex-1 font-normal">
        <IconWallet />
        <div>2.68 ETH</div>
      </button>
      <button class="secondary inset flex flex-1 space-x-1 font-normal">
        <IconStorage class="mr-2" />
        {{ prettyBytes(usedBrowserStorage) }}
      </button>
      <button class="secondary inset flex flex-1 space-x-1 font-normal">
        <IconConnection class="mr-2" /> {{ peerCount }}
      </button>
      <button class="secondary inset flex-1">
        <IconCog />
      </button>
    </div>
    <div class="flex">
      <button class="w-full secondary inset group">
        <IconSearch class="mr-2 opacity-30" />
        <div class="opacity-30 font-normal">
          Search profiles and proposals...
        </div>
      </button>
    </div>
  </header>
</template>
