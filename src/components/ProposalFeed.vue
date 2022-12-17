<script setup lang="ts">
import { ref } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import { useGun } from '@gun-vue/composables'
import ProposalCard from "@/components/ProposalCard.vue";
import FinalizeModal from "@/components/FinalizeModal.vue";
import type { Proposal } from "@/composables/useNewProposal";

const gun = useGun({ peers: [ 'http://192.168.178.29:4200/gun'] });

const proposals = ref<Proposal[]>([]);
gun.get('proposals').map().once((proposal: Proposal) => {
  proposals.value.push(proposal);
})

const isFinalizeModalOpen = ref(false);
const newProposalsCount = ref(1);
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
      v-if="proposals && proposals.length > 0"
      class="rounded-t-xl overflow-hidden mx-3 divide-y-4 divide-gray-100 shadow-lg mt-3"
    >
      <ProposalCard
        v-for="(proposal, hash) in proposals"
        :key="hash"
        :proposal="proposal"
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
