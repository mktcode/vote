<script setup lang="ts">
import { ref } from "vue";
import { useNewProposal } from "@/composables/useNewProposal";
import ModalBase from "@/components/ModalBase.vue";

defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  (e: "close"): void;
}>();

const { newProposalTitle } = useNewProposal();

const proposalForm = ref<{
  to: string;
  title: string;
}>({
  to: "mktcode.eth",
  title: newProposalTitle.value,
});

enum PROPOSAL_FORM_STEPS {
  COMMON,
  VOTING,
  EXECUTION,
}

const proposalFormStep = ref<PROPOSAL_FORM_STEPS>(PROPOSAL_FORM_STEPS.COMMON);
</script>

<template>
  <ModalBase :is-open="isOpen" @close="$emit('close')">
    <template #title>
      Create a new proposal
    </template>
    <template #content>
      <div v-if="proposalFormStep === PROPOSAL_FORM_STEPS.COMMON">
        <div class="mt-2 space-y-3">
          <div class="relative">
            <div
              class="flex items-center space-x-1 absolute left-3 top-[10px]"
            >
              <div class="text-gray-400">To:</div>
              <div
                class="rounded-full w-5 h-5 bg-center bg-cover"
                style="
                  background-image: url('https://ui-avatars.com/api/?background=0D8ABC&color=fff');
                "
              />
            </div>
            <input
              type="text"
              v-model="proposalForm.to"
              class="secondary pl-16"
            />
          </div>
          <input class="secondary" type="text" v-model="newProposalTitle" />
          <textarea class="secondary" placeholder="Proposal description..." />
          <div class="flex space-x-2">
            <input class="secondary" type="date" v-model="proposalForm.title" />
            <input class="secondary" type="date" v-model="proposalForm.title" />
          </div>
        </div>

        <div class="mt-5 flex space-x-2">
          <button class="secondary" @click="$emit('close')">
            Cancel
          </button>
          <button
            @click="proposalFormStep = PROPOSAL_FORM_STEPS.VOTING"
          >
            Add vote options
          </button>
        </div>
      </div>

      <div v-if="proposalFormStep === PROPOSAL_FORM_STEPS.VOTING">
        <div class="mt-2">
          <p class="text-sm text-gray-500 mb-5">
            The voting type defines how results are calculated and what
            types of options can be used.
          </p>
          <select class="secondary">
            <option>Basic (Yes, No, Abstain)</option>
            <option>Ranked choice</option>
          </select>
        </div>

        <div class="mt-5 flex flex-col space-y-2">
          <div class="flex space-x-2">
            <button
              class="secondary"
              @click="proposalFormStep = PROPOSAL_FORM_STEPS.COMMON"
            >
              Back
            </button>
            <button
              @click="proposalFormStep = PROPOSAL_FORM_STEPS.EXECUTION"
            >
              Add transactions
            </button>
          </div>
          <button @click="$emit('close')">Create proposal</button>
        </div>
      </div>

      <div v-if="proposalFormStep === PROPOSAL_FORM_STEPS.EXECUTION">
        <div class="mt-2">
          <p class="text-sm text-gray-500 mb-5">
            You can add everything from a single transaction, executed
            if the proposal passes, to multiple batches of transactions,
            e.g. to reflect multiple budget allocations, that can be
            executed based on the winning option.
          </p>
          <button>Add transaction set</button>
        </div>

        <div class="mt-5 flex flex-col space-y-2">
          <div class="flex space-x-2">
            <button
              class="secondary"
              @click="proposalFormStep = PROPOSAL_FORM_STEPS.VOTING"
            >
              Back
            </button>
            <button @click="$emit('close')">Create proposal</button>
          </div>
        </div>
      </div>
    </template>
  </ModalBase>
</template>
