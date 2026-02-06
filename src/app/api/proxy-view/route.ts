import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('URL param is required', { status: 400 });
  }

  try {
    // 1. Fetch the content server-side
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      next: { revalidate: 3600 } // Cache for 1 hour to improve speed
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch source: ${response.statusText}`, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'text/html';
    let html = await response.text();

    // 2. Inject <base> tag to fix relative assets (images, css, scripts)
    // We use response.url to handle redirects (e.g. affiliate links -> final landing page)
    const finalUrl = response.url;
    const baseTag = `<base href="${finalUrl}" />`;
    html = html.replace('<head>', `<head>${baseTag}`);

    // Optional: Remove X-Frame-Options meta tags if they exist in the HTML (rare, usually they are headers)
    
    // 3. Return the HTML with correct headers
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Ensure we don't pass along the blocking security headers
        'X-Frame-Options': 'ALLOWALL', 
        'Content-Security-Policy': "frame-ancestors 'self' *",
      },
    });

  } catch (error) {
    console.error('Proxy Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
