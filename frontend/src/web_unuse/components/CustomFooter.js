import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	Badge,
	Button,
  Footer,
  FooterTab,
  Text,
  Thumbnail
} from 'native-base';

import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { translate } from '../i18n';

const styles = StyleSheet.create({
	badge: {
    position: 'relative',
    top: 30,
    left: 4,
    transform: [
      { scale: 0.6 }
    ],
  },
  footerLogo: {
    width: 32,
    height: 32,
    alignSelf: "center"
  },
  footerActive: {
    color: '#358A83',
    fontSize: 12,
  },
  footerNormal: {
    color: '#A1A1A1',
    fontSize: 12,
  }
});

class CustomFooter extends Component {
	constructor(props) {
    super(props);
	};
	render() {
		let { active, locale } = this.props;
		return (
			<Footer style={{backgroundColor: '#F9F9F9'}}>
        <FooterTab>
          <Button onPress={() => Actions.push('interact')} >
            <Thumbnail
              square
              style={styles.footerLogo} 
              source={active=='interact' ? require('../images/interact_active.jpg') : require('../images/interact.jpg')} />
            <Text style={active=='interact' ? styles.footerActive : styles.footerNormal}>{translate('Interact', locale)}</Text>
          </Button>
          <Button onPress={() => Actions.push('learn')}>
            <Thumbnail
              square
              style={styles.footerLogo} 
              source={active=='learn' ? require('../images/learn_active.jpg') : require('../images/learn.jpg')} />
            <Text style={active=='learn' ? styles.footerActive : styles.footerNormal}>{translate('Learn', locale)}</Text>
          </Button>
          <Button onPress={() => Actions.push('home')}>
            <Thumbnail
              square
              style={styles.footerLogo} 
              source={active=='actions' ? require('../images/actions_active.jpg') : require('../images/actions.jpg')} />
            <Text style={active=='actions' ? styles.footerActive : styles.footerNormal}>{translate('Actions', locale)}</Text>
          </Button>
          <Button badge vertical onPress={() => Actions.push('track')}>
            <Badge style={styles.badge}><Text>1</Text></Badge>
            <Thumbnail
              square
              style={styles.footerLogo} 
              source={active=='track' ? require('../images/track_active.jpg') : require('../images/track.jpg')} />
            <Text style={active=='track' ? styles.footerActive : styles.footerNormal}>{translate('Track', locale)}</Text>
          </Button>
          <Button onPress={() => Actions.push('self')}>
            <Thumbnail
              square
              style={styles.footerLogo} 
              source={active=='self' ? require('../images/self_active.jpg') : require('../images/self.jpg')} />
            <Text style={active=='self' ? styles.footerActive : styles.footerNormal}>{translate('Self', locale)}</Text>
          </Button>
        </FooterTab>
      </Footer>
		)
	}
}

CustomFooter.propTypes = {
  active: PropTypes.string,
};

CustomFooter.defaultProps = {
  active: 'actions',
};

export default CustomFooter;