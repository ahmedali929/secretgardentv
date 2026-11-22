export function contactConfiguration(mode, endpoint, buildMode) {
  if (buildMode === 'staging' || mode === 'mock' || (!mode && buildMode === 'development')) {
    return { provider: 'mock' };
  }
  if (mode === 'formspree') {
    if (!/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(endpoint ?? '')) {
      throw new Error('Contact form requires a valid PUBLIC_CONTACT_ENDPOINT.');
    }
    return { provider: 'formspree', endpoint };
  }
  if (mode && mode !== 'off') throw new Error('Unknown PUBLIC_CONTACT_MODE.');
  return { provider: 'off' };
}

export async function submitContact(provider, endpoint, fields, request = globalThis.fetch) {
  if (provider === 'mock') {
    await new Promise((resolve) => globalThis.setTimeout(resolve, 450));
    return { status: 'mock' };
  }
  if (provider !== 'formspree') return { status: 'unavailable' };

  try {
    const response = await request(endpoint, {
      method: 'POST',
      body: fields,
      headers: { Accept: 'application/json' },
      signal: globalThis.AbortSignal.timeout(15000),
      redirect: 'error',
    });
    if (response.status === 429) return { status: 'rate-limit' };

    const result = await response.json();
    if (response.ok && result?.ok === true) return { status: 'accepted' };
    const rejectedFields = Array.isArray(result?.errors)
      ? result.errors.map((error) => error?.field).filter((field) => typeof field === 'string')
      : [];
    return { status: 'rejected', rejectedFields };
  } catch {
    return { status: 'unavailable' };
  }
}
