<script setup lang="ts">
import { ref } from "vue";
import { db } from "@/database";
import ProposalCard from "@/components/ProposalCard.vue";
import FinalizeModal from "@/components/FinalizeModal.vue";

const proposalIds = ref<string[]>([]);
db.get("proposals")
  .map()
  .once((_proposal: any, id: string) => {
    proposalIds.value.push(id);
  });

const isFinalizeModalOpen = ref(false);
</script>

<template>
  <div class="flex flex-col">
    <main
      v-if="proposalIds.length > 0"
      class="rounded-t-xl overflow-hidden mx-3 divide-y-4 divide-gray-100 shadow-lg mt-3"
    >
      <ProposalCard
        v-for="id in proposalIds"
        :key="id"
        :proposal-id="id"
        :mode="'proposal-running'"
        @open-finalize-modal="isFinalizeModalOpen = true"
      />
    </main>

    <main v-else>
      <div class="flex flex-col items-center justify-center py-5">
        <div class="text-gray-400 text-2xl">No proposals yet</div>
        <div class="text-gray-400 text-sm mt-2">
          Create a new proposal to get started.
        </div>
      </div>
    </main>
  </div>

  <FinalizeModal
    :is-open="isFinalizeModalOpen"
    @close="isFinalizeModalOpen = false"
  />
</template>
