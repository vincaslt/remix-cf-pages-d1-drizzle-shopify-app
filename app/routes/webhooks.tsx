import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { initShopify } from "../shopify.server";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const shopify = initShopify(context);
  const { topic, session, admin } = await shopify.authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await shopify.sessionStorage.deleteSession(session.id);
      }

      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
