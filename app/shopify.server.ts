import type { AppLoadContext } from "@remix-run/cloudflare";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
import {
  AppDistribution,
  DeliveryMethod,
  LATEST_API_VERSION,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { KVSessionStorage } from "@shopify/shopify-app-session-storage-kv";

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    env: {
      SHOPIFY_API_KEY: string;
      SHOPIFY_API_SECRET: string;
      SHOPIFY_APP_URL: string;
      SCOPES: string;
      SHOP_CUSTOM_DOMAIN: string;
      SESSION: KVNamespace;
      DB: D1Database;
    };
  }
}

export const initShopify = (context: AppLoadContext) => {
  const shopify = shopifyApp({
    apiKey: context.env.SHOPIFY_API_KEY,
    apiSecretKey: context.env.SHOPIFY_API_SECRET || "",
    apiVersion: LATEST_API_VERSION,
    scopes: context.env.SCOPES?.split(","),
    appUrl: context.env.SHOPIFY_APP_URL || "",
    authPathPrefix: "/auth",
    sessionStorage: new KVSessionStorage(context.env.SESSION),
    distribution: AppDistribution.AppStore,
    restResources,
    webhooks: {
      APP_UNINSTALLED: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/webhooks",
      },
    },
    hooks: {
      afterAuth: async ({ session }) => {
        shopify.registerWebhooks({ session });
      },
    },
    future: {
      v3_webhookAdminContext: true,
      v3_authenticatePublic: true,
    },
    ...(context.env.SHOP_CUSTOM_DOMAIN
      ? { customShopDomains: [context.env.SHOP_CUSTOM_DOMAIN] }
      : {}),
  });

  return shopify;
};
