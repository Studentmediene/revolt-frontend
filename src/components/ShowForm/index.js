import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import TextInput from 'components/common/input/TextInput';
import TextAreaInput from 'components/common/input/TextAreaInput';
import CheckboxInput from 'components/common/input/CheckboxInput';
import SubmitButton from 'components/common/button/SubmitButton';
import UploadFileInput from 'components/common/input/UploadFileInput';
import SelectInput from 'components/common/input/SelectInput';

const ShowForm = props => {
  const languagesOptions = [
    <option value={'no'} key={'no'}>
      Norsk
    </option>,
    <option value={'en'} key={'en'}>
      Engelsk
    </option>,
  ];

  return (
    <div className={styles.showForm}>
      <TextInput
        label={'Tittel'}
        onChange={props.onTitleChange}
        value={props.title}
      />
      <UploadFileInput label={'Programbilde'} onChange={props.onImageChange} />
      <TextAreaInput
        label={'Ingress'}
        onChange={props.onLeadChange}
        value={props.lead}
      />
      <TextAreaInput
        label={'Lang beskrivelse'}
        onChange={props.onDescriptionChange}
        value={props.description}
      />
      <SelectInput
        label={'Hva heter programmet i Digas?'}
        onChange={props.onDigasIdChange}
        options={props.digasIdOptions}
      />
      <SelectInput
        label={'Språk'}
        onChange={props.onLanguageChange}
        options={languagesOptions}
      />
      <CheckboxInput
        label={'Arkivert?'}
        onChange={props.onArchivedChange}
        value={props.archived}
      />
      <CheckboxInput
        label={'Ikke-barnevennlig innhold'}
        onChange={props.onExplicitContentChange}
        value={props.explicitContent}
      />
      <SubmitButton onClick={props.onAddShow}>
        Opprett nytt program
      </SubmitButton>
    </div>
  );
};

ShowForm.propTypes = {
  onTitleChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onLeadChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onDigasIdChange: PropTypes.func.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onArchivedChange: PropTypes.func.isRequired,
  onExplicitContentChange: PropTypes.func.isRequired,
  onAddShow: PropTypes.func.isRequired,

  title: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  digasIdOptions: PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
    .isRequired,
  archived: PropTypes.bool.isRequired,
  explicitContent: PropTypes.bool.isRequired,
};

export default ShowForm;
