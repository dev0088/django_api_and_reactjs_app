import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import { fade } from '@material-ui/core/styles/colorManipulator';

const drawerWidth = 240;


export const adminStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.primary.main,
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
    backgroundColor: theme.palette.primary.main,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIconContainer: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    cursor: 'pointer'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  avatarImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  avatarMenuItemText: {
    color: theme.palette.white.main,
    fontSize: '1rem',
    fontWeight: 400,
    paddingLeft: '7px'
  },
  drawerBandImage: {
    paddingTop: '0.3rem',
    width: '100px',
    textAlign: 'left',
    marginLeft: '10px',
    marginRight: 'auto'
  },
  drawerBandText: {
    textAlign: 'left',
    marginLeft: '10px',
    marginRight: 'auto',
    fontSize: '1.35rem',
    fontWeight: 900,
    color: theme.palette.white.light
  },
  drawerBackground: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: '1',
    display: 'block',
    position: 'absolute',
    backgroundSize: 'cover',
    backgroundImage: 'url(/static/media/sidebar-2.310509c9.jpg)',
    backgroundPosition: 'center center',
    '&:after': {
      width: '100%',
      height: '100%',
      zIndex: '3',
      content: "",
      display: 'block',
      opacity: '.8',
      position: 'absolute',
      background: '#000'
    }
  },
  drawerListIcon: {
    color: theme.palette.white.light
  },
  drawerListText: {
    color: theme.palette.white.light
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  footerLayout: {
    backgroundColor: '#007bff',
    bottom: 0,
    width: '100%',
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 16
  },
  footerBackground: {
    width: '100%',
    borderRadius: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  footerMenuItemText: {
    color: theme.palette.white.main,
    fontWeight: 'bold',
    textTransform: 'none',
    display: 'inline-block'
  },
  footerItemSeparator: {
    color: theme.palette.white.main,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    textTransform: 'none',
    display: 'inline-block'
  },
  footerDescriptionText: {
    color: '#212529',
    textTransform: 'none',
    paddingBottom: '10px'
  },
});

export const themeAdmin = createMuiTheme ({
  palette: {
    primary: {
      main: '#212121',
      light: '#424242'
    },
    secondary: {
      main: '#28a745'//'#C00'
    },
    green: {
      main: '#28a745'
    },
    teal: {
      main: '#20c997'
    },
    white: {
      main: '#FFFFFF',
      light: '#f8f9fa',
      dark: grey[300],
      thin: '#d6d7d8',
      contrastText: '#fff'
    },
    black: {
      main: grey[900],
      dark: '#343a40',
      thin: grey[700],
      light: grey[600],
    },
    grey: {
      main: grey[900],
      dark: '#343a40',
      light: grey[400],
      thin: grey[200],
    },
    darkGrey: {
      main: grey[800]
    },
    lightGrey: {
      main: grey[400]
    },
    red: {
      main: '#C00',
      thin: red[400],
      light: red[400],
      dark: red[900]
    },
    blue: {
      main: blue[700],
      light: blue[400],
      dark: blue[900]
    }
  },
  typography: {
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    textTransform: "none",
    useNextVariants: true
  },
  button: {
    primaryColor: '#FFFFFF',
    primaryFontSize: '1.5rem'
  },
  MuiListItemText: {
    primary: {
      color: '#f8f9fa'
    }
  }
});
