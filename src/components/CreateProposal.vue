<script setup lang="ts">
import { useNewProposal } from "@/composables/useNewProposal";

defineEmits<{
  (e: "openCreateProposalModal"): void;
}>();

const { newProposalTitle } = useNewProposal();
</script>

<template>
  <div>
    <input v-model="newProposalTitle" class="rounded-b-none" />
    <button @click="$emit('openCreateProposalModal')" class="rounded-t-none">
      Create proposal
    </button>
  </div>
</template>
