<script setup lang="ts">
import IconCheckCircle from "@/components/icons/IconCheckCircle.vue";
import IconDots from "@/components/icons/IconDots.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconClock from "@/components/icons/IconClock.vue";
import IconEye from "./icons/IconEye.vue";
import IconWarning from "@/components/icons/IconWarning.vue";

defineProps<{
  mode: "proposal-running" | "proposal-ended" | "finalizing-valid" | "finalizing-invalid" | "finalized";
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
      <div class="flex ml-auto mr-3 text-gray-300">
        <IconEye class="mr-1" /> 27
      </div>
      <IconDots class="text-gray-300" />
    </div>
    <div class="flex space-x-2 text-sm">
      <div class="text-gray-500">to:</div>
      <div class="text-gray-400">fabien.eth</div>
    </div>
    <h2 class="text-lg leading-6 font-medium text-gray-900 mt-1">
      Unlock tokens in treasury
    </h2>
    <div class="bg-gray-50 rounded-xl mt-3 overflow-hidden">
      <div
        v-for="(option, i) in ['Yes', 'No', 'Abstain']"
        :key="i"
        class="relative overflow-hidden"
      >
        <div
          class="bg-sky-600 absolute h-full rounded-r-xl border-b border-gray-50 z-0"
          :style="`width: ${75 - i * 25}%; opacity: ${(100 - i * 15) / 100};`"
        ></div>
        <div class="flex justify-between px-3 py-1 relative z-10">
          <strong class="text-sky-50">{{ option }}</strong>
          <div class="text-gray-400 text-sm">
            {{ 50 - i * 15 }}%
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div
        v-if="mode === 'proposal-running'"
        class="w-full bg-gray-50 text-gray-600 font-bold rounded-xl whitespace-nowrap flex items-center relative overflow-hidden"
      >
        <div
          class="w-2/3 bg-teal-500 absolute bottom-0 h-1"
        />
        <div class="flex w-full justify-between py-2 px-4 relative">
          <div>862 votes</div>
          <div class="opacity-50">Remaining 1d 2h</div>
        </div>
      </div>
      <button
        v-if="mode === 'proposal-ended'"
        @click="$emit('openFinalizeModal')"
        class="flex justify-between"
      >
        <div class="flex items-center mr-auto text-xl">
          <IconLock class="w-9 h-9 mr-2" />
          Finalize
        </div>
        <div class="opacity-50">
          All peers have the same result.
        </div>
      </button>
      <button
        v-if="mode === 'finalizing-invalid'"
        @click="$emit('openFinalizeModal')"
        class="warning flex justify-between"
      >
        <div class="flex flex-col">
          <div class="flex items-center mr-auto text-xl">
            <IconWarning class="w-9 h-9 mr-2" />
            Dispute
          </div>
        </div>
        <div class="opacity-50">25/27 peers disagree. 28m 42s</div>
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
        </div>
        <div class="opacity-50">
          28m 42s
        </div>
      </button>
      <button
        v-if="mode === 'finalized'"
        @click="$emit('openFinalizeModal')"
        class="flex justify-between"
      >
        <div class="flex flex-col">
          <div class="flex items-center mr-auto text-xl">
            <IconCheckCircle class="w-9 h-9 mr-2" />
            Final
          </div>
        </div>
        <div class="opacity-50">
          Execute 5 transactions
        </div>
      </button>
    </div>
  </div>
</template>
