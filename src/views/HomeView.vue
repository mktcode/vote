<script setup lang="ts">
import { ref } from "vue";
import { useNewProposal } from "@/composables/useNewProposal";
import { useWeb3 } from "@/composables/useWeb3";
import IconDots from "@/components/icons/IconDots.vue";
import IconLock from "@/components/icons/IconLock.vue";
import FinalizeModal from "@/components/FinalizeModal.vue";
import FollowersModal from "@/components/FollowersModal.vue";
import FollowingModal from "@/components/FollowingModal.vue";
import WelcomeModal from "@/components/WelcomeModal.vue";
import CreateProposal from "@/components/CreateProposal.vue";
import CreateProposalModal from "@/components/CreateProposalModal.vue";
import TheHeader from "@/components/TheHeader.vue";

const isFollowersModalOpen = ref(false);
const isFollowingModalOpen = ref(false);
const isFinalizeModalOpen = ref(false);
const isCreateProposalModalOpen = ref(false);

const { account, accountShort } = useWeb3();
</script>

<template>
  <div class="max-w-xl flex flex-col mx-auto">
    <TheHeader
      @open-followers-modal="isFollowersModalOpen = true"
      @open-following-modal="isFollowingModalOpen = true"
    />

    <main v-if="account" class="p-3">
      <CreateProposal @open-create-proposal-modal="isCreateProposalModalOpen = true" />

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

  <FollowingModal
    :is-open="isFollowingModalOpen"
    @close="isFollowingModalOpen = false"
  />

  <FinalizeModal
    :is-open="isFinalizeModalOpen"
    @close="isFinalizeModalOpen = false"
  />

  <CreateProposalModal
    :is-open="isCreateProposalModalOpen"
    @close="isCreateProposalModalOpen = false"
  />
</template>
