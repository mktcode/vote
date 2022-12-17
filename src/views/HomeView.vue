<script setup lang="ts">
import { ref } from "vue";
import { useWeb3 } from "@/composables/useWeb3";
import WelcomeModal from "@/components/WelcomeModal.vue";
import CreateProposalModal from "@/components/CreateProposalModal.vue";
import TheHeader from "@/components/TheHeader.vue";
import ProposalFeed from "@/components/ProposalFeed.vue";

const isCreateProposalModalOpen = ref(false);

const { account } = useWeb3();
</script>

<template>
  <div class="max-w-xl flex flex-col mx-auto mt-3">
    <TheHeader @create-proposal="isCreateProposalModalOpen = true" />

    <ProposalFeed />
  </div>

  <WelcomeModal />

  <CreateProposalModal
    :is-open="isCreateProposalModalOpen"
    @close="isCreateProposalModalOpen = false"
  />
</template>
