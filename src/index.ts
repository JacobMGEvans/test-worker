var Durabilities = class {
  constructor(state, env) {
    this.state = state;
  }
  async fetch(request) {
    let url = new URL(request.url);
    let value = (await this.state.storage.get("value")) || 0;
    switch (url.pathname) {
      case "/increment":
        ++value;
        break;
      case "/decrement":
        --value;
        break;
      case "/":
        break;
      default:
        return new Response("Not found", { status: 404 });
    }
    await this.state.storage.put("value", value);
    return new Response(value);
  }
};
var Durability = class {};
var src_default = {
  async fetch({ headers, cf, method, url }, env, ctx) {
    try {
      console.log({
        SOMETHING: env.SOMETHING,
        CF_SECRET: env.ANOTHER,
        method,
        url,
        headers: Object.fromEntries(headers.entries()),
        cf,
        string: "HELLO WORLD!!",
      });
      return new Response(
        `${JSON.stringify(
          {
            SOMETHING: env.SOMETHING,
            CF_SECRET: env.ABC,
            method,
            url,
            headers: Object.fromEntries(headers.entries()),
            cf,
          },
          null,
          2
        )}`
      );
    } catch (err) {
      console.log({
        err,
        method,
        url,
        headers: Object.fromEntries(headers.entries()),
        cf,
      });
    }
    return new Response(
      `${JSON.stringify(
        {
          method,
          url,
          headers: Object.fromEntries(headers.entries()),
          cf,
        },
        null,
        2
      )}`
    );
  },
};
export { Durability, Durabilities, src_default as default };
