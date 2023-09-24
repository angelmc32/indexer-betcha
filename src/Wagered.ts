import { ponder } from "@/generated";
import { createPublicClient, getContract, http } from "viem";
import { base } from "viem/chains";
import BetchaRoundABI from "./ABI/BetchaRoundABI";

const client = createPublicClient({
  chain: base,
  transport: http(),
});

ponder.on("BetchaRound/v1/Wagered:Wagered", async ({ event, context }) => {
  const { WageredEvent } = context.entities;
  const emitterAddress = event.log.address;

  const contract = getContract({
    address: emitterAddress,
    abi: BetchaRoundABI,
    publicClient: client,
  });

  const metadataURI = await contract.read.metadataURI();
  const settlementAvailableAt = await contract.read.settlementAvailableAt();

  await WageredEvent.create({
    id: `${event.transaction.hash}-${event.log.logIndex}`,
    data: {
      gambler: event.params.gambler,
      tokenAddress: event.params.tokenAddress,
      amount: event.params.amount,
      contractAddress: event.log.address,
      metadataURI: metadataURI,
      settlementAvailableAt: settlementAvailableAt,
    },
  });
});
