export async function erc20balance(
  address: string,
  tokenAddress: string,
  blockNumber: number
): Promise<number> {
  // const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  // const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
  // const balance = await contract.balanceOf(address, blockNumber);
  // return balance.toNumber();
}