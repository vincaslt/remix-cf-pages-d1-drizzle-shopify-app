				import worker, * as OTHER_EXPORTS from "/home/vincaslt/remix-cf-demo-app/.wrangler/tmp/pages-RhDvO4/functionsWorker-0.5877639898882643.mjs";
				import * as __MIDDLEWARE_0__ from "/home/vincaslt/remix-cf-demo-app/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "/home/vincaslt/remix-cf-demo-app/.wrangler/tmp/pages-RhDvO4/functionsWorker-0.5877639898882643.mjs";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;