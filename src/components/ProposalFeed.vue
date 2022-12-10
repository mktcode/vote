<script setup lang="ts">
import { ref } from "vue";
import { from, useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { TransitionRoot } from "@headlessui/vue";
import { db, type Proposal } from "../db";
import ProposalCard from "@/components/ProposalCard.vue";
import FinalizeModal from "@/components/FinalizeModal.vue";

const proposals = useObservable<Proposal[]>(
  from(liveQuery(() => db.proposals.toArray()))
)

const isFinalizeModalOpen = ref(false);
const newProposalsCount = ref(0);
setInterval(() => {
  newProposalsCount.value++;
}, 10000);
</script>

<template>
  <div class="flex flex-col">
    <TransitionRoot
      appear
      :show="newProposalsCount > 0"
      as="template"
      enter="transform transition duration-[400ms]"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transform duration-200 transition ease-in-out"
      leave-from="opacity-100 scale-100 "
      leave-to="opacity-0 scale-95 "
    >
      <div class="px-3">
        <button
          @click="newProposalsCount = 0"
          class="w-full inset justify-center text-sm !text-gray-400 font-normal secondary"
        >
          {{ newProposalsCount }} new proposals
        </button>
      </div>
    </TransitionRoot>

    <main
      class="rounded-t-xl overflow-hidden mx-3 divide-y-4 divide-gray-100 shadow-lg mt-3"
    >
      <ProposalCard
        v-for="proposal in proposals"
        :key="proposal.hash"
        :mode="'proposal-running'"
        @open-finalize-modal="isFinalizeModalOpen = true"
      />
    </main>
  </div>

  <FinalizeModal
    :is-open="isFinalizeModalOpen"
    @close="isFinalizeModalOpen = false"
  />
</template>
