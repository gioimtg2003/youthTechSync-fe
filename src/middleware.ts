import { rootDomain } from '@/lib/utils';
import { type NextRequest, NextResponse } from 'next/server';

function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;

  const forwarded =
    request.headers.get('x-original-host') ||
    request.headers.get('x-forwarded-host');
  const hostHeader = forwarded ?? (request.headers.get('host') || '');
  const hostname = hostHeader.split(':')[0];

  // Local development environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (
      hostname.includes('.localhost') ||
      hostname.includes(
        process.env.NEXT_PUBLIC_HOST_LOCAL_FORMAT || '.nguyenconggioi.local'
      )
    ) {
      return hostname.split('.')[0];
    }

    return 'teama';
  }

  // Production environment
  const rootDomainFormatted = rootDomain.split(':')[0];

  if (hostname.includes('---') && hostname.endsWith('.nguyenconggioi.local')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(request);
  console.log("🚀 ~ middleware ~ subdomain:", subdomain)

  if (subdomain) {
    // Block access to admin page from subdomains
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    // For the root path on a subdomain, rewrite to the subdomain page
    return NextResponse.rewrite(
      new URL(`/app/${subdomain}${pathname}`, request.url)
    );
  }

  // On the root domain, allow normal access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|[\\w-]+\\.\\w+).*)',
  ],
};
