import React from 'react';
import PropTypes from 'prop-types';

import TextInput from 'components/common/input/TextInput';
import TextAreaInput from 'components/common/input/TextAreaInput';
import SubmitButton from 'components/common/button/SubmitButton';
import SelectInput from 'components/common/input/SelectInput';
import styles from './styles.css';

const EpisodeForm = props => {
  return (
    <div className={styles.episodeForm}>
      <TextInput
        label={'Tittel'}
        onChange={props.onTitleChange}
        value={props.title}
      />
      <TextAreaInput
        label={'Ingress'}
        onChange={props.onLeadChange}
        value={props.lead}
      />
      <SelectInput
        label={'Hvilket program hører episoden til?'}
        onChange={props.onShowChange}
        options={props.shows}
      />
      <SelectInput
        label={'Hva heter on-demand-episoden i Digas?'}
        onChange={props.onOnDemandEpisodeChange}
        options={props.digasOnDemandEpisodes}
      />
      <SelectInput
        label={'Hva heter podcast-episoden i Digas?'}
        onChange={props.onPodcastEpisodeChange}
        options={props.digasPodcastEpisodes}
      />

      <SubmitButton
        disabled={props.onAddButtonDisabled}
        onClick={props.onAddEpisode}
      >
        Opprett episode
      </SubmitButton>
    </div>
  );
};

EpisodeForm.propTypes = {
  onTitleChange: PropTypes.func.isRequired,
  onLeadChange: PropTypes.func.isRequired,
  onShowChange: PropTypes.func.isRequired,
  onOnDemandEpisodeChange: PropTypes.func.isRequired,
  onPodcastEpisodeChange: PropTypes.func.isRequired,

  title: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
  shows: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
  digasOnDemandEpisodes: PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
    .isRequired,
  digasPodcastEpisodes: PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
    .isRequired,
  onAddButtonDisabled: PropTypes.bool,
  onAddEpisode: PropTypes.func.isRequired,
};

export default EpisodeForm;
