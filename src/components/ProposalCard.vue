<script setup lang="ts">
import IconDots from "@/components/icons/IconDots.vue";
import IconEye from "./icons/IconEye.vue";
import IconHandshake from "@/components/icons/IconHandshake.vue";
import IconInfoCircle from "@/components/icons/IconInfoCircle.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconWallet from "@/components/icons/IconWallet.vue";
import IconWarning from "@/components/icons/IconWarning.vue";

defineProps<{
  proposal: any;
  mode:
    | "proposal-running"
    | "proposal-ended"
    | "finalizing-valid"
    | "finalizing-invalid"
    | "finalized";
}>();

defineEmits<{
  (e: "openFinalizeModal"): void;
}>();
</script>

<template>
  <div class="bg-white">
    <div class="px-3 py-4">
      <div class="flex">
        <div class="flex items-center space-x-2 leading-4">
          <div
            class="rounded-full w-8 h-8 bg-center bg-cover"
            style="
              background-image: url('https://ui-avatars.com/api/?background=0D8ABC&color=fff');
            "
          />
          <div>
            <div class="flex space-x-2">
              <div class="text-gray-500">mktcode.eth</div>
              <div class="text-gray-400">1d ago</div>
            </div>
            <div class="flex space-x-2 text-sm">
              <div class="text-gray-500">to:</div>
              <div class="text-gray-400">fabien.eth</div>
            </div>
          </div>
        </div>
        <div class="flex ml-auto mr-3 text-gray-300">
          <IconEye class="mr-1" /> 27
        </div>
        <IconDots class="text-gray-300" />
      </div>
      <h2 class="text-xl leading-6 font-medium text-gray-900 mt-3">
        {{ proposal.title }}
      </h2>
    </div>
    <div class="bg-gray-50">
      <div
        v-for="(option, i) in ['Yes', 'No', 'Abstain']"
        :key="i"
        class="relative overflow-hidden"
      >
        <div
          class="bg-sky-600 absolute h-full rounded-r-xl"
          :style="`width: ${75 - i * 25}%; opacity: ${(100 - i * 15) / 100};`"
        ></div>
        <div class="flex justify-between px-3 py-1 relative">
          <strong class="text-sky-50">{{ option }}</strong>
          <div class="text-gray-400 text-sm">{{ 50 - i * 15 }}%</div>
        </div>
      </div>
    </div>
    <div class="p-3">
      <div
        v-if="mode === 'proposal-running'"
        class="flex justify-between items-center text-gray-600 font-bold"
      >
        <div>862 votes</div>
        <div class="opacity-50">Remaining time: 1d 2h</div>
      </div>
      <div v-if="mode === 'proposal-ended'">
        <div class="flex justify-between items-center text-gray-600 font-bold">
          <div class="flex flex-col grow">
            <div>862 votes</div>
            <div class="opacity-50">Proposal has ended.</div>
          </div>
          <button @click="$emit('openFinalizeModal')" class="flex items-center">
            <IconLock class="w-9 h-9 mr-2" />
            Lock results
          </button>
        </div>
      </div>
      <div v-if="mode === 'finalizing-invalid'">
        <div class="flex justify-between items-center text-gray-600 font-bold">
          <div class="flex flex-col grow">
            <div>862 votes</div>
            <div class="opacity-50">Results locked in: 28m 42s</div>
          </div>
          <button
            @click="$emit('openFinalizeModal')"
            class="flex items-center warning"
          >
            <IconWarning class="w-9 h-9 mr-2" />
            Dispute result
          </button>
        </div>
      </div>
      <div v-if="mode === 'finalizing-valid'">
        <div class="flex justify-between items-center text-gray-600 font-bold">
          <div class="flex flex-col grow">
            <div>862 votes</div>
            <div class="opacity-50">Results locked in: 34m 20s</div>
          </div>
          <button
            @click="$emit('openFinalizeModal')"
            class="flex items-center secondary shadow-none"
          >
            <IconHandshake class="w-9 h-9 mr-2" />
            All observers agree.
            <IconInfoCircle class="w-9 h-9 ml-2 text-gray-300" />
          </button>
        </div>
      </div>
      <div v-if="mode === 'finalized'">
        <div class="flex justify-between items-center text-gray-600 font-bold">
          <div class="flex flex-col grow">
            <div>862 votes</div>
            <div class="opacity-50">Results are final.</div>
          </div>
          <button @click="$emit('openFinalizeModal')" class="flex items-center">
            <IconWallet class="w-9 h-9 mr-2" />
            Execute transactions
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
