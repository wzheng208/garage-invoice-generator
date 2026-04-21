import { NextRequest } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { buildInvoiceDocument } from '@/components/pdf/invoice-document';
import { extractListingId } from '@/lib/extract-listing-id';
import { fetchListing } from '@/lib/fetch-listing';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const inputUrl = body?.url as string | undefined;

    if (!inputUrl) {
      return Response.json(
        { error: 'Listing URL is required.' },
        { status: 400 },
      );
    }

    const listingId = extractListingId(inputUrl);
    const listing = await fetchListing(listingId);

    const pdfDocument = buildInvoiceDocument(listing);
    const pdfBuffer = await renderToBuffer(pdfDocument);

    const pdfBytes = new Uint8Array(pdfBuffer);

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${listingId}.pdf"`,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to generate invoice.';

    return Response.json({ error: message }, { status: 500 });
  }
}
