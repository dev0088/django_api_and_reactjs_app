import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropertyButton from './adminTalentPositions/PropertyButton';
import { adminStyles } from 'styles';


class AdminTalentGenders extends Component {
    render() {
        const { sex } = this.props;
        return (
            <div>
                <PropertyButton title={'Male'} selected={sex === 'm'} />
                <PropertyButton title={'Female'} selected={sex === 'f'} />
            </div>
        );
    }
}

export default withStyles(adminStyles)(AdminTalentGenders);