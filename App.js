import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { requestQuotePrice } from './crud';
import Form from './src/components/Form/Form';
import Header from './src/components/Header';
import Loader from './src/components/Loader';
import Quotation from './src/components/Quotation./Quotation';
import { styles } from './styles';

const App = () => {
  const [cryptocoin, setCryptocoin] = useState('');
  const [coin, setCoin] = useState('');
  const [loading, setLoading] = useState(false);
  const [coinResults, setCoinResults] = useState(null);

  const handleChangeCoin = value => {
    setCoin(value);
  };

  const handleChangeCryptocoin = value => {
    setCryptocoin(value);
  };

  const handleQuotePrice = () => {
    setLoading(true);
    setCoinResults(null);
    requestQuotePrice({ cryptocoin, coin })
      .then(res => res.json())
      .then(json => {
        const coinData = json.DISPLAY.[cryptocoin]?.[coin];
        setCoinResults(coinData);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
      
  };

  return (
    <ScrollView>
      <Header />
      <Image
        style={styles.image}
        source={require('./src/assets/img/cryptomonedas.png')}
      />
      <View style={styles.content}>
        <Form
          coin={coin}
          cryptocoin={cryptocoin}
          onChangeCoin={handleChangeCoin}
          onChangeCryptocoin={handleChangeCryptocoin}
          onQuotePrice={handleQuotePrice}
        />
      </View>
        {loading ? <View style={styles.loader}><Loader/></View> : coinResults && <Quotation coin={coin} cryptocoin={cryptocoin} data={coinResults}/>}
    </ScrollView>
  );
};
export default App;
