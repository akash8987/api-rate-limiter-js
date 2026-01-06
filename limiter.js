class RateLimiter {
    constructor(limit, windowMs) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.clients = new Map();
    }

    allow(clientId) {
        const now = Date.now();

        if (!this.clients.has(clientId)) {
            this.clients.set(clientId, { count: 1, start: now });
            return true;
        }

        const data = this.clients.get(clientId);

        if (now - data.start > this.windowMs) {
            this.clients.set(clientId, { count: 1, start: now });
            return true;
        }

        if (data.count < this.limit) {
            data.count++;
            return true;
        }

        return false;
    }
}

const limiter = new RateLimiter(5, 60000);
limiter.allow("client-1");
