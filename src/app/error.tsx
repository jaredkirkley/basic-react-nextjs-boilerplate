'use client';

import { useEffect } from 'react';
import styles from './page.module.css';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Rendered by Next.js when an unhandled error is thrown inside a route segment.
 * `reset` re-renders the segment — useful for transient errors (e.g. network blips).
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to your error-reporting service here (e.g. Sentry, Datadog).
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className={styles.main}>
      <div style={{ textAlign: 'center' }}>
        <h2>Something went wrong</h2>
        <button type="button" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
