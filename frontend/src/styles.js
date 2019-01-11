import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import { fade } from '@material-ui/core/styles/colorManipulator';

const drawerWidth = 240;

export const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    height: 140,
    width: 100,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  typography: {
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    textTransform: "none",
  },
  buttonIcon: {
    margin: 0,
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
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    display: 'inline-block',
    whiteSpace: 'nowrap',
    marginRight: '18px',
  },
  drawerMenuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerBandImage: {
    paddingTop: '0.3rem',
    width: '100px',
    textAlign: 'left',
    marginLeft: '10px',
    marginRight: 'auto'
  },
  topbarMenuItemTitle: {
    paddingLeft: '8px',
    paddingRight: '8px',
    '&:hover': {
      color: theme.palette.grey.light,
    },
  },
  topbarDynamicShow: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
  searchTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  descriptionUl: {
    paddingInlineStart: '15px',
  },
  olParentheses: {
    counterReset: 'list',
    paddingInlineStart: '0px',
    '& > li': {
      listStyle: 'none',
      '&:before': {
        textAlign: 'center',
        content: `counter(list) ") "`,
        counterIncrement: 'list',
        paddingRight: '0.5rem'
      }
    },
  },
  financeTable: {
    border: `2px solid ${theme.palette.black.main}`,
    padding: `10px!important`
  },
  financeTableTitle: {
    color: theme.palette.black.main,
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: '1.46429em',
  },
  financeTableContentText: {
    color: theme.palette.black.main,
    fontSize: '0.85rem',
    fontWeight: 100,
    lineHeight: '0.8em',
  },
  financeIconGridItem: {
    textAlign: 'right',
    paddingRight: '0px!important',
    verticalAlign: 'top',
    paddingTop: '10px!important',
    marginBottom: 'auto'
  },
  financeIcon: {
    fontSize: '2rem',
    fontWeight: '700',
    paddingRight: '0px',
    textAlign: 'right',
    verticalAlign: 'top',
    marginTop: '0px',
    marginBottom: 'auto',
    color: theme.palette.black.main
  },
  auditionTableTitle: {
    color: theme.palette.black.main,
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: '1.46429em',
  },
  auditionTableContentText: {
    color: theme.palette.black.main,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1em',
  },
  descriptionText: {
    color: '#2a3134',
    fontSize: '1rem',
    fontWeight: 400,
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },
  descriptionStrongRed: {
    color: theme.palette.red.main,
    display: 'inline',
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },
  descriptionItalicRed: {
    color: theme.palette.red.main,
    display: 'inline',
    fontSize: '1rem',
    fontWeight: 600,
    fontStyle: 'italic',
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },
  h4NoMargin: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '2.125rem',
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: '0.00735em',
    marginBlockStart: '0em',
    marginBlockEnd: '0em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
  },
  h4SmallMargin: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '2.125rem',
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: '0.00735em',
    marginBlockStart: '0.5em',
    marginBlockEnd: '0.5em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
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
  underlineText: {
    textDecoration: 'underline',
    display: 'inline',
    fontSize: '1rem'
  },
  boldText: {
    fontWeight: 600,
    display: 'inline',
    fontSize: '1rem',
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },
  boldUnderlineText: {
    fontWeight: 600,
    textDecoration: 'underline',
    display: 'inline',
    fontSize: '1rem',
    lineHeight: '1.46429em',
  },
  fontLightWeight: {
    fontWeight: 100
  },
  fontMiddleWeight: {
    fontWeight: 400
  },
  italicText: {
    fontStyle: 'italic',
  },
  inlineText: {
    display: 'inline'
  },
  centerText: {
    textAlign: 'center',
  },
  leftText: {
    textAlign: 'left',
  },
  rightText: {
    textAlign: 'right',
  },
  fullWidth: {
    width: '100%'
  },
  bold: {
    fontWeight: 600,
  },
  red: {
    color: theme.palette.red.main
  },
  white: {
    color: theme.palette.white.main
  },
  blue: {
    color: theme.palette.blue.main
  },
  green: {
    color: theme.palette.green.main
  },
  generalButtonClass: {
    textTransform: 'none',
    borderRadius: 0,
    fontWeight: 'bold',
    fontSize: '1.15rem',
    fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
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
  fullWidthButtonGridItem: {
    width: '100%'
  },
  generalAssistButtonTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    paddingTop: '5px',
    paddingBottom: '5px',
    textTransform: 'none',
    color: theme.palette.white.main,
  },
  generalAssistButton: {
    borderRadius: '5px',
    display: 'block',
  },
  talentFormBackButton: {
    textTransform: 'none',
    borderRadius: '0px',
    primaryColor: theme.palette.white.main,
  },
  talentImportantRegardingButton: {
    display: 'block',
    borderRadius: '5px',
    color: theme.palette.white.main,
    boxShadow: 'none',
    backgroundColor: '#C00',
    '&:hover': {
      backgroundColor: '#ab003c'
    }
  },
  talentImportantRegardingButtonTitle: {
    ontSize: '1rem',
    fontWeight: 600,
    paddingTop: '5px',
    paddingBottom: '5px',
    textTransform: 'none',
    color: theme.palette.black.main,
  },
  talentProfileOtherInfoButton: {
    display: 'block!important'
  },

  talentProfileOtherInfoButtonTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    paddingTop: '5px',
    paddingBottom: '5px',
    textTransform: 'none',
  },

  talentProfileOtherInfoButtonStatus: {
    color: '#d6d7d8',
    textTransform: 'none',
  },

  talentProfileOtherInfoButtonGroup: {
    display: 'inherit'
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
  talentProfileGuildDownloadCombinationButton: {
    display: 'block',
    borderRadius: '5px',
    color: theme.palette.white.main,
    boxShadow: 'none',
    backgroundColor: '#C00',
    '&:hover': {
      backgroundColor: '#ab003c'
    }
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
  talentProfileGuideButtonRequiredTitle: {
    fontWeight: 600,
    color: theme.palette.red.light,
    textTransform: 'none'
  },
  talentProfileGuideButtonSubTitle: {
    fontWeight: 100,
    color: theme.palette.white.thin,
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
      color: theme.palette.black.light,
    },
  },
  talentProfileSpecialInfoEditIcon: {
    color: theme.palette.black.main,
    fontSize: '1.15rem',
    marginRight: '7px',
    marginTop: '3px',
    '&:hover': {
      color: theme.palette.black.light,
    },
  },
  talentProfileHeadlineEditIcon: {
    color: theme.palette.black.main,
    fontSize: '1.4rem',
    marginRight: '7px',
    marginTop: '10px',
    '&:hover': {
      color: theme.palette.black.light,
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
  talentAvailabilityCalendarDeleteButton: {
    padding: '0px',
    minWidth: '10px',
    minHeight: '10px',
    width: '20px',
    height: '20px',
    display: 'block',
    fontWeight: 600,
    right: '-300px',
    bottom: '-15px',
    color: theme.palette.white.main,
    backgroundColor: theme.palette.red.main,
    '&:hover': {
      backgroundColor: theme.palette.red.dark,
    },
  },
  talentAvailabilityCalendarDeleteButtonGridItem: {
    textAlign: 'right',
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
  talentProfileVideoAuditionUploadersRow: {
    width: '100%'
  },
  talentProfileVideoAuditionInstructionLinkedText: {
    color: '#0366d6',
    textDecoration: 'underline',
    fontSize: '0.85rem',
    textAlign: 'center'
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
  talentIntroductionButton: {
    borderRadius: '5px',
    padding: '16px 8px',
    display: 'block'
  },
  talentIntroductionButtonTitle: {
    fontWeight: 100,
    fontSize: '1rem',
    color: theme.palette.white.main,
    textTransform: 'none'
  },
  talentIntroductionButtonSuffixTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    paddingTop: '5px',
    paddingBottom: '5px',
    textTransform: 'none',
    display: 'inline',
    color: theme.palette.white.main,
  },
  homeBackgroundImage: {
    width: '100%',
    height: '1080px'
  },
  clientHomeContainer: {
    marginLeft: '-15px',
    marginRight: '-15px',
    marginBottom: '-16px'
  },
  clientHomeButtonsContainer: {
    width: '100%',
    borderRadius: '0rem',
    marginBottom: '0rem',
    marginTop: '0rem',
    paddingTop: '22px',
    backgroundColor: 'transparent!important',
    position: 'absolute'
  },
  clientHomeButton: {
    minWidth: '300px',
    maxWidth: '300px',
    minHeight: '105px',
    padding: '8px',
    display: 'block',
    borderRadius: '5px'
  },
  clientHomeButtonTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    paddingTop: '5px',
    paddingBottom: '5px',
    textTransform: 'none',
    whiteSpace: 'nowrap',
    color: theme.palette.white.main,
  },
  clientHomeButtonSubTitle: {
    fontWeight: 400,
    color: theme.palette.white.light,
    textTransform: 'none'
  },
  clientTalentTableCheckboxGridItem: {
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'right'
  },
  clientTalentSearchGenderButtonItem: {
    padding: '5px',
    display: 'block!important'
  },
  clientTalentSearchGenderButton: {
    display: 'inline-flex',
    borderRadius: '9px',
    border: `1px solid ${theme.palette.black.main}`,
    boxShadow: `0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)`
  },
  clientTalentSearchGenderButtonTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    color: theme.palette.black.main,
  },
  clientTalentSearchGenderButtonSelected: {
    display: 'inline-flex',
    borderRadius: '9px',
    color: theme.palette.white.main,
    backgroundColor: theme.palette.black.light,
    border: `1px solid ${theme.palette.black.main}`,
    '&:hover': {
      backgroundColor: theme.palette.black.thin
    },
    boxShadow: `0 0px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)`
  },
  clientTalentSearchGenderButtonSelectedTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    color: theme.palette.black.main,
  },
  clientTalentSearchSubPositionButton: {
    display: 'inline-flex',
    borderRadius: '9px',
    border: `1px solid ${theme.palette.black.main}`,
    padding: 0,
    boxShadow: `0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)`
  },
  clientTalentSearchSubPositionButtonTitle: {
    fontSize: '0.75rem',
    fontWeight: 400,
    textTransform: 'none',
    color: theme.palette.black.main,
  },
  clientTalentSearchSubPositionButtonSelected: {
    display: '\'inline-flex',
    borderRadius: '9px',
    color: theme.palette.white.main,
    backgroundColor: theme.palette.black.light,
    border: `1px solid ${theme.palette.black.main}`,
    padding: 0,
    '&:hover': {
      backgroundColor: theme.palette.black.thin
    },
    boxShadow: `0 0px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)`
  },
  clientTalentSearchSubPositionButtonSelectedTitle: {
    fontSize: '0.75rem',
    fontWeight: 400,
    textTransform: 'none',
    color: theme.palette.black.main,
  },
  clientTalentSearchResultPicture: {
    width: '70px',
    height: '72px',
    objectFit: 'cover',
  },
  clientTalentControlButtonContainer: {
    padding: '0px',
    maxWidth: '30px',
    margin: '0px'
  },
  clientTalentControlNewText: {
    padding: '0px',
    fontSize: '14px',
    fontWeight: 600,
  },
  clientCallbackTalentControlContainerDiv: {
    width: '64px',
    clear: 'both',
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    verticalAlign: 'bottom',
    textAlign: 'right',
    marginBottom: '10px',
    marginRight: '5px',
  },
  clientRatingTalentControlContainerDiv: {
    width: '64px',
    clear: 'both',
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    verticalAlign: 'top',
    textAlign: 'right',
    marginTop: '23px',
    marginRight: '5px',
  },
  clientTalentControlContainerDiv: {
    width: '64px',
    clear: 'both',
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    verticalAlign: 'top',
    textAlign: 'right',
    marginTop: '10px',
    marginRight: '5px',
  },
  clientTalentContainerDiv: {
    clear: 'both',
    display: 'inline-block',
    overflow: 'hidden',
    // white-space: nowrap;
    width: '90%'
  },
  clientTalentControlEditIcon: {
    padding: '0px',
    minWidth: '10px',
    minHeight: '10px',
    width: '20px',
    height: '20px',
    fontSize: '20px',
    fontWeight: 600,
  },
  clientTalentControlDeleteButton: {
    padding: '0px',
    minWidth: '10px',
    minHeight: '10px',
    width: '20px',
    height: '20px',
    fontWeight: 600,
  },
  clientTalentControlDeleteIcon: {
    color: theme.palette.grey.thin,
    fontSize: '20px',
    fontWeight: 600,
  },
  clientTalentControlBlockProfileExpirationText: {
    padding: '0px',
    fontSize: '0.8rem',
    fontWeight: 100,
  },
  clientTalentControlRatingButton: {
    padding: '3px 10px 3px 10px',
    minWidth: '10px',
    minHeight: '10px',
    width: '50px',
    fontWeight: 400,
  },
  clientTalentControlRatingButtonText: {
    color: theme.palette.white.main,
    fontSize: '0.8rem',
    fontWeight: 400,
    textTransform: 'none',
  },
  clientRatingAvatarImageContainer: {
    width: 300,
    height: '100%',
    objectFit: 'cover'
  },
  pictureContainer: {
    border: 'solid 3px',
    color: '#000000',
    display: 'inline-block',
    textAlign: 'center',
    marginRight: '10px',
    verticalAlign: 'top'
  },
  clientFormSubTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    //fontFamily: '"Gotham SSm", "Helvetica", "Arial", sans-serif',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
    marginTop: '0.5rem'
  },
  clientFromTalentIDContainer: {
    fontSize: '1rem',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
    position: 'absolute',
    right: 15,
    top: 45,
  },
  clientFromTalentName: {
    fontSize: '1.35rem',
    fontWeight: 600,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },
  clientFromTalentHeadLine: {
    fontSize: '1.15rem',
    fontWeight: 600,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },
  clientFromTalentIDText: {
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },
  clientFromTalentMarkFavoriteText: {
    fontSize: '0.85rem',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },
  clientRatingSubTitle: {
    width: '60%',
    margin: 'auto'
  },
  clientFormBackButton: {
    textTransform: 'none',
    borderRadius: '8px',
    backgroundColor: theme.palette.black.main,
    // border: '1px solid #EEEEEE',
    primaryColor: theme.palette.white.main,
    '&:hover': {
      backgroundColor: theme.palette.black.thin,
    },
  },
  clientFormNextButtonContainerGridItem: {
    textAlign: 'right',
  },
  clientFormNextButton: {
    textTransform: 'none',
    borderRadius: '8px',
    backgroundColor: theme.palette.black.main,
    primaryColor: theme.palette.white.main,
    // border: '1px solid #EEEEEE',
    '&:hover': {
      backgroundColor: theme.palette.black.thin,
    },
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
    fontWeight: 'bold',
    fontSize: '1.5rem',
    padding: '5px 10px 5px 10px',
    display: 'inline-flex'
  },
  clientTalentViewMoreInfoButtonGridItemWithoutFullWidth: {
    textAlign: 'center',
  },
  clientTalentViewMoreInfoButtonGridItem: {
    textAlign: 'center',
    paddingLeft: '15%!important',
    paddingRight: '15%!important',
    width: '100%'
  },
  clientTalentViewMoreInfoButton: {
    display: 'block',
    borderRadius: '5px',
  },
  clientTalentViewMoreInfoButtonText: {
    fontSize: '1rem',
    fontWeight: 600,
    paddingTop: '5px',
    paddingBottom: '5px',
    textTransform: 'none',
    color: theme.palette.white.main
  },
  clientTalentViewMoreInfoButtonStatusText: {
    color: theme.palette.white.thin,
    textTransform: 'none',
  },
  clientTalentViewVideoButtonGridItem: {
    textAlign: 'center',
    padding: '5px'
  },
  clientTalentViewVideoButton: {
    backgroundColor: theme.palette.black.main,
    display: 'block',
    borderRadius: '10px',
    border: `2px solid ${theme.palette.grey.thin}`,
    '&:hover': {
      backgroundColor: theme.palette.black.light
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
    color: theme.palette.white.thin,
    textTransform: 'none',
  },
  clientCastingRequestGridItem: {
    textAlign: 'right',
    paddingRight: '5px!important',
    verticalAlign: 'top',
    // paddingTop: '10px!important',
    marginBottom: 'auto',
    justifyContent: 'flex-end',
    display: 'flex'
  },
  clientCastingRequestListViewButton: {
    backgroundColor: theme.palette.black.main,
    display: 'block',
    borderRadius: '9px',
    border: `2px solid ${theme.palette.grey.thin}`,
    '&:hover': {
      backgroundColor: theme.palette.black.light
    },
  },
  clientTalentSearchButton: {
    backgroundColor: theme.palette.black.main,
    display: 'block',
    borderRadius: '9px',
    border: `2px solid ${theme.palette.grey.thin}`,
    '&:hover': {
      backgroundColor: theme.palette.black.light
    },
    // width: '100px'
  },
  clientCastingRequestListViewButtonText: {
    fontSize: '0.95rem',
    fontWeight: 400,
    paddingTop: '1px',
    paddingBottom: '1px',
    textTransform: 'none',
    color: theme.palette.white.main
  },
  clientSharedProfileTeamMemberText: {
    background: 'black',
    color: 'white',
    textAlign: 'center',
    paddingLeft: '20px',
    paddingRight: '20px!important',
    paddingTop: '5px',
    paddingBottom: '5px',
    borderRadius: '8px'
  },
  submitCastingRequestButton: {
    borderRadius: '5px',
  },
  submitCastingRequestButtonText: {
    fontSize: '1.25rem',
    fontWeight: 600,
    paddingTop: '5px',
    paddingBottom: '5px',
    textTransform: 'none',
    color: theme.palette.white.main
  },
  clientImmigrationForm: {
    marginLeft: 100,
    marginRight: 100
  }
});

export const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#007bff',
      light: '#2196F3'
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
      light: grey[100],
      dark: grey[300],
      thin: '#d6d7d8',
      contrastText: '#fff'
    },
    black: {
      main: grey[900],
      dark: grey[800],
      thin: grey[700],
      light: grey[600],
    },
    grey: {
      main: grey[900],
      dark: grey[800],
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
});

export const themeV0 = getMuiTheme({
  palette: {
    primary1Color: '#007bff',
    accent1Color: '#40c741',
  }
});

export const themeClientSpecialActionButton = createMuiTheme ({
  palette: {
    primary: {
      main: '#2a3134',
    },
    secondary: {
      main: '#C00'
    }
  }
});

export const clientDesigns = {
  talentSearch: {
    PositionsTableItems: { xl: 1, lg: 2, md: 2, sm: 3, xs: 4 },
  },
};

export default styles;