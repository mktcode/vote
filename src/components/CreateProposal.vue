<script setup lang="ts">
import { useNewProposal } from "@/composables/useNewProposal";

defineEmits<{
  (e: "openCreateProposalModal"): void;
}>();

const { newProposalForm } = useNewProposal();
</script>

<template>
  <div class="p-3">
    <input v-model="newProposalForm.title" class="rounded-b-none text-lg" />
    <button
      @click="$emit('openCreateProposalModal')"
      class="w-full rounded-t-none"
    >
      Create new proposal
    </button>
  </div>
</template>
