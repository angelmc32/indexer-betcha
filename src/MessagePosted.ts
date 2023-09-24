import { ponder } from "@/generated";

ponder.on(
  "BetchaRound/v1/MessagePosted:MessagePosted",
  async ({ event, context }) => {
    const { MessagePostedEvent } = context.entities;
    console.log("yaaaaa");

    await MessagePostedEvent.create({
      id: `${event.transaction.hash}-${event.log.logIndex}`,
      data: {
        author: event.params.author,
        content: event.params.content,
        contractAddress: event.log.address,
      },
    });
  }
);
