import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubGroupValidator } from "@/lib/validators/subgroup";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorised", { status: 401 });
    }

    const body = await req.json();
    // here if name won't be there or something else is there then it will throw error
    const { name } = SubGroupValidator.parse(body);

    const subgroupExists = await db.subGroup.findFirst({
      where: {
        name,
      },
    });
    if (subgroupExists) {
      return new Response("Subgroup name already exists ", { status: 409 });
    }

    const subGroup = await db.subGroup.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    // The creator must be a subscriber of the subGroup
    await db.subscription.create({
      data: {
        subGroupId: subGroup.id,
        userId: session.user.id,
      },
    });

    return new Response(subGroup.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create subgroup !!", { status: 500 });
  }
}
