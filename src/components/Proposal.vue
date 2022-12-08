<script setup lang="ts">
import IconDots from "@/components/icons/IconDots.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconClock from "@/components/icons/IconClock.vue";
import IconWarning from "@/components/icons/IconWarning.vue";

defineProps<{
  mode: 'open' | 'finalizing-valid' | 'finalizing-invalid' | 'finalized';
}>();

defineEmits<{
  (e: "openFinalizeModal"): void;
}>();
</script>

<template>
  <div class="bg-white p-3">
    <div class="flex">
      <div class="flex items-center space-x-1">
        <div
          class="rounded-full w-5 h-5 bg-center bg-cover"
          style="
            background-image: url('https://ui-avatars.com/api/?background=0D8ABC&color=fff');
          "
        />
        <div class="text-gray-500">mktcode.eth</div>
        <div class="text-gray-400">proposed 1d ago</div>
      </div>
      <IconDots class="text-gray-300 ml-auto" />
    </div>
    <div class="flex space-x-2 text-sm">
      <div class="text-gray-500">to:</div>
      <div class="text-gray-400">fabien.eth</div>
    </div>
    <h2 class="text-lg leading-6 font-medium text-gray-900 mt-1">
      Unlock tokens in treasury
    </h2>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa libero
      nulla nesciunt doloremque ad culpa delectus aut.
    </p>
    <div class="space-y-1 mt-3">
      <div
        v-for="(option, i) in ['Yes', 'No']"
        :key="i"
        class="bg-gray-100 rounded-xl relative overflow-hidden"
      >
        <div
          class="w-[25%] bg-sky-400 absolute h-full"
          :class="{ 'w-[50%]': i }"
        ></div>
        <div class="text-right px-3 py-1">
          <strong>{{ option }}</strong> 100%
        </div>
      </div>
    </div>
    <div class="mt-3">
      <button
        v-if="mode === 'finalizing-invalid'"
        @click="$emit('openFinalizeModal')"
        class="warning flex justify-between"
      >
        <div class="flex flex-col">
          <div class="flex items-center mr-auto text-xl">
            <IconWarning class="w-9 h-9 mr-2" />
            Finalizing
          </div>
          <div class="text-sm">
            Differs from your data! (and 25/27 peers)
          </div>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-xs font-normal">Bond: 1 ETH</div>
          <div class="text-xs font-normal">5 Transactions</div>
        </div>
      </button>
      <button
        v-if="mode === 'finalizing-valid'"
        @click="$emit('openFinalizeModal')"
        class="flex justify-between"
      >
        <div class="flex flex-col">
          <div class="flex items-center mr-auto text-xl">
            <IconClock class="w-9 h-9 mr-2" />
            Finalizing
          </div>
          <div class="text-sm">
            Proposed data matches yours! (and 27/27 peers)
          </div>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-xs font-normal">Bond: 1 ETH</div>
          <div class="text-xs font-normal">5 Transactions</div>
        </div>
      </button>
      <button
        v-if="mode === 'open'"
        @click="$emit('openFinalizeModal')"
        class="flex justify-between"
      >
        <div class="flex items-center mr-auto text-xl">
          <IconLock class="w-9 h-9 mr-2" />
          Finalize
        </div>
        <div class="flex flex-col items-end">
          <div class="text-sm">Fee: 0.1 ETH</div>
          <div class="text-xs font-normal">Bond: 1 ETH</div>
          <div class="text-xs font-normal">5 Transactions</div>
        </div>
      </button>
      <button
        v-if="mode === 'finalized'"
        @click="$emit('openFinalizeModal')"
        class="flex justify-between"
      >
        <div class="flex flex-col">
          <div class="flex items-center mr-auto text-xl">
            <IconLock class="w-9 h-9 mr-2" />
            Finalized
          </div>
          <div class="text-sm">
            Execute 5 Transactions.
          </div>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-sm">Fee: 0.1 ETH</div>
        </div>
      </button>
    </div>
  </div>
</template>