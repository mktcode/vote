<script setup lang="ts">
import ModalBase from "./ModalBase.vue";

defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <ModalBase :is-open="isOpen" @close="$emit('close')">
    <template #title>
      <IconShield class="text-fuchsia-700 w-12 h-12" />
      Finalize proposal
    </template>
    <template #content>
      <p class="text-sm text-gray-500">
        Finalizing a proposal means making it immutable, so that
        dependent actions can be initiated, like transferring funds.
        Since there is no central authority supervising the vote, a
        strong ruleset, that everyone can verify, is required.<br />
        <br />
        <strong>Anyone</strong> is allowed to finalize
        <strong>any</strong> proposal and it is technically possible
        to leave out or add (otherwise valid) votes after a proposal
        has ended. Therefore <strong>anyone</strong> can challenge a
        proposed result, within a set period, by also placing a bond.
        <strong>
          Challenged results go into a dispute period and the winner
          takes their bond back, plus the loser's bond.<br />
        </strong>
        <br />
        The advantage is, that it is almost impossible to manipulate
        or cencor results and even the creator of a proposal can't
        stop its execution.
      </p>
    </template>
    <template #footer>
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        @click="$emit('close')"
      >
        Got it, thanks!
      </button>
    </template>
  </ModalBase>
</template>
