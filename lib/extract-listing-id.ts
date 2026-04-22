export function extractListingId(url: string): string {

  const match = url.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
  );

  if (!match) {
    throw new Error('Please enter a valid Garage listing URL.');
  }

  return match[0];
}
