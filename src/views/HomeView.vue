<script setup lang="ts">
import { ref } from "vue";
import WelcomeModal from "@/components/WelcomeModal.vue";
import LoginModal from "@/components/LoginModal.vue";
import UserModal from "@/components/UserModal.vue";
import CreateAccountModal from "@/components/CreateAccountModal.vue";
import CreateProposalModal from "@/components/CreateProposalModal.vue";
import TheHeader from "@/components/TheHeader.vue";
import ProposalFeed from "@/components/ProposalFeed.vue";

const isCreateProposalModalOpen = ref(false);
const isLoginModalOpen = ref(false);
const isCreateAccountModalOpen = ref(false);
const isUserModalOpen = ref(false);
</script>

<template>
  <div class="max-w-xl flex flex-col mx-auto mt-3">
    <TheHeader
      @create-proposal="isCreateProposalModalOpen = true"
      @create-account="isCreateAccountModalOpen = true"
      @login="isLoginModalOpen = true"
      @open-user-modal="isUserModalOpen = true"
    />

    <ProposalFeed />
  </div>

  <WelcomeModal />

  <CreateAccountModal
    :is-open="isCreateAccountModalOpen"
    @close="isCreateAccountModalOpen = false"
  />

  <LoginModal :is-open="isLoginModalOpen" @close="isLoginModalOpen = false" />

  <UserModal :is-open="isUserModalOpen" @close="isUserModalOpen = false" />

  <CreateProposalModal
    :is-open="isCreateProposalModalOpen"
    @close="isCreateProposalModalOpen = false"
  />
</template>
