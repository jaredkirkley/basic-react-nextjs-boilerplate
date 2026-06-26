import styles from './page.module.css';

/**
 * Displayed automatically by Next.js while the page is streaming/loading.
 * Replace with a proper skeleton or spinner for production use.
 */
export default function Loading() {
  return (
    <main className={styles.main}>
      <p aria-live="polite">Loading…</p>
    </main>
  );
}
