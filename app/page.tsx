import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Script from 'next/script';

// shortcut: the UI is still the original vanilla-JS app (public/app.js) rendering into this static markup; port screens to React components when they need changing.
const markup = readFileSync(join(process.cwd(), 'app/body.html'), 'utf8');

export default function Page() {
  return (
    <>
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: markup }} />
      <Script src="/app.js" strategy="afterInteractive" />
    </>
  );
}
