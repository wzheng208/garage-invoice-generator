import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type SendInvoiceEmailParams = {
  to: string;
  subject: string;
  filename: string;
  pdfBytes: Uint8Array;
  listingTitle?: string;
};

export async function sendInvoiceEmail({
  to,
  subject,
  filename,
  pdfBytes,
  listingTitle,
}: SendInvoiceEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY.');
  }

  if (!process.env.RESEND_FROM_EMAIL) {
    throw new Error('Missing RESEND_FROM_EMAIL.');
  }

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: [to],
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #171a20;">
        <h2 style="margin: 0 0 12px;">Garage Invoice</h2>
        <p style="margin: 0 0 8px;">
          Attached is the invoice PDF for ${
            listingTitle ?? 'the requested vehicle listing'
          }.
        </p>
        <p style="margin: 0; color: #606775;">
          This invoice was generated from the current Garage listing data.
        </p>
      </div>
    `,
    text: `Attached is the invoice PDF for ${
      listingTitle ?? 'the requested vehicle listing'
    }.`,
    attachments: [
      {
        filename,
        content: Buffer.from(pdfBytes),
      },
    ],
  });

  if (error) {
    throw new Error(error.message || 'Failed to send invoice email.');
  }

  return data;
}
