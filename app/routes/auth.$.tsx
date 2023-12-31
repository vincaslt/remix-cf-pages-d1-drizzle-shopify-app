import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { initShopify } from "../shopify.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  await initShopify(context).authenticate.admin(request);

  return null;
};
