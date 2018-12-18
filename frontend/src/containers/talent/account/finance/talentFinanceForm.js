import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Panel from 'components/general/panel';
import Spacer from "components/general/spacer";
import styles from 'styles';


const ccl = {
  client_type: 'CCL',
  contract_date: {start_date: '03/14/2018', end_date: '09/12/2018'},
  gross_wage: '$5,500',
  commission: '$550.00',
  balance_due: '$550.00',
  invoices: [
    { date: '04/01/2018', nbr: 'VDA222-041', amt: '$550.00', amt_paid: '$000.00', date_paid: '00/00/0000', balance: '$550.00' },
    { date: '03/01/2018', nbr: 'VDA222-0318', amt: '$301.61', amt_paid: '$301.61', date_paid: '03/05/2018', balance: '$0.00' }
  ]
};

const ncl = {
  client_type: 'NCL',
  contract_date: {start_date: '06/17/2017', end_date: '01/19/2018'},
  gross_wage: '$5,250',
  commission: '$525.00',
  balance_due: '$0.00',
  invoices: []
};

const rci = {
  client_type: 'RCI',
  contract_date: {start_date: '01/22/2017', end_date: '05/01/2017'},
  gross_wage: '$4,750',
  commission: '$475.00',
  balance_due: '$0.00',
  invoices: []
};

const rsw = {
  client_type: 'RSW',
  contract_date: {start_date: '06/05/2016', end_date: '12/19/2016'},
  gross_wage: '$4,500',
  commission: '$450.00',
  balance_due: '$0.00',
  invoices: [
    { date: '12/01/2016', nbr: 'VDA222-1116', amt: '$450.00', amt_paid: '$450.00', date_paid: '12/28/2016', balance: '$0.00' },
    { date: '11/01/2016', nbr: 'VDA222-1116', amt: '$450.00', amt_paid: '$450.00', date_paid: '11/11/2016', balance: '$0.00' },
    { date: '10/01/2016', nbr: 'VDA222-1116', amt: '$450.00', amt_paid: '$450.00', date_paid: '10/08/2016', balance: '$0.00' },
    { date: '09/01/2016', nbr: 'VDA222-1116', amt: '$450.00', amt_paid: '$450.00', date_paid: '09/22/2016', balance: '$0.00' },
    { date: '08/01/2016', nbr: 'VDA222-1116', amt: '$450.00', amt_paid: '$450.00', date_paid: '08/10/2016', balance: '$0.00' },
    { date: '07/01/2016', nbr: 'VDA222-1116', amt: '$450.00', amt_paid: '$450.00', date_paid: '07/15/2016', balance: '$0.00' },
    { date: '06/01/2016', nbr: 'VDA222-1116', amt: '$375.00', amt_paid: '$375.00', date_paid: '07/02/2016', balance: '$0.00' },
  ]
};


class TalentFinanceForm extends Component {

  renderGeneralHeader(financeData) {
    const { classes } = this.props;
    return (
      <Grid container spacing={0} justify="flex-start" alignItems="flex-start">
        <Grid item lg={1} md={1} sm={3} xs={6}>
          <Typography className={classes.financeTableTitle}>
            {`Client: ${financeData.client_type}`}
          </Typography>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={6}>
          <Typography className={classes.financeTableTitle}>
            {`Contract Dates: ${financeData.contract_date.start_date} - ${financeData.contract_date.end_date}`}
          </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={6}>
          <Typography className={classes.financeTableTitle}>
            {`Gross Wage: ${financeData.gross_wage}`}
          </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={6}>
          <Typography className={classes.financeTableTitle}>
            {`Commission: ${financeData.commission}`}
          </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={6}>
          <Typography className={[classes.financeTableTitle, classes.descriptionStrongRed]}>
            {`Balance Due: ${financeData.balance_due}`}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  renderInvoiceHeaderItem(value) {
    const { classes } = this.props;

    return (
      <Grid item lg={1} md={1} sm={3} xs={2}>
        <Typography className={[classes.financeTableContentText, classes.underlineText]}>
          { value }
        </Typography>
      </Grid>
    )
  }

  renderInvoiceHeader() {
    const { classes } = this.props;
    let headers = [];

    headers.push(this.renderInvoiceHeaderItem('INV DATE'));
    headers.push(this.renderInvoiceHeaderItem('INV NBR'));
    headers.push(this.renderInvoiceHeaderItem('INV AMT'));
    headers.push(this.renderInvoiceHeaderItem('AMT PAID'));
    headers.push(this.renderInvoiceHeaderItem('DATE PAID'));
    headers.push(this.renderInvoiceHeaderItem('BALANCE'));
    headers.push(<Grid item lg={6} md={6} sm={6} xs={0}/>);

    return headers;
  }

  renderInvoiceItem(value) {
    const { classes } = this.props;

    return (
      <Grid item lg={1} md={1} sm={3} xs={2}>
        <Typography className={classes.financeTableContentText}>
          { value }
        </Typography>
      </Grid>
    );
  }

  renderFinanceTable(financeData) {
    const { classes } = this.props;

    return (
      <Grid container spacing={8} justify="flex-start" alignItems="flex-start" style={{boder: '2px solid'}}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          { this.renderGeneralHeader(financeData) }
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={8} justify="flex-start" alignItems="flex-start">
            { financeData.invoices.length > 0 && this.renderInvoiceHeader() }
            {
              financeData.invoices.map((invoice) => {
                let items = [];
                items.push(this.renderInvoiceItem(invoice.date));
                items.push(this.renderInvoiceItem(invoice.nbr));
                items.push(this.renderInvoiceItem(invoice.amt));
                items.push(this.renderInvoiceItem(invoice.amt_paid));
                items.push(this.renderInvoiceItem(invoice.date_paid));
                items.push(this.renderInvoiceItem(invoice.balance));
                items.push(<Grid item lg={6} md={6} sm={6} xs={0}/>);
                return items;
              })
            }
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Panel>
        <Grid container spacing={40} justify="center" alignItems="center">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={10}/>
          </Grid>

          <Grid item lg={1} md={1} sm={1} xs={1} className={ classes.financeIconGridItem } >
            <Link to="#">
              <RemoveIcon className={ classes.financeIcon } />
            </Link>
          </Grid>
          <Grid item lg={11} md={11} sm={11} xs={11} className={ classes.financeTable } >
            { this.renderFinanceTable(ccl) }
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={5}/>
          </Grid>

          <Grid item lg={1} md={1} sm={1} xs={1} className={ classes.financeIconGridItem } >
            <Link to="#">
              <AddIcon className={ classes.financeIcon } />
            </Link>
          </Grid>
          <Grid item lg={11} md={11} sm={11} xs={11} className={ classes.financeTable } >
            { this.renderFinanceTable(ncl) }
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={50}/>
          </Grid>

          <Grid item lg={1} md={1} sm={1} xs={1} className={ classes.financeIconGridItem } >
            <Link to="#">
              <AddIcon className={ classes.financeIcon } />
            </Link>
          </Grid>
          <Grid item lg={11} md={11} sm={11} xs={11} className={ classes.financeTable } >
            { this.renderFinanceTable(rci) }
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={50}/>
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} className={ classes.financeIconGridItem } >
            <Link to="#">
              <AddIcon className={ classes.financeIcon } />
            </Link>
          </Grid>
          <Grid item lg={11} md={11} sm={11} xs={11} className={ classes.financeTable } >
            { this.renderFinanceTable(rsw) }
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={50}/>
          </Grid>

        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(TalentFinanceForm);

