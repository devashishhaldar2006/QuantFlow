import { verifyWebhook } from "@clerk/backend/webhooks";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const event = await verifyWebhook(request, {
      signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
    });

    switch (event.type) {
      case "user.created": {
        const email = event.data.email_addresses?.find(
          (email) =>
            email.id === event.data.primary_email_address_id,
        )?.email_address;

        if (!email) {
          console.error(
            "Clerk user.created event has no primary email:",
            event.data.id,
          );

          return Response.json(
            { error: "User has no primary email address" },
            { status: 400 },
          );
        }

        const name =
          [event.data.first_name, event.data.last_name]
            .filter(Boolean)
            .join(" ") || null;

        await prisma.user.upsert({
          where: {
            clerkId: event.data.id,
          },

          update: {
            email,
            name,
          },

          create: {
            clerkId: event.data.id,
            email,
            name,
            plan: "FREE",
          },
        });

        console.log(
          `QuantFlow user created: ${event.data.id}`,
        );

        break;
      }

      case "user.updated": {
        const email = event.data.email_addresses?.find(
          (email) =>
            email.id === event.data.primary_email_address_id,
        )?.email_address;

        const name =
          [event.data.first_name, event.data.last_name]
            .filter(Boolean)
            .join(" ") || null;

        if (!email) {
          console.error(
            "Clerk user.updated event has no primary email:",
            event.data.id,
          );

          return Response.json(
            { error: "User has no primary email address" },
            { status: 400 },
          );
        }

        await prisma.user.updateMany({
          where: {
            clerkId: event.data.id,
          },

          data: {
            email,
            name,
          },
        });

        break;
      }

      case "user.deleted": {
        await prisma.user.deleteMany({
          where: {
            clerkId: event.data.id,
          },
        });

        break;
      }

      default:
        break;
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Clerk webhook failed:", error);

    return Response.json(
      {
        error: "Webhook verification or processing failed",
      },
      {
        status: 400,
      },
    );
  }
}