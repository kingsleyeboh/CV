export async function downloadPdf(path: string, filename: string): Promise<boolean> {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const url = `${normalizedBase}${cleanPath}`;

  const response = await fetch(url, {
    credentials: 'same-origin',
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch PDF (${response.status})`);
  }

  const buffer = await response.arrayBuffer();
  const header = new TextDecoder().decode(buffer.slice(0, 4));
  if (header !== '%PDF') {
    throw new Error('Downloaded file is not a valid PDF document');
  }

  const blob = new Blob([buffer], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 15000);

  return true;
}
