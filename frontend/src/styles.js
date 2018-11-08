import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonIcon: {
    margin: 0,
  },
  selectedButton: {
    display: 'block!important',
    width: '100%',
    borderRadius: '13px!important',
  },
  selectedButtonTitle: {
    color: theme.button.primaryColor,
    fontSize: theme.button.primaryFontSize,
    fontWeight: 600,
    paddingTop: '0.8rem',
    paddingBottom: '0.8rem',
    lineHeight: 1.3,
    textTransform: 'none',
  },
  wizardSettingHeaderTitle: {
    whiteSpace: 'nowrap'
  },
  wizardSettingHeaderButton: {
    display: 'block!important',
    borderRadius: '4px!important',
  },
  wizardSettingHeaderText: {
    color: theme.button.primaryColor,
    fontWeight: 400,
    textTransform: 'none'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 190,
    width: '100%'
  },
  flatPrimary: {
    color: "#FFFFFF",
  },
  grow: {
    flexGrow: 1,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  groupMenuItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  },
  input: {
    display: 'none',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuitem: {
    color: '#FFFFFF'
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: '1rem',
    fontWeight: 'bold',
    paddingTop: '3px'
  },
  optionMenuItem: {
    backgroundColor: 'rgba(0, 0, 0, 0)!important',
    paddingLeft: '40px',
  },
  paper: {
    height: 140,
    width: 100,
  },
  paperContent: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  paperDescription: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  slide: {
    padding: 10,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  descriptionText: {
    color: '#2a3134',
    // color: rgba(0, 0, 0, 0.87),
    fontSize: '1rem',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },

  h4: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '2.125rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: '0.00735em',
    marginBlockStart: '1.33em',
    marginBlockEnd: '1.33em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
  },
  h5: {
    display: 'block',
    fontSize: '0.83em',
    marginBlockStart: '1.67em',
    marginBlockEnd: '1.67em',
    marginInlineEtart: '0px',
    marginInlineEnd: '0px',
    fontWeight: 'bold',
  }
});

export const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#C00'
    },
    green: {
      main: '#28a745'
    },
    teal: {
      main: '#20c997'
    },
    white: {
      main: '#FFFFFF'
    }
  },
  button: {
    primaryColor: '#FFFFFF',
    primaryFontSize: '1.5rem'
  }
})

export const themeV0 = getMuiTheme({
  palette: {
    primary1Color: '#007bff',
    accent1Color: '#40c741',
  }
});

export default styles;