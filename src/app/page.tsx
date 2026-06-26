import HelloBanner from '@/components/HelloBanner';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <HelloBanner />
    </main>
  );
}
