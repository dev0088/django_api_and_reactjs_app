import React, {Component} from 'react';
import bottomTear from '../../images/bottom-tear.svg';

class MobileTearSheet extends Component {
  render() {
    const styles = {
      root: {
        float: 'left',
        marginBottom: 24,
        marginRight: 24,
        width: 360,
        height: 500
      },

      container: {
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflow: 'hidden',
        paddingBottom: '30px'
      },

      bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
        width: 360
      }
    };

    return (
      <div style={styles.root}>
        <div style={styles.container}>
          {this.props.children}
        </div>
        <img style={styles.bottomTear} src={bottomTear} alt=""/>
      </div>
    );
  }

};

export default MobileTearSheet;
