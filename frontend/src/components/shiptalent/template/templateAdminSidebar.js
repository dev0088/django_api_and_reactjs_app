import React from 'react';
import PropTypes from 'prop-types';
import AdminScreen from '../../../containers/admin/adminScreen';
import AdminHeader from '../headers/adminHeader';
import AdminFooter from '../footer/adminFooter';
import { MuiThemeProvider, } from '@material-ui/core/styles';
import { themeAdmin } from 'styles';

const TemplateAdminSidebar = ({ children }) => (
  <MuiThemeProvider theme={themeAdmin}>
    <div>
      <AdminScreen Layout={AdminHeader} children={children} />
      {/*<AdminFooter />*/}
    </div>
  </MuiThemeProvider>
);

TemplateAdminSidebar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TemplateAdminSidebar;
