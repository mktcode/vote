<script setup lang="ts">
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useNewProposal } from "@/composables/useNewProposal";

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
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="$emit('close')" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="flex flex-col items-center text-lg font-medium leading-6 text-gray-900 mb-5"
              >
                Create a new proposal
              </DialogTitle>

              <div v-if="proposalFormStep === PROPOSAL_FORM_STEPS.COMMON">
                <div class="mt-2 space-y-3">
                  <div class="relative">
                    <div
                      class="flex items-center space-x-1 absolute left-3 top-2"
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
                      class="pl-16"
                    />
                  </div>
                  <input type="text" v-model="newProposalTitle" />
                  <textarea placeholder="Proposal description..." />
                  <div class="flex space-x-2">
                    <input type="date" v-model="proposalForm.title" />
                    <input type="date" v-model="proposalForm.title" />
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
                <div class="mt-2 space-y-3">
                  <p class="text-sm text-gray-500">
                    The voting type defines how results are calculated and what
                    types of options can be used.
                  </p>
                  <select>
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
                <div class="mt-2 space-y-3">
                  <p class="text-sm text-gray-500">
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
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
