<script setup lang="ts">
import { user, logout } from "@/database";
import ModalBase from "@/components/ModalBase.vue";

defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <ModalBase :is-open="isOpen" @close="$emit('close')">
    <template #content>
      <div v-if="user" class="flex flex-col items-center">
        <div
          class="rounded-full w-16 h-16 bg-center bg-cover"
          :style="`background-image: url('https://ui-avatars.com/api/?background=0D8ABC&color=fff');`"
        />
        <div class="text-2xl font-bold mt-2 text-gray-300">
          @{{ user.alias }}
        </div>
      </div>
      <div class="mt-5 flex flex-col space-y-2">
        <button @click="$emit('close')">Add wallet</button>
        <button class="secondary inset" @click="$emit('close'), logout()">
          Logut
        </button>
      </div>
    </template>
  </ModalBase>
</template>
