<script setup lang="ts">
import { ref } from "vue";
import { useDatabase } from "@/composables/useDatabase";
import ModalBase from "@/components/ModalBase.vue";

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { userManager, user } = useDatabase();

const alias = ref("");
const password = ref("");
const error = ref("");

function login() {
  userManager.auth(alias.value, password.value, (ack: any) => {
    if (ack.err) {
      error.value = ack.err;
      return;
    }
    user.value = userManager.is;
    emit("close");
  });
}
</script>

<template>
  <ModalBase :is-open="isOpen" @close="$emit('close')">
    <template #title> Login </template>
    <template #content>
      <div class="mt-2 space-y-3">
        <input class="secondary" type="text" v-model="alias" />
        <input class="secondary" type="password" v-model="password" />
      </div>

      <div v-if="error">
        <p class="bg-red-500 text-white rounded-xl px-3 py-2 text-sm mt-3">
          {{ error }}
        </p>
      </div>

      <div class="mt-5 flex space-x-2">
        <button class="secondary" @click="$emit('close')">Cancel</button>
        <button class="grow" @click="login">Login</button>
      </div>
    </template>
  </ModalBase>
</template>
