import { ethers } from "ethers";
import { computed, ref } from "vue";

export function useWeb3() {
  const provider = ref<ethers.providers.Web3Provider | null>(null);
  const accounts = ref<string[]>([]);
  const account = computed(() => accounts.value[0]);
  const accountShort = computed(
    () => account.value.slice(0, 6) + "..." + account.value.slice(-4)
  );
  const signer = ref<ethers.providers.JsonRpcSigner | null>(null);

  async function connect() {
    provider.value = new ethers.providers.Web3Provider(window.ethereum);

    accounts.value = await provider.value.send("eth_requestAccounts", []);

    signer.value = provider.value.getSigner();
  }

  async function disconnect() {
    provider.value = null;
    accounts.value = [];
    signer.value = null;
  }

  return { provider, account, accountShort, signer, connect, disconnect };
}
