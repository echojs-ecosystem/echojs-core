/**
 * Example: generated HTTP endpoints + async query/mutation definitions.
 *
 * Run:
 *   bun run generate
 *   bun run example
 */
import { QueryClient } from "@echojs-ecosystem/async";

import { createUserMutation, getUserQuery, getUsersQuery } from "../core/generated/async/users/index.ts";

async function main(): Promise<void> {
  const client = new QueryClient();

  const usersList = getUsersQuery.with(undefined, { client });
  await usersList.refetch();
  console.log("users:", usersList.data());

  const created = await createUserMutation.create({ client }).run({ name: "Ada" });
  console.log("created:", created);

  const userDetail = getUserQuery.with({ id: created.id }, { client });
  await userDetail.refetch();
  console.log("user:", userDetail.data());
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
