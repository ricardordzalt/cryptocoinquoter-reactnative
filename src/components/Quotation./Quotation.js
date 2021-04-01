import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

const Quotation = ({ data, coin, cryptocoin }) => {
    return (
      <View style={styles.result}>
        <Text style={styles.text}>Current price of {cryptocoin}:</Text>
        <Text style={[styles.span, styles.price]}>{data.PRICE}</Text>
        <Text style={styles.text}>Highday price (higher price of today):{' '}
          <Text style={styles.span}>{data.HIGHDAY}</Text>
        </Text>
        <Text style={styles.text}>Lowday price (lowest price of today):{' '}
          <Text style={styles.span}>{data.LOWDAY}</Text>
        </Text>
        <Text style={styles.text}>Variation of last 24 hours: {' '}
          <Text style={styles.span}>{data.CHANGEPCT24HOUR}</Text>
        </Text>
        <Text style={styles.text}>Last update: {' '}
          <Text style={styles.span}>{data.LASTUPDATE}</Text>
        </Text>
      </View>
    );
};

export default Quotation;