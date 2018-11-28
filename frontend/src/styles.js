import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

export const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
  typography: {
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    textTransform: "none",
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
    marginLeft: '5px',
    marginRight: '5px'
  },
  wizardSettingHeaderButtonsGroupGridItem: {
    display: 'inherit'
  },
  wizardSettingHeaderText: {
    color: theme.button.primaryColor,
    fontWeight: 400,
    textTransform: 'none'
  },
  wizardSettingSubTitle: {
    fontSize: '1.45rem',
    fontWeight: 600,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)'
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
    color: theme.palette.white.main,
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
    color: theme.palette.white.main
  },
  menuItemText: {
    color: theme.palette.white.main,
    fontSize: '1rem',
    fontWeight: 'bold',
    paddingTop: '3px',
    textTransform: 'none',
  },
  topbarMenuItem: {
    display: 'inline-block'
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
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },

  h4: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '2.125rem',
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
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
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  footerMenuItemText: {
    color: theme.palette.white.main,
    fontWeight: 'bold',
    textTransform: 'none',
    display: 'inline-block'
  },
  footerDescriptionText: {
    color: '#212529',
    textTransform: 'none',
    paddingBottom: '10px'
  },
  boldUnderlineText: {
    fontWeight: 600,
    textDecoration: 'underline'
  },
  backButtonClass: {
    textTransform: 'none',
  },
  nextButtonClass: {
    textTransform: 'none',
  },
  uploadProgressBar: {
    width: '200px',
    margin: 'auto',
    height: '30px'
  },
  talentFormBackButton: {
    textTransform: 'none',
    borderRadius: '0px',
    primaryColor: theme.palette.white.main,
  },
  talentProfileGuideButtonItem: {
    textAlign: 'center',
    padding: '5px',
    display: 'block!important'
  },
  talentProfileGuideButton: {
    display: 'block',
    borderRadius: '5px'
  },
  talentProfileGuideDownloadButton: {
    borderRadius: '5px'
  },
  talentProfileGuideButtonSelected: {
    display: 'block',
    borderRadius: '5px',
    color: theme.palette.white.main,
    boxShadow: 'none',
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[600]
    }
  },
  talentProfileGuideButtonTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    paddingTop: '5px',
    paddingBottom: '5px',
    textTransform: 'none',
    color: theme.palette.white.main,
  },
  talentProfileGuideButtonSubTitle: {
    fontWeight: 100,
    color: theme.palette.thinWhite.main,
    textTransform: 'none'
  },
  talentProfileVideoGreetingImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover'
  },
  talentProfileGeneralInfoNameCol: {
    fontSize: '1rem!important',
    fontWeight: '600!important',
    textAlign: 'left',
    display: 'inherit',
    margin: 'auto'
  },
  talentProfileSpecialInfoNameCol: {
    fontSize: '1rem!important',
    fontWeight: '600!important',
    textAlign: 'center',
    display: 'inherit',
    margin: 'auto'
  },
  talentProfileGeneralInfoName: {
    fontSize: '1rem!important',
    fontWeight: '600!important',
    textAlign: 'left'
  },
  talentProfileGeneralInfoValue: {
    fontSize: '1rem!important',
    fontWeight: '400!important',
    textAlign: 'left'
  },
  talentProfileBioTextValue: {
    fontSize: '1rem!important',
    fontWeight: '400!important',
    textAlign: 'left',
    display: 'contents'
  },
  talentProfileGeneralInfoValueCol: {
    marginTop: 'auto!important',
    marginBottom: 'auto!important'
  },
  talentProfileEditIcon: {
    color: theme.palette.black.main,
    fontSize: '1rem',
    marginBottom: '4px',
    marginRight: '7px',
    '&:hover': {
      color: theme.palette.thinBlack.main,
    },
  },
  talentProfileSpecialInfoEditIcon: {
    color: theme.palette.black.main,
    fontSize: '1.15rem',
    marginRight: '7px',
    marginTop: '3px',
    '&:hover': {
      color: theme.palette.thinBlack.main,
    },
  },
  talentProfileHeadlineEditIcon: {
    color: theme.palette.black.main,
    fontSize: '1.4rem',
    marginRight: '7px',
    marginTop: '10px',
    '&:hover': {
      color: theme.palette.thinBlack.main,
    },
  },
  talentProfileEditIconEmpty: {
    width: '24px'
  },
  talentProfileFileDeleteButton: {
    padding: '0px',
    minWidth: '10px',
    minHeight: '10px',
    width: '20px',
    height: '20px',
    position: 'relative',
    top: '-33px',
    left: '80px',
    fontWeight: 600,
  },
  talentProfileFileDeleteDisable: {
    color: '#FFFFFF',
    borderRadius: '2px',
    background: '#FFFFFF',
    fontWeight: 600,
    position: 'relative',
    top: '-48px',
    left: '192px'
  },
  talentProfileResumeDeleteButton: {
    padding: '0px',
    minWidth: '10px',
    minHeight: '10px',
    width: '20px',
    height: '20px',
    position: 'relative',
    top: '-25px',
    left: '170px',
    fontWeight: 600,
  },
  talentProfilePictureEmpty: {
    width: '20px',
    height: '20px',
  },
  talentProfilePictureDeleteButton: {
    padding: '0px',
    minWidth: '10px',
    minHeight: '10px',
    width: '20px',
    height: '20px',
    position: 'relative',
    top: '-25px',
    left: '90px',
    fontWeight: 600,
  },
  talentProfileViewTitleText: {
    fontSize: '2rem',
    fontWeight: 600,
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },
  talentProfileViewSubTitleText: {
    fontSize: '1.2rem',
    fontWeight: 600,
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },
  talentProfileViewHeaderTextItem: {
    fontSize: '1rem!important',
    fontWeight: '600!important',
    textAlign: 'center',
    display: 'inherit',
    margin: 'auto',

  },
  talentProfileViewHeaderText: {
    fontSize: '1.4rem',
    fontWeight: 600,
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
    textAlign: 'center',
    padding: '3px 10px 3px 10px',
    border: `3px solid ${theme.palette.black.main}`
  },
  talentProfileVideoViewModal: {
    width: '60%',
    height: '70%',
    left: '20%',
    top: '15%'
  },
  talentProfileVideoUploadingText: {
    padding: '10px',
    fontSize: '1rem',
    textAlign: 'center',
    top: '-36px',
    position: 'relative',
    fontWeight: '400'
  },
  talentProfileVideoAuditionSubTitleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '10px',
    fontSize: '1.5rem'
  },
  talentProfileVideoAuditionDescriptionText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '10px',
    fontSize: '1rem'
  },
  talentProfileVideoAuditionHelpfulHintTitle: {
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  talentProfileVideoAuditionHelpfulHintContentGrid: {
    border: '4px solid #000000',
    margin: 'auto',
    width: '250px',
    minWidth: '250px'
  },
  talentProfileVideoAuditionHelpfulHintText: {
    textAlign: 'center',
    fontSize: '0.85rem',
    fontWeight: 100,
  },
  talentProfileVideoAuditionHelpfulHintImage: {
    width: '100%',
  },
  clientFormNextButton: {
    textTransform: 'none',
    borderRadius: '0px',
    primaryColor: theme.palette.white.main,
  },
  clientTalentSearchResultPicture: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
  },
  pictureContainer: {
    display: 'inline-block',
    border: 'solid 3px',
    color: '#000000'
  },
  clientFormSubTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },
  clientFormBackButton: {
    textTransform: 'none',
    borderRadius: '0px',
    backgroundColor: '#343a40',
    primaryColor: theme.palette.white.main,
  },
  clientFormNextButtonContainerGridItem: {
    textAlign: 'right',
  },
  clientFormNextButton: {
    textTransform: 'none',
    borderRadius: '0px',
    backgroundColor: '#343a40',
    primaryColor: theme.palette.white.main,
  },
  clientFormBackButtonText: {
    color: theme.palette.white.main,
  },
  clientFormNextButtonText: {
    color: theme.palette.white.main
  },
  clientSearchResultTalentHeadlineText: {
    fontWeight: 'bold'
  },
  clientTalentViewHeaderGridItem: {
    textAlign: 'center'
  },
  clientTalentViewHeaderTitleText: {
    border: '2px solid',
    // display: 'inline',
    padding: '5px 10px 5px 10px'
  },
  clientTalentViewMoreInfoButtonGridItemWithoutFullWidth: {
    textAlign: 'center',
  },
  clientTalentViewMoreInfoButtonGridItem: {
    textAlign: 'center',
    paddingLeft: '15%!important',
    paddingRight: '15%!important'
  },
  clientTalentViewMoreInfoButton: {
    backgroundColor: theme.palette.black.main,
    display: 'block',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.thinBlack.main,
    },
  },
  clientTalentViewVideoButtonGridItem: {
    textAlign: 'center',
    padding: '5px'
  },
  clientTalentViewVideoButton: {
    backgroundColor: theme.palette.black.main,
    display: 'block',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: theme.palette.thinBlack.main
    },
  },
  clientTalentViewVideoButtonText: {
    fontSize: '1rem',
    fontWeight: 600,
    paddingTop: '5px',
    paddingBottom: '5px',
    textTransform: 'none',
    color: theme.palette.white.main
  },
  clientTalentViewVideoButtonStatusText: {
    color: theme.palette.thinWhite.main,
    textTransform: 'none',
  }
});

export const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#007bff',
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
      main: '#FFFFFF'
    },
    black: {
      main: grey[900]
    },
    thinBlack: {
      main: grey[600]
    },
    thinWhite: {
      main: '#d6d7d8'
    },
    darkGrey: {
      main: grey[800]
    },
    lightGrey: {
      main: grey[400]
    },
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
})

export const themeV0 = getMuiTheme({
  palette: {
    primary1Color: '#007bff',
    accent1Color: '#40c741',
  }
});

export default styles;