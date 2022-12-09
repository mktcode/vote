<script setup lang="ts">
import { ref } from "vue";
import prettyBytes from "pretty-bytes";
import { useWeb3 } from "@/composables/useWeb3";
import IconEthereum from "@/components/icons/IconEthereum.vue";
import IconCog from "@/components/icons/IconCog.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconStar from "./icons/IconStar.vue";
import IconUsers from "./icons/IconUsers.vue";
import IconEye from "./icons/IconEye.vue";
import IconStorage from "./icons/IconStorage.vue";
import { peer } from "@/peer";

defineEmits<{
  (e: "openFollowersModal"): void;
  (e: "openFollowingModal"): void;
}>();

const { account, accountShort, ensName, connect, disconnect } = useWeb3();

const followedAccounts = ref([{}, {}, {}]);
const followingAccounts = ref([{}, {}, {}, {}, {}]);

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
  })
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
      <button class="secondary inset flex-1">
        <IconSearch />
      </button>
      <button @click="disconnect" class="secondary inset flex space-x-1 grow">
        <div
          class="rounded-full w-5 h-5 bg-center bg-cover"
          :style="`background-image: url('https://ui-avatars.com/api/?background=0D8ABC&color=fff');`"
        />
        <div>
          {{ ensName || accountShort }}
        </div>
      </button>
      <button class="secondary inset flex space-x-1 flex-1">
        <IconEthereum />
        <div>2.68 ETH</div>
        <div class="text-green-700">+0.07</div>
      </button>
      <button class="secondary inset flex-1">
        <IconCog />
      </button>
    </div>
    <div class="flex">
      <button @click="$emit('openFollowingModal')" class="secondary inset">
        <IconStar class="mr-1" /> {{ followedAccounts.length }} followed
      </button>
      <button @click="$emit('openFollowersModal')" class="secondary inset">
        <IconEye class="mr-1" /> {{ followingAccounts.length }}
        followers
      </button>
      <button class="secondary inset flex space-x-1">
        <IconStorage class="mr-1" />
        {{ prettyBytes(usedBrowserStorage) }}/{{
          prettyBytes(freeBrowserStorage)
        }}
      </button>
      <button class="secondary inset flex space-x-1">
        <IconUsers class="mr-1" /> {{ peerCount }}
      </button>
    </div>
  </header>
</template>
