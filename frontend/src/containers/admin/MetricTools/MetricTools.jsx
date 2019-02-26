import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import AdminForm from 'components/shiptalent/forms/adminForm';
import MetricToolsItem from 'containers/admin/MetricTools/MetricToolsItem';
import { adminStyles } from 'styles';


class MetricTools extends React.Component  {

  renderContent = () => {
    return (
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item md={2} sm={2} xs={1} />
        <Grid item md={8} sm={8} xs={10}>
          <Grid container spacing={24}>          
            <Grid item md={4} sm={6} xs={12}>
              <MetricToolsItem path="/admin/talent-metrics" title="TALENT METRICS" />
            </Grid>
            <Grid item md={4} sm={6} xs={12} >  
              <MetricToolsItem path="/admin/choose-client" title="CLIENT METRICS" />
            </Grid>
            <Grid item md={4} sm={6} xs={12} >
              <MetricToolsItem path="/admin/dance-combo" title="DANCE COMBO METRICS" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} xs={1} />

        <Grid item md={3} xs={1} />
        <Grid item md={6} xs={10}>
          <Grid container spacing={24}>          
            <Grid item md={6} sm={6} xs={12}>
              <MetricToolsItem path="/admin/add-edit" title="ADD/EDIT DANCE COMBO VIDEOS" />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <MetricToolsItem path="/admin/add-video" title="ADD/EDIT INTERVIEW QUESTIONS" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={1} />

        <Grid item xs={1} />
        <Grid item xs={10}>
          <Grid container spacing={24}>          
            <Grid item md={3} sm={6} xs={12}>
              <MetricToolsItem path="/admin/client-look" title="CLIENT LOOKUP" />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <MetricToolsItem path="/admin/client-mainten" title="CLIENT MAINTENACE" />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <MetricToolsItem path="/admin/add-client" title="ADD CLIENT" />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <MetricToolsItem path="/admin/add-client" title="VIEW INVITATIONS" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} />

        <Grid item md={3} xs={1} />
        <Grid item md={6} xs={10}>
          <Grid container spacing={24}>          
              <Grid item md={6} sm={6} xs={12}>    
                <MetricToolsItem path="/admin/add-client" title="CLIENT VIEW" />
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <MetricToolsItem path="/admin/add-client" title="TALENT VIEW" />
              </Grid>
            </Grid>
        </Grid>
        <Grid item md={3} sm={3} xs={1} />
      </Grid>
    );
  }

  render = () => {
    return (
      <AdminForm
        formTitle="METRICS & TOOLS"
        nextLink="/admin/dashboard"
        nextButtonTitle="Agent Dashboard"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}


export default withStyles(adminStyles)(MetricTools);