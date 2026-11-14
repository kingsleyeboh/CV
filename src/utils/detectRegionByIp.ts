import { CountryPerspective } from '../types';

const COUNTRY_CODE_MAP: Record<string, CountryPerspective> = {
  AU: 'australia',
  CA: 'canada',
  GB: 'uk',
  UK: 'uk',
  LU: 'luxembourg',
  DE: 'germany',
};

export function mapCountryCodeToPerspective(code?: string | null): CountryPerspective {
  if (!code) return 'international';
  const normalized = code.trim().toUpperCase();
  return COUNTRY_CODE_MAP[normalized] ?? 'international';
}

interface GeoProvider {
  url: string;
  extractCode: (data: Record<string, unknown>) => string | null;
}

const GEO_PROVIDERS: GeoProvider[] = [
  {
    url: 'https://api.country.is/',
    extractCode: (data) => (typeof data.country === 'string' ? data.country : null),
  },
  {
    url: 'https://get.geojs.io/v1/ip/country.json',
    extractCode: (data) => (typeof data.country === 'string' ? data.country : null),
  },
  {
    url: 'https://ipwho.is/',
    extractCode: (data) =>
      data.success !== false && typeof data.country_code === 'string' ? data.country_code : null,
  },
  {
    url: 'https://ipapi.co/json/',
    extractCode: (data) => (typeof data.country_code === 'string' ? data.country_code : null),
  },
];

async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
  outerSignal?: AbortSignal
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  const onOuterAbort = () => controller.abort();
  outerSignal?.addEventListener('abort', onOuterAbort, { once: true });

  try {
    return await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeoutId);
    outerSignal?.removeEventListener('abort', onOuterAbort);
  }
}

export async function detectRegionByIp(
  signal?: AbortSignal
): Promise<CountryPerspective> {
  for (const provider of GEO_PROVIDERS) {
    if (signal?.aborted) return 'international';

    try {
      const response = await fetchWithTimeout(provider.url, 2800, signal);
      if (!response.ok) continue;

      const data = (await response.json()) as Record<string, unknown>;
      const code = provider.extractCode(data);
      if (code && /^[a-zA-Z]{2}$/.test(code.trim())) {
        return mapCountryCodeToPerspective(code);
      }
    } catch {
      if (signal?.aborted) return 'international';
      // Try next GeoIP provider if this request timed out or was blocked
    }
  }

  return 'international';
}
