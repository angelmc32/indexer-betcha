import { ponder } from "@/generated";

ponder.on("BetchaRound/v1/Wagered:Wagered", async ({ event, context }) => {
  const { WageredEvent } = context.entities;

  await WageredEvent.create({
    id: `${event.transaction.hash}-${event.log.logIndex}`,
    data: {
      gambler: event.params.gambler,
      tokenAddress: event.params.tokenAddress,
      amount: event.params.amount,
    },
  });
});
