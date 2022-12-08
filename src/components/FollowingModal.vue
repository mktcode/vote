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
    <template #title> Following </template>
    <template #content> Following nobody yet. </template>
  </ModalBase>
</template>
