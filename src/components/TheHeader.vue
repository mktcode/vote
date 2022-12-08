<script setup lang="ts">
import { ref } from "vue";
import prettyBytes from "pretty-bytes";
import { useWeb3 } from "@/composables/useWeb3";
import IconEthereum from "@/components/icons/IconEthereum.vue";
import IconCog from "@/components/icons/IconCog.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconStar from "./icons/IconStar.vue";
import IconUsers from "./icons/IconUsers.vue";
import IconStorage from "./icons/IconStorage.vue";

defineEmits<{
  (e: "openFollowersModal"): void;
  (e: "openFollowingModal"): void;
}>();

const { account, accountShort, connect, disconnect } = useWeb3();

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
</script>

<template>
  <header v-if="!account" class="p-3 pt-5 mb-3">
    <button @click="connect">Connect wallet</button>
  </header>

  <header v-if="account" class="flex flex-col p-3 pt-5 space-y-3">
    <div class="flex space-x-3">
      <button class="secondary flex-1">
        <IconSearch />
      </button>
      <button @click="disconnect" class="secondary flex space-x-1 grow">
        <div
          class="rounded-full w-5 h-5 bg-center bg-cover"
          style="
            background-image: url('https://ui-avatars.com/api/?background=0D8ABC&color=fff');
          "
        />
        <div>
          {{ accountShort }}
        </div>
      </button>
      <button class="secondary flex space-x-1 flex-1">
        <IconEthereum />
        <div>2.68 ETH</div>
        <div class="text-green-700">+0.07</div>
      </button>
      <button class="secondary flex-1">
        <IconCog />
      </button>
    </div>
    <div class="flex space-x-3">
      <button @click="$emit('openFollowingModal')" class="secondary">
        <IconStar class="mr-3" /> {{ followedAccounts.length }} followed
      </button>
      <button @click="$emit('openFollowersModal')" class="secondary">
        <IconUsers class="mr-3" /> {{ followingAccounts.length }}
        following you
      </button>
      <button @click="disconnect" class="secondary flex space-x-1 w-1/3">
        <IconStorage class="mr-1" />
        {{ prettyBytes(usedBrowserStorage) }}/{{
          prettyBytes(freeBrowserStorage)
        }}
      </button>
    </div>
  </header>
</template>
