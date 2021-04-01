import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableHighlight} from 'react-native';
import {styles} from './styles';
import {Picker} from '@react-native-picker/picker';
import {fetchTopCoins} from './crud';
import Loader from '../Loader';

const Form = ({ coin, cryptocoin, onChangeCoin, onChangeCryptocoin, onQuotePrice }) => {
  const [loading, setLoading] = useState(false);
  const [topCoins, setTopCoins] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getCoins = async () => {
      try {
        const res = await fetchTopCoins();
        const json = await res.json();
        setTopCoins(json.Data);
      } catch (error) {
        console.log('Error');
      } finally {
        setLoading(false);
      }
    };
    getCoins();
  }, []);

  const handleQuotePrice = () => {
    if (coin.trim() === '' || cryptocoin.trim() === '')
      return showFieldAlerts();
      onQuotePrice();
  };

  const showFieldAlerts = () => {
    Alert.alert('Error...', 'Ambos campos son obligatorios', [
      {
        text: 'ok',
      },
    ]);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text style={styles.label}>Normal Coin</Text>
          <Picker
            mode="dropdown"
            dropdownIconColor="#5E49E2"
            selectedValue={coin}
            onValueChange={onChangeCoin}
            fontFamily="Lato-Black">
            <Picker.Item label="- Seleccione -" value="" />
            <Picker.Item label="United State Dollar" value="USD" />
            <Picker.Item label="Mexican Peso" value="MXN" />
            <Picker.Item label="Euro" value="EUR" />
            <Picker.Item label="Pound Sterling" value="GBP" />
          </Picker>
          <Text style={styles.label}>Cryptcoin</Text>

          <Picker
            mode="dropdown"
            dropdownIconColor="#5E49E2"
            selectedValue={cryptocoin}
            onValueChange={onChangeCryptocoin}
            fontFamily="Lato-Black">
            <Picker.Item label="- Seleccione -" value="" />
            {topCoins.map(coin => (
              <Picker.Item
                key={coin.CoinInfo.Id}
                label={coin.CoinInfo.FullName}
                value={coin.CoinInfo.Name}
              />
            ))}
          </Picker>

          <TouchableHighlight
            style={styles.btnQuote}
            onPress={handleQuotePrice}>
            <Text style={styles.textQuote}>Quote now</Text>
          </TouchableHighlight>
        </>
      )}
    </>
  );
};

export default Form;
