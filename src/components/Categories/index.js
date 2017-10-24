import React from 'react';
import { connect } from 'react-redux';
import selectCategories from './selectors';

const Categories = () => <div />;

const mapStateToProps = selectCategories();

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
