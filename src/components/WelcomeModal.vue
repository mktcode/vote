<script setup lang="ts">
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const isOpen = ref(true);
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="isOpen = false" class="relative z-10">
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
                Welcome!
              </DialogTitle>
              <div class="mt-2 space-y-3">
                <p class="font-bold text-gray-700">
                  This is a proof of concept to demonstrate a fully
                  decentralized voting system with on-chain execution
                  capabilities.
                </p>
                <p class="text-sm text-gray-500">
                  Proposals and votes are being distributed to all participants
                  and finalized in a "propose and dispute" process. The final
                  result is stored on the Ethereum blockchain and can trigger
                  additional transactions.
                </p>
                <p class="text-sm text-gray-500">
                  Proposals have an author and a recipient, like an organization
                  account, a single user or a smart contract.
                  Recipients/organizations can restrict what proposals they
                  accept, what actions they can trigger and who can vote on
                  them, according to a custom voting power strategy.
                </p>
                <p class="text-sm text-purple-900">
                  No central authority is involved in the process! Signaling
                  servers, hosted by the community, are used to connect users
                  only. Data is exchanged peer-to-peer and storage is
                  distributed.
                </p>
              </div>

              <div class="mt-5">
                <button @click="isOpen = false">Got it, thanks!</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
