import Redis from "ioredis";

declare global {
  // eslint-disable-next-line no-var
  var _redis: Redis | undefined;
}

function createRedis(): Redis {
  const url = process.env.REDIS_URL;
  if (!url) throw new Error("REDIS_URL environment variable is not set");
  // Parse the URL with the WHATWG URL API to avoid DeprecationWarning from url.parse
  const parsed = new URL(url);
  const opts: Record<string, any> = { maxRetriesPerRequest: 3 };
  opts.host = parsed.hostname;
  if (parsed.port) opts.port = Number(parsed.port);
  if (parsed.username) opts.username = parsed.username || undefined;
  if (parsed.password) opts.password = parsed.password ? decodeURIComponent(parsed.password) : undefined;
  if (parsed.protocol === "rediss:") opts.tls = {};
  // Redis DB index can be provided as pathname: /0
  if (parsed.pathname && parsed.pathname !== "/") {
    const dbIndex = parseInt(parsed.pathname.slice(1), 10);
    if (!Number.isNaN(dbIndex)) opts.db = dbIndex;
  }

  return new Redis(opts);
}

// Lazy-initialize the Redis client to avoid throwing at module import time
let _instance: Redis | undefined = (globalThis as any)._redis;
function getRedis(): Redis {
  if (!_instance) {
    const url = process.env.REDIS_URL;
    if (!url) throw new Error("REDIS_URL environment variable is not set");
    _instance = createRedis();
    if (process.env.NODE_ENV !== "production") (globalThis as any)._redis = _instance;
  }
  return _instance;
}

// Export a proxy that forwards calls to the real client when first used.
const handler: ProxyHandler<any> = {
  get(_, prop) {
    const inst = getRedis();
    const v = (inst as any)[prop];
    if (typeof v === "function") return v.bind(inst);
    return v;
  },
  apply(_, __, args) {
    const inst = getRedis();
    return (inst as any).apply(undefined, args);
  },
};

const redisProxy = new Proxy({}, handler) as unknown as Redis;

export default redisProxy;
