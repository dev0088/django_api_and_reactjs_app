import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { MuiThemeProvider, } from '@material-ui/core/styles';
import { MuiThemeProvider as V0MuiThemeProvider} from 'material-ui';
import { theme, themeV0 } from 'styles';

const TemplateNothing = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <V0MuiThemeProvider muiTheme={themeV0}>
      <Container>
        <Row>
          <Col sm="12">
            {children}
          </Col>
        </Row>
      </Container>
    </V0MuiThemeProvider>
  </MuiThemeProvider>
);

TemplateNothing.propTypes = { children: PropTypes.element.isRequired };

export default TemplateNothing;
