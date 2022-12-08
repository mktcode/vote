<script setup lang="ts">
import { ref } from "vue";
import { useWeb3 } from "@/composables/useWeb3";
import IconCog from "@/components/icons/IconCog.vue";
import IconDots from "@/components/icons/IconDots.vue";
import IconShield from "@/components/icons/IconShield.vue";
import IconStorage from "@/components/icons/IconStorage.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconUsers from "@/components/icons/IconUsers.vue";
import IconStar from "@/components/icons/IconStar.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import prettyBytes from "pretty-bytes";

const isFollowedModalOpen = ref(false);

function closeFollowedModal() {
  isFollowedModalOpen.value = false;
}
function openFollowedModal() {
  isFollowedModalOpen.value = true;
}

const isFinalizeModalOpen = ref(false);

function closeFinalizeModal() {
  isFinalizeModalOpen.value = false;
}
function openFinalizeModal() {
  isFinalizeModalOpen.value = true;
}

const { account, accountShort, connect, disconnect } = useWeb3();
connect();

const title = ref("Hello World");

const createProposal = async () => {
  const proposal = {
    title: title.value,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    choices: ["Yes", "No"],
    start: new Date().getTime(),
    end: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
    timestamp: undefined,
  };
  console.log(proposal);
};

const followedAccounts = ref([]);
const followingAccounts = ref([]);

const freeBrowserStorage = ref(0);
const usedBrowserStorage = ref(0);
navigator.storage.estimate().then((estimate) => {
  if (estimate.quota && estimate.usage) {
    freeBrowserStorage.value = estimate.quota - estimate.usage;
    usedBrowserStorage.value = estimate.usage;
  }
});
</script>

<template>
  <div class="max-w-xl flex flex-col mx-auto">
    <header v-if="!account" class="p-3 pt-5">
      <button @click="connect">connect</button>
    </header>

    <header v-if="account" class="flex flex-col p-3 pt-5 space-y-3">
      <div class="flex space-x-3">
        <button @click="openFollowedModal" class="secondary flex-1">
          <IconSearch />
        </button>
        <button @click="disconnect" class="secondary flex space-x-1 grow">
          <div
            class="rounded-full w-5 h-5 bg-center bg-cover"
            style="
              background-image: url('https://ui-avatars.com/api/?background=0D8ABC&color=fff');
            "
          />
          <div>
            {{ accountShort }}
          </div>
        </button>
        <button class="secondary flex space-x-1 flex-1">
          <div>2.68 ETH</div>
          <div class="text-green-700">+0.07</div>
        </button>
        <button @click="openFollowedModal" class="secondary flex-1">
          <IconCog />
        </button>
      </div>
      <div class="flex space-x-3">
        <button @click="openFollowedModal" class="secondary">
          <IconStar class="mr-3" /> {{ followedAccounts.length }} followed
        </button>
        <button @click="openFollowedModal" class="secondary">
          <IconUsers class="mr-3" /> {{ followingAccounts.length }} following
          you
        </button>
        <button @click="disconnect" class="secondary flex space-x-1 w-1/3">
          <IconStorage class="mr-1" />
          {{ prettyBytes(usedBrowserStorage) }}/{{
            prettyBytes(freeBrowserStorage)
          }}
        </button>
      </div>
    </header>

    <main v-if="account" class="p-3">
      <input v-model="title" class="rounded-b-none" />
      <button @click="createProposal" class="rounded-t-none">
        create proposal
      </button>

      <div class="mt-5">
        <div class="border rounded-xl p-3">
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
            <div class="text-gray-400">{{ accountShort }}</div>
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
                class="w-[25%] bg-blue-400 absolute h-full"
                :class="{ 'w-[50%]': i }"
              ></div>
              <div class="text-right px-3 py-1">
                <strong>{{ option }}</strong> 100%
              </div>
            </div>
          </div>
          <div class="mt-3">
            <button
              @click="openFinalizeModal"
              class="secondary flex justify-between"
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
          </div>
        </div>
      </div>
    </main>
  </div>

  <TransitionRoot appear :show="isFollowedModalOpen" as="template">
    <Dialog as="div" @close="closeFollowedModal" class="relative z-10">
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
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Payment successful
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeFollowedModal"
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot appear :show="isFinalizeModalOpen" as="template">
    <Dialog as="div" @close="closeFinalizeModal" class="relative z-10">
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
                <IconShield class="text-fuchsia-700 w-10 h-10" />
                Finalize proposal
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Finalizing a proposal means making it immutable, so that
                  dependent actions can be initiated, like transferring funds.
                  Since there is no central authority supervising the vote, a
                  strong ruleset, that everyone can verify, is required.<br />
                  <br />
                  Anyone is allowed to finalize a proposal and it is technically
                  possible to manipulate the result. Therefore
                  <strong>anyone</strong> can challenge a proposed result,
                  within a set period, by also placing a bond.
                  <strong>
                    Challenged results go into a dispute period and the winner
                    takes their bond back, plus the loser's bond.<br />
                  </strong>
                  <br />
                  The advantage is, that it is almost impossible to manipulate
                  or cencor results and even the creator of a proposal can't
                  stop its execution.
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeFinalizeModal"
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
