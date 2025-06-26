import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Tích hợp AI với Editor',
    icon: '⚡',
    description: (
      <>
        Học cách biến Cursor và các editor khác thành trợ lý thông minh, 
        giúp viết code nhanh hơn và chất lượng hơn với sức mạnh của AI.
      </>
    ),
  },
  {
    title: 'Quy trình Pair-Programming',
    icon: '🤝',
    description: (
      <>
        Khám phá nghệ thuật làm việc cùng AI một cách hiệu quả, 
        từ prompt engineering đến workflow tối ưu cho developers.
      </>
    ),
  },
  {
    title: 'Quản lý Tri thức Thông minh',
    icon: '🧠',
    description: (
      <>
        Sử dụng AI để tự động hóa tài liệu, tổ chức kiến thức và 
        xây dựng hệ thống quản lý thông tin cho dự án.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          <span className={styles.iconEmoji}>{icon}</span>
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
