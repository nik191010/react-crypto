import React from 'react';
import DOMPurify from 'dompurify';
import styles from './ReadMore.module.scss';

const ReadMore = ({ name, description }) => {
  const [showMore, setShowMore] = React.useState(false);
  const refContainer = React.useRef();
  const [dimensions, setDimensions] = React.useState(0);

  // Gets the height of all paragraphs to make the text expandable
  React.useEffect(() => {
    if (refContainer.current) {
      setDimensions(refContainer.current.offsetHeight);
    }
  }, [description]);
  console.log(description?.split('').indexOf('\r') >= 0);

  // 'Split' breaks the whole text(description) into paragraphs
  // DOMPurify cleans HTML
  // To make the text expandable it's required to set max-height
  return (
    <div className={styles.about}>
      <h2 className={styles.title}>About {name}</h2>
      <div className={styles.readMore}>
        <div
          style={{ maxHeight: `${!showMore ? '210px' : dimensions + 'px'}` }}
          className={styles.expandingText}>
          <div ref={refContainer}>
            {!description ? (
              <p>No description avaiable</p>
            ) : (
              description.split('\n').map((item, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item),
                  }}></p>
              ))
            )}
          </div>
        </div>
        <span onClick={() => setShowMore(!showMore)} className={styles.showMore}>
          {!showMore ? 'Read more' : 'Show Less'}
        </span>
      </div>
    </div>
  );
};

export default ReadMore;
