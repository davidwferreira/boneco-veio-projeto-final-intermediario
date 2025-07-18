import { Link } from 'react-router-dom';
import styles from '../../../src/components/Section/Section.module.css'

const Section = ({ title='Coleções em destaque', titleAlign = 'left', link, children }) => {
  return (
    <section className={styles.homeSection}>
      
      <div className={`${
        titleAlign !== 'center' ? styles.sectionContainer : styles.titleContainerBlock
      } ${styles.titleContainerCommonPadding}`}>
        
        
        <h1 className={`${styles.sectionTitle} ${
          titleAlign === 'center' ? styles.titleCenter : styles.titleLeft
        }`}>
          {title}
        </h1>
        
        
        {link && (
          <Link
            to='/produtos'
            className={styles.viewAllLink}
          >
            Ver todos →
          </Link>
        )}
      </div> 
      
    
      <div>
        {children} 
      </div>
    </section>
  );
};

export default Section;