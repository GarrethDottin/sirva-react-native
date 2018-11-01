import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Layout } from '../../../Theme'
import { H2 } from '../../../Components'
import styles from './Styles/EstimateBannerStyles';
import { formatCurrencyFromString } from '../../../Utils/ReactHelpers'

export default EstimateBanner = (props) => {
    const quote = props.quote

    return (
        <View style={[styles.summary, Layout.innerContainerNarrowed]}>
            <View style={styles.summaryColumn}>
                <Image style={styles.brandLogo} 
                    resizeMode='cover' 
                    source={{ uri: quote.supplierData.data.logo}} />

                <H2 style={styles.name}>{quote.supplierData.data.name}</H2>
                {/*<P style={styles.subname}>Professional Movers</P>*/}
            </View>
            <View style={styles.summaryColumn}>
                <Text style={styles.price}>{formatCurrencyFromString(quote.avgPrice)}</Text>
                <Text style={[styles.estimate, styles.label]}>{props.label}</Text>
            </View>
        </View>
    )
}