<script setup lang="ts">
import { ref } from "vue";
import { useWeb3 } from "@/composables/useWeb3";
import FinalizeModal from "@/components/FinalizeModal.vue";
import FollowersModal from "@/components/FollowersModal.vue";
import FollowingModal from "@/components/FollowingModal.vue";
import WelcomeModal from "@/components/WelcomeModal.vue";
import CreateProposal from "@/components/CreateProposal.vue";
import CreateProposalModal from "@/components/CreateProposalModal.vue";
import TheHeader from "@/components/TheHeader.vue";
import Proposal from "@/components/Proposal.vue";

const isFollowersModalOpen = ref(false);
const isFollowingModalOpen = ref(false);
const isFinalizeModalOpen = ref(false);
const isCreateProposalModalOpen = ref(false);

const { account } = useWeb3();
</script>

<template>
  <div class="max-w-xl flex flex-col mx-auto mb-10 mt-5">
    <TheHeader
      @open-followers-modal="isFollowersModalOpen = true"
      @open-following-modal="isFollowingModalOpen = true"
    />

    <CreateProposal
      v-if="account"
      @open-create-proposal-modal="isCreateProposalModalOpen = true"
      class="mb-3"
    />

    <div class="px-3 -mb-5 z-0">
      <button class="justify-center text-sm font-normal opacity-50 pb-7">
        3 new proposals
      </button>
    </div>

    <main class="rounded-xl overflow-hidden mx-3 divide-y-8 divide-gray-100 z-10">
      <Proposal
        :mode="'open'"
        @open-finalize-modal="isFinalizeModalOpen = true"
      />
      <Proposal
        :mode="'finalizing-valid'"
        @open-finalize-modal="isFinalizeModalOpen = true"
      />
      <Proposal
        :mode="'finalizing-invalid'"
        @open-finalize-modal="isFinalizeModalOpen = true"
      />
      <Proposal
        :mode="'finalized'"
        @open-finalize-modal="isFinalizeModalOpen = true"
      />
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
