<script setup lang="ts">
import { ref } from "vue";
import prettyBytes from "pretty-bytes";
import { useWeb3 } from "@/composables/useWeb3";
import IconCog from "@/components/icons/IconCog.vue";
import IconDots from "@/components/icons/IconDots.vue";
import IconEthereum from "@/components/icons/IconEthereum.vue";
import IconStorage from "@/components/icons/IconStorage.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconUsers from "@/components/icons/IconUsers.vue";
import IconStar from "@/components/icons/IconStar.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import FinalizeModal from "@/components/FinalizeModal.vue";
import FollowersModal from "@/components/FollowersModal.vue";
import WelcomeModal from "@/components/WelcomeModal.vue";
import ProposalCreateModal from "@/components/ProposalCreateModal.vue";

const isFollowersModalOpen = ref(false);
const isFinalizeModalOpen = ref(false);
const isProposalCreateModalOpen = ref(false);

const { account, accountShort, connect, disconnect } = useWeb3();
connect();

const newProposalTitle = ref("Hello World!");

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
  <div class="max-w-xl flex flex-col mx-auto">
    <header v-if="!account" class="p-3 pt-5">
      <button @click="connect">connect</button>
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
        <button @click="isFollowersModalOpen = true" class="secondary">
          <IconStar class="mr-3" /> {{ followedAccounts.length }} followed
        </button>
        <button @click="isFollowersModalOpen = true" class="secondary">
          <IconUsers class="mr-3" /> {{ followingAccounts.length }} following
          you
        </button>
        <button @click="disconnect" class="secondary flex space-x-1 w-1/3">
          <IconStorage class="mr-1" />
          {{ prettyBytes(usedBrowserStorage) }}/{{
            prettyBytes(freeBrowserStorage)
          }}
        </button>
      </div>
    </header>

    <main v-if="account" class="p-3">
      <input v-model="newProposalTitle" class="rounded-b-none" />
      <button @click="isProposalCreateModalOpen = true" class="rounded-t-none">
        Create proposal
      </button>

      <div class="mt-5">
        <div class="border rounded-xl p-3">
          <div class="flex">
            <div class="flex items-center space-x-1">
              <div
                class="rounded-full w-5 h-5 bg-center bg-cover"
                style="
                  background-image: url('https://ui-avatars.com/api/?background=0D8ABC&color=fff');
                "
              />
              <div class="text-gray-500">mktcode.eth</div>
              <div class="text-gray-400">proposed 1d ago</div>
            </div>
            <IconDots class="text-gray-300 ml-auto" />
          </div>
          <div class="flex space-x-2 text-sm">
            <div class="text-gray-500">to:</div>
            <div class="text-gray-400">{{ accountShort }}</div>
          </div>
          <h2 class="text-lg leading-6 font-medium text-gray-900 mt-1">
            Unlock tokens in treasury
          </h2>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa libero
            nulla nesciunt doloremque ad culpa delectus aut.
          </p>
          <div class="space-y-1 mt-3">
            <div
              v-for="(option, i) in ['Yes', 'No']"
              :key="i"
              class="bg-gray-100 rounded-xl relative overflow-hidden"
            >
              <div
                class="w-[25%] bg-blue-400 absolute h-full"
                :class="{ 'w-[50%]': i }"
              ></div>
              <div class="text-right px-3 py-1">
                <strong>{{ option }}</strong> 100%
              </div>
            </div>
          </div>
          <div class="mt-3">
            <button
              @click="isFinalizeModalOpen = true"
              class="secondary flex justify-between"
            >
              <div class="flex items-center mr-auto text-xl">
                <IconLock class="w-9 h-9 mr-2" />
                Finalize
              </div>
              <div class="flex flex-col items-end">
                <div class="text-sm">Fee: 0.1 ETH</div>
                <div class="text-xs font-normal">Bond: 1 ETH</div>
                <div class="text-xs font-normal">5 Transactions</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>

  <WelcomeModal />
  
  <FollowersModal
    :is-open="isFollowersModalOpen"
    @close="isFollowersModalOpen = false"
  />

  <FinalizeModal
    :is-open="isFinalizeModalOpen"
    @close="isFinalizeModalOpen = false"
  />

  <ProposalCreateModal
    :is-open="isProposalCreateModalOpen"
    :proposal-title="newProposalTitle"
    @close="isProposalCreateModalOpen = false"
  />
</template>
