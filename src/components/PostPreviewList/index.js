import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';
import PostPreview from 'components/PostPreview';
import HighlightedPosts from 'components/FrontPage/components/HighlightedPosts';
import HighlightedShows from 'components/FrontPage/components/HighlightedShows';

const PostPreviewList = props => {
  const posts = props.posts.toJS().map((post, index) => (
    <div
      className={classNames(styles.post, {
        [styles.postLarge]: index % 8 === 0 || index % 8 === 5 || index === 2,
      })}
      key={index}
    >
      <PostPreview {...post} />
    </div>
  ));
  posts.splice(
    2,
    0,
    <HighlightedShows
      shows={[
      {
        showTitle: "67% Sikkert",
        title: "Episode 3 - Skilpaddevoldtekt og ellers god stemning",
        imgUrl: "https://radiorevolt.no/media/uploads/images/76prosent.jpg",
        text: "Skilpadden Chilli har voldtatt skilpadden Milli. Tønsberg blad gjør sin første og siste opptreden. Edvart og Johannes får fullstendig overtenning til Sofie milde ergelse. Ellers beklager vi.",
        published: "2019-10-02 16:04:31+00:00"
      }, 
      {
        showTitle: "Blyforgiftning",
        title: 'Høstsabbat spessial 01.10.19',
        imgUrl: "https://radiorevolt.no/media/uploads/images/logo.png",
        text: "Vi spiller musikk fra dette årets Høstsabbat-festival i Oslo! Doom/sludge/stoner står på tapetet, og vi har besøk av musikkredaktør i Under Dusken, Maren Busterud!",
        published: "2019-10-01 16:04:31+00:00",
      }, 
      {
          showTitle: "FEBER",
          title: "FEBER tar deg med på Safari(o)",
          imgUrl: "https://radiorevolt.no/media/uploads/images/Feber_logo_profil.png",
          text: "Safario, aka Kacper, spiller på Knaus under UKA. Han tok med seg Arez og Gerald Ofori en tur innom studio først. På sendinga tar vi for oss de nye albumene til Arif, Danny Brown og Lil Halima og spiller ellers masse bra ny musikk!",
          published: "2019-10-02 16:04:31+00:00",
      }]}
      key={'highlightedShows'}
    />,
  );
  if (!props.highlightedPosts.isEmpty()) {
    // Insert highlighted posts after element 3
    posts.splice(
      3,
      0,
      <HighlightedPosts
        posts={props.highlightedPosts}
        key={'highlightedPosts'}
      />,
    );
  }

  return <div className={styles.postPreviewList}>{posts}</div>;
};

PostPreviewList.propTypes = {
  posts: PropTypes.instanceOf(Immutable.List).isRequired,
  highlightedPosts: PropTypes.instanceOf(Immutable.List),
};

export default PostPreviewList;
