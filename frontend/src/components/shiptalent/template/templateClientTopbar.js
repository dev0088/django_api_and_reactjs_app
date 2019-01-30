import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import MemberScreen from '../../../containers/talent/memberScreen';
import ClientHeader from '../headers/clientHeader';
import ClientFooter from '../footer/clientFooter';
import GlobalNotification from 'containers/common/globalNotification';
import { MuiThemeProvider, } from '@material-ui/core/styles';
import { themeClient } from 'styles';

const TemplateClientTopbar = ({ children }) => (
  <MuiThemeProvider theme={themeClient}>
    <div>
      <MemberScreen Layout={ClientHeader} />
        <Container fluid>
          {children}
        </Container>
        <GlobalNotification />
      <ClientFooter />
    </div>
  </MuiThemeProvider>
);

TemplateClientTopbar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TemplateClientTopbar;
