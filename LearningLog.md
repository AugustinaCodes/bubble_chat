# Using Bun and Hono

We use Hono as an API framework.

`/api/health` is a health checkpoint. They're common to use because they provide a simple way to verify that a service is responding.

```Javascript
export default {
    port: 3000,
    fetch: app.fetch
}
```

This part is Bun-specific. Bun can serve an object containing a port and a fetch handler. Hono's `app.fetch` handles incoming HTTP requests and matches them to our routes.

So we kind of telling Bun, run this application on port 3000 and let Hono handle incoming requests.

To start the backend, run:

```
bun run index.ts
```

If the code is changed and want to restart Bun again, then run:

```
bun --watch run index.ts
```
