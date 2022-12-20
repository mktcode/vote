<script setup lang="ts">
import { ref } from "vue";
import WelcomeModal from "@/components/WelcomeModal.vue";
import CreateProposalModal from "@/components/CreateProposalModal.vue";
import TheHeader from "@/components/TheHeader.vue";
import ProposalFeed from "@/components/ProposalFeed.vue";

const isCreateProposalModalOpen = ref(false);
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
