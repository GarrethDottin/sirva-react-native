import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { View, Text } from 'react-native';
import styles from './Styles/CompareListItemStyles';

export default CompareListItem = (props) => {
    return(
        <View style={styles.costInformationParentContainer}>
            <View style={styles.costInformationMainContainer}>
                <View style={styles.costInformationContainer}>
                    <Text style={styles.firstItem}>{props.title.toUpperCase()}</Text>
                    <View style={styles.costInfomationSubContainer}>
                        <Text style={styles.secondItem}>{props.item1 || 'N/A'}</Text>
                        {props.item1Subtitle ? <Text style={styles.item1Subtitle}>{props.item1Subtitle}</Text> : <Text style={styles.item1Subtitle}></Text> }
                    </View>
                    <View style={styles.costInfomationSubContainer}>
                        <Text style={styles.thirdItem}>{props.item2 || 'N/A'}</Text>
                        {props.item2Subtitle ? <Text style={styles.item2Subtitle}>{props.item2Subtitle}</Text> : <Text style={styles.item2Subtitle}></Text>}
                    </View>
                </View>
            </View>
            {props.subtitle ? <Text style={styles.constInformationSubtitle}>{props.subtitle}</Text> : null}
        </View>
    )
}
