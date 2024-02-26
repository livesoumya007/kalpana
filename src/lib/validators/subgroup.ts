/*

Zod is a popular TypeScript-first schema declaration and validation library for JavaScript. 
It allows you to define the structure and type of data you expect in our applications, ensuring consistency 
and data integrity. 

*/
import { z } from "zod";

export const SubGroupValidator = z.object({
  name: z.string().min(3).max(21),
});

export const SubGroupSubscriptionValidator = z.object({
  subGroupId: z.string(),
});

/*

z.infer is a convenient way to extract the type information from a Zod schema and use it for type safety 
and improved code quality in your TypeScript projects.

*/
export type CreateSubGroupPayload = z.infer<typeof SubGroupValidator>;
export type SubscribeToSubGroupPayload = z.infer<
  typeof SubGroupSubscriptionValidator
>;
