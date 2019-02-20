import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddNoteDialog from './AddNoteDialog';
import AdminAPI from 'apis/adminAPIs';
import * as adminActions from 'actions/adminActions';
import { adminStyles } from 'styles';


class UserNoteSync extends React.Component  {
  state = {
    profileId: 0,
    notes: [],
    searchCondition: null
  };

  getInfoFromProps = (props) => {
    const { userIds, noteTypes, objectId } = props;
    let profileId = props.profile && props.profile.user.id;
    let searchCondition = {
      receivers: userIds,
      note_types: noteTypes,
    };
    if (objectId) searchCondition = {...searchCondition, object_id: objectId};
    
    return { searchCondition, profileId };
  };

  requestNotes = () => AdminAPI.searchNotes(this.state.searchCondition, this.handleSearchNotesResponse);

  handleSearchNotesResponse = (response, isFailed) => {
    if (isFailed) {} 
    else {
      this.setState({notes: response});
    }
  }

  componentWillMount = () => this.setState({...this.getInfoFromProps(this.props)}, () => this.requestNotes());

  componentWillReceiveProps = (nextProps) => {
    this.setState({...this.getInfoFromProps(nextProps)}, () => this.requestNotes());
  }

  onOK = (note) => {
    const { userIds, objectId, noteTypes } = this.props;
    for (let i = 0; i < noteTypes.length; i ++) {
      let noteType = noteTypes[i];
      for (let j = 0; j < userIds.length; j ++) {
        let data = {
          receiver: userIds[j],
          object_id: objectId,
          note_type: noteType,
          note: note
        };
        AdminAPI.addNote(data, this.handleAddNoteResponse);
      }
    }
    // this.requestNotes();
  };

  onCancel = () => this.setState({showAddDialog: false});
  
  handleAddNoteResponse = (response, isFailed) => {
    if (isFailed) {} 
    else this.setState({notes: this.state.notes.push(response)});
  };

  handleClickAddButton = () => this.setState({showAddDialog: true});

  render() {
    const { enableAdd, lines, classes } = this.props;
    const { notes, showAddDialog } = this.state;
    let strNotes = '';
    
    if (notes) {
      for (let i = 0; i < notes.length; i ++) {
        strNotes += `${notes[i].note}\n`;
      }
    }

    return (
      <Grid container spacing={0} justify="flex-start" alignItems="flex-start">
        { enableAdd && 
          <Grid item xs={12}>
            <Button variant="contained" size="small" className={classNames(classes.button, classes.adminAddNoteButton)}
              onClick={this.handleClickAddButton}
            >
              <Typography className={classes.adminAddNoteButtonTitle}>
                Add Note
              </Typography>
            </Button>
          </Grid>
        }
        <Grid item xs={12}>
          <TextField
            id="outlined-bare"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            rows={lines ? lines : 8}
            rowsMax={lines ? lines : 8}
            multiline
            value={strNotes}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Grid>
        <AddNoteDialog
          open={showAddDialog}
          onOK={this.onOK}
          onCancel={this.onCancel}
        />
      </Grid>
    );
  }
}


const mapStateToProps = state => {
  const { talentInfo } = state;
  return {
    profile: talentInfo.value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    adminActions: bindActionCreators(adminActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(UserNoteSync));
