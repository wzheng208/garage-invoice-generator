export async function fetchListing(listingId: string) {
  const response = await fetch(
    `https://garage-backend.onrender.com/listings/${listingId}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch listing data.');
  }

  return response.json();
}
