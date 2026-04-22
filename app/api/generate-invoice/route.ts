import { NextRequest } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';

import { buildInvoiceDocument } from '@/components/pdf/invoice-document';
import { extractListingId } from '@/lib/extract-listing-id';
import { fetchListing } from '@/lib/fetch-listing';
import { sendInvoiceEmail } from '@/lib/send-invoice-email';

function buildFilename(listingTitle: string, listingId: string) {
  const safeTitle = listingTitle
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `invoice-${safeTitle || listingId}.pdf`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const inputUrl = body?.url as string | undefined;
    const action = body?.action as 'download' | 'email' | undefined;
    const email = body?.email as string | undefined;

    if (!inputUrl) {
      return Response.json(
        { error: 'Listing URL is required.' },
        { status: 400 },
      );
    }

    if (!action) {
      return Response.json({ error: 'Action is required.' }, { status: 400 });
    }

    if (action === 'email' && !email) {
      return Response.json(
        { error: 'Recipient email is required.' },
        { status: 400 },
      );
    }

    const listingId = extractListingId(inputUrl);
    const listing = await fetchListing(listingId);
    const listingTitle =
      listing.listingTitle ?? 'the requested vehicle listing';

    const pdfDocument = buildInvoiceDocument(listing);
    const pdfBuffer = await renderToBuffer(pdfDocument);
    const pdfBytes = new Uint8Array(pdfBuffer);

    const filename = buildFilename(listingTitle, listingId);

    if (action === 'email') {
      await sendInvoiceEmail({
        to: email!,
        subject: `Garage Invoice - ${listingTitle}`,
        filename,
        pdfBytes,
        listingTitle,
      });

      return Response.json({
        success: true,
        message: 'Invoice emailed successfully.',
      });
    }

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to process invoice.';

    return Response.json({ error: message }, { status: 500 });
  }
}
