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
    <template #title> Followers </template>
    <template #content> No followers yet. </template>
  </ModalBase>
</template>
