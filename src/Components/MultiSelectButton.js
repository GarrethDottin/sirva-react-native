import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/MultiSelectButtonStyles'
/*
    receives an array as prop will render that element as if it was a list
    requires that the array has atleast 2 elements
    elements: [
      {
        label: ""
        children: ""
        style: {}
        onPress: () => null
        selected: true|false
      }
    ],
    idSuffix: "someuniqueid" // required when dynamicly creating components as we do inside renderMiddleSection()
*/
export default class MultiSelectButton extends Component {

    //if children are passed in show them, 
    //if they aren't, and there's a label use that in the button
    renderChildren(element) {
        if (element.children !== null) {
            return element.children
        } else if (element.label) {
            return <Text style={[styles.buttonText, ((element.selected) ? styles.buttonTextSelected : {})]}>{element.label}</Text>
        } else {
            return null
        }
    }

    //only render the label below the button if there are also children
    renderLabel(element) {
        if (element.label && (element.children !== null)) {
            return <Text style={styles.labelText}>{element.label}</Text>
        } else {
            return null
        }
    }

    getExtraStyles(index) {
        if (index === 0) return styles.leftEdgeButton
        else if (index === (this.props.elements.length - 1)) return styles.rightEdgeButton
        return {}
    }

    render() {
        return (
            <View style={styles.iconRows}>
                {this.props.elements.map((element, index) => (
                    <TouchableOpacity onPress={element.onPress}
                        style={[styles.buttonArea, element.style]}
                        key={`${this.props.idSuffix + "multiSelectButton" + index}`}>

                        <View style={[
                            styles.selectableArea,
                            this.getExtraStyles(index),
                            ((element.selected) ? styles.selectableAreaSelected : {})]}>

                            {this.renderChildren(element)}
                        </View>
                        {this.renderLabel(element)}
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
}