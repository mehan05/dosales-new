globalThis.process ??= {}; globalThis.process.env ??= {};
export { r as renderers } from '../../chunks/_@astro-renderers_DORRZ_O8.mjs';

const POST = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const secret = url.searchParams.get("secret");
    if (secret !== "https://dosales-testing.vercel.app/api/revalidate?secret=iHUDFZ6xn2O/zy6dwwHlSHt68x9Z1wQKVkHfIbdtXJs=") {
      return new Response(JSON.stringify({ message: "Invalid secret" }), {
        status: 401
      });
    }
    return new Response(JSON.stringify({
      revalidated: true,
      message: "Astro revalidation signal received"
    }), {
      status: 200
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Error", error: err.message }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
