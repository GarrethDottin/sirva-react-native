import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity } from 'react-native';
import { hideBell  } from '../Redux/Modules/Concierge'
import { Images } from '../Theme'
import { styles } from './Styles/DrawerMenuStyles'
import { setDrawerState, getDrawerState } from '../Redux/Modules/Drawer'
import { openDrawer } from '../Utils/NavigationHelpers';

class DrawerMenu extends Component {
    render() {
        return (
            <View style={styles.menuContainer}>
                <TouchableOpacity onPress={() => this.props.openMenu()} style={styles.buttonContainer}>
                    <Image source={Images.iconDrawerMenu} style={styles.image} />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openMenu: () => {
            dispatch(hideBell());
            dispatch(setDrawerState(true));
            openDrawer();
        }
    };
};

export default connect(
    undefined,
    mapDispatchToProps,
)(DrawerMenu);
