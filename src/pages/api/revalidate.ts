import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret');

    if (secret !== import.meta.env.SANITY_REVALIDATE_SECRET) {
      return new Response(JSON.stringify({ message: 'Invalid secret' }), {
        status: 401,
      });
    }

    // Since Astro is Hybrid, you can manage cache headers or trigger rebuilds here.
    // For Vercel, you can also trigger a Deploy Hook.
    
    return new Response(JSON.stringify({ 
      revalidated: true, 
      message: 'Astro revalidation signal received' 
    }), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: 'Error', error: err.message }), {
      status: 500,
    });
  }
}
