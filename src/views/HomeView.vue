<script setup lang="ts">
import { ref } from "vue";
import { useWeb3 } from "@/composables/useWeb3";
import WelcomeModal from "@/components/WelcomeModal.vue";
import CreateProposal from "@/components/CreateProposal.vue";
import CreateProposalModal from "@/components/CreateProposalModal.vue";
import TheHeader from "@/components/TheHeader.vue";
import ProposalFeed from "@/components/ProposalFeed.vue";

const isCreateProposalModalOpen = ref(false);

const { account } = useWeb3();
</script>

<template>
  <div class="max-w-xl flex flex-col mx-auto mb-10 mt-5">
    <TheHeader />

    <CreateProposal
      v-if="account"
      @open-create-proposal-modal="isCreateProposalModalOpen = true"
      class="mb-3"
    />

    <ProposalFeed />
  </div>

  <WelcomeModal />

  <CreateProposalModal
    :is-open="isCreateProposalModalOpen"
    @close="isCreateProposalModalOpen = false"
  />
</template>
