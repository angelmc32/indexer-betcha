import { ponder } from "@/generated";

ponder.on(
  "BetchaRound/v1/Wagered:MessagePosted",
  async ({ event, context }) => {
    const { MessagePostedEvent } = context.entities;

    await MessagePostedEvent.create({
      id: `${event.transaction.hash}-${event.log.logIndex}`,
      data: {
        author: event.params.author,
        content: event.params.content,
      },
    });
  }
);
