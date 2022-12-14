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

const { newProposalForm, addProposal } = useNewProposal();

enum PROPOSAL_FORM_STEPS {
  COMMON,
  VOTING,
  EXECUTION,
}

const proposalFormStep = ref<PROPOSAL_FORM_STEPS>(PROPOSAL_FORM_STEPS.COMMON);
</script>

<template>
  <ModalBase :is-open="isOpen" @close="$emit('close')">
    <template #title> Create a new proposal </template>
    <template #content>
      <div v-if="proposalFormStep === PROPOSAL_FORM_STEPS.COMMON">
        <div class="mt-2 space-y-3">
          <input
            class="secondary"
            type="text"
            v-model="newProposalForm.title"
          />
          <textarea
            class="secondary"
            placeholder="Description..."
            v-model="newProposalForm.description"
          />
          <div class="flex space-x-2">
            <input
              class="secondary"
              type="date"
              v-model="newProposalForm.start"
            />
            <input
              class="secondary"
              type="date"
              v-model="newProposalForm.end"
            />
          </div>
        </div>

        <div class="mt-5 flex space-x-2">
          <button class="secondary" @click="$emit('close')">Cancel</button>
          <button
            class="grow"
            @click="proposalFormStep = PROPOSAL_FORM_STEPS.VOTING"
          >
            Add vote options
          </button>
        </div>
      </div>

      <div v-if="proposalFormStep === PROPOSAL_FORM_STEPS.VOTING">
        <div class="mt-2">
          <p class="text-sm text-gray-500 mb-5">
            The voting type defines how results are calculated and what types of
            options can be used.
          </p>
          <select class="secondary">
            <option>Basic (Yes, No, Abstain)</option>
            <option>Ranked choice</option>
          </select>
        </div>

        <div class="mt-5 flex flex-col space-y-2">
          <div class="flex space-x-2">
            <button
              class="secondary grow"
              @click="proposalFormStep = PROPOSAL_FORM_STEPS.COMMON"
            >
              Back
            </button>
            <button
              class="grow"
              @click="proposalFormStep = PROPOSAL_FORM_STEPS.EXECUTION"
            >
              Add transactions
            </button>
          </div>
          <button @click="addProposal(), $emit('close')">
            Create proposal
          </button>
        </div>
      </div>

      <div v-if="proposalFormStep === PROPOSAL_FORM_STEPS.EXECUTION">
        <div class="mt-2">
          <p class="text-sm text-gray-500 mb-5">
            You can add everything from a single transaction, executed if the
            proposal passes, to multiple batches of transactions, e.g. to
            reflect multiple budget allocations, that can be executed based on
            the winning option.
          </p>
          <button class="w-full">Add transaction set</button>
        </div>

        <div class="mt-5 flex flex-col space-y-2">
          <div class="flex space-x-2">
            <button
              class="grow secondary"
              @click="proposalFormStep = PROPOSAL_FORM_STEPS.VOTING"
            >
              Back
            </button>
            <button class="grow" @click="addProposal(), $emit('close')">
              Create proposal
            </button>
          </div>
        </div>
      </div>
    </template>
  </ModalBase>
</template>
