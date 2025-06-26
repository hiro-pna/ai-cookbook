import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import {useEffect} from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <div className={styles.badge}>
            ✨ AI-Powered Development
          </div>
          <Heading as="h1" className={styles.heroTitle}>
            AI Cookbook for
            <span className={styles.gradient}> FPT IS Developers</span>
          </Heading>
          <p className={styles.heroSubtitle}>
            Hướng dẫn thực tiễn để khai thác sức mạnh của AI trong phát triển phần mềm.
          </p>
          <div className={styles.heroActions}>
            <Link
              className={clsx('button', 'button--primary', 'button--lg', styles.primaryBtn)}
              to="/intro">
              <span>🚀 Sờ tạt thôi</span>
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.floatingCard}>
            <div className={styles.codeSnippet}>
              <div className={styles.codeHeader}>
                <div className={styles.dots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>AI Assistant</span>
              </div>
              <div className={styles.codeBody}>
                <div className={styles.codeLine}>
                  <span className={styles.prompt}>@cursor</span> Tạo React component
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.ai}>🤖</span> Đang tạo component...
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.success}>✅</span> Hoàn thành!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatsSection() {
  return (
    <section className={styles.stats}>
      <div className="container">
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>5+</div>
            <div className={styles.statLabel}>Chương hướng dẫn</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Thực tiễn</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Cập nhật</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>∞</div>
            <div className={styles.statLabel}>Ứng dụng</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  useEffect(() => {
    document.body.setAttribute('data-page', 'homepage');
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, []);
  
  return (
    <div className="homepage-gradient">
      <Layout
        title={`${siteConfig.title} - AI Cookbook for Developers`}
        description="Hướng dẫn thực tiễn về cách sử dụng AI để nâng cao hiệu quả trong phát triển phần mềm">
        <HomepageHeader />
        {/* <StatsSection /> */}
        {/* <main>
          <HomepageFeatures />
        </main> */}
      </Layout>
    </div>
  );
}
