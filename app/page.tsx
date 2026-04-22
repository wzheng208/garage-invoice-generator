'use client';

import { FormEvent, useState } from 'react';
import { FileText, Link as LinkIcon, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function requestInvoice(action: 'download' | 'email') {
    const trimmedUrl = url.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUrl) {
      setError('Please paste a Garage listing URL.');
      return;
    }

    if (action === 'email' && !trimmedEmail) {
      setError('Please enter a recipient email.');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/generate-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: trimmedUrl,
          action,
          email: action === 'email' ? trimmedEmail : undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to process invoice.');
      }

      // DOWNLOAD FLOW
      if (action === 'download') {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'garage-invoice.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(downloadUrl);
        return;
      }

      // EMAIL FLOW
      const data = await response.json();
      setSuccess(data.message || 'Invoice emailed successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void requestInvoice('download');
  }

  return (
    <main className='min-h-screen bg-[#f5f5f5] px-6 py-10'>
      <div className='mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center'>
        <div className='w-full max-w-[520px]'>
          <div className='mb-6 flex items-center gap-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm'>
              <FileText className='h-4 w-4' />
            </div>

            <span className='text-[22px] font-medium tracking-[-0.02em] text-[#5b616b]'>
              Garage
            </span>
          </div>

          <Card>
            <h1 className='text-[24px] font-semibold tracking-[-0.03em] text-[#171a20]'>
              Fire Truck Invoice Generator
            </h1>

            <p className='mt-3 text-[18px] leading-7 text-[#606775]'>
              Paste a Garage listing URL to generate a PDF invoice or email it.
            </p>

            <form
              onSubmit={handleSubmit}
              className='mt-8 space-y-4'
            >
              {/* URL INPUT */}
              <div className='flex h-12 items-center gap-3 rounded-lg border border-[#d8dbe1] bg-white px-4'>
                <LinkIcon className='h-[18px] w-[18px] shrink-0 text-[#6b7280]' />
                <Input
                  type='url'
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder='https://www.shopgarage.com/listing/...'
                  className='h-auto border-0 bg-transparent px-0 py-0 text-base shadow-none focus-visible:ring-0'
                />
              </div>

              {/* EMAIL INPUT */}
              <div className='flex h-12 items-center gap-3 rounded-lg border border-[#d8dbe1] bg-white px-4'>
                <Mail className='h-[18px] w-[18px] shrink-0 text-[#6b7280]' />
                <Input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='recipient@example.com'
                  className='h-auto border-0 bg-transparent px-0 py-0 text-base shadow-none focus-visible:ring-0'
                />
              </div>

              {/* BUTTONS */}
              <div className='space-y-3'>
                <Button
                  type='submit'
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Generate PDF Invoice'}
                </Button>

                <Button
                  type='button'
                  variant='secondary'
                  disabled={loading}
                  onClick={() => void requestInvoice('email')}
                >
                  {loading ? 'Processing...' : 'Email Invoice'}
                </Button>
              </div>

              {/* ERROR */}
              {error && <p className='text-sm text-red-600'>{error}</p>}

              {/* SUCCESS */}
              {success && <p className='text-sm text-green-600'>{success}</p>}
            </form>
          </Card>
        </div>
      </div>
    </main>
  );
}
