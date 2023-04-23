import React, { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [selectedCoinUSD, setSelectedCoinUSD] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChange = (e) => {
    setMoney(e.target.value);
  };

  const onSelected = (e) => {
    const selectedPrice = parseFloat(e.target.selectedOptions[0].getAttribute("price"));
    setSelectedCoinUSD(selectedPrice);
  };

  // function CoinList({ coins, onSelected }) {
  //   return (
  //     <select onChange={onSelected}>
  //       {coins.map((coin) => (
  //         <option key={coin.id} price={coin.quotes.USD.price.toFixed(8)}>
  //           {coin.name} ({coin.symbol}): ${coin.quotes.USD.price.toFixed(8)}
  //         </option>
  //       ))}
  //     </select>
  //   );
  // }

  return (
    <div>
      <h1>The Coins! {loading ? "" : coins.length}</h1>
      <div>
        If I have this dollars...
        <input type="number" value={money} onChange={onChange} min="0" />
      </div>
      <div>
        I can get coin this much
        <input
          type="number"
          value={money > 0 && selectedCoinUSD !== "" ? money / selectedCoinUSD : 0}
          disabled
        />
      </div>
      {loading ? <strong>Loading...</strong> : <CoinList coins={coins} onSelected={onSelected} />}
    </div>
  );
}

function CoinList({ coins, onSelected }) {
  return (
    <select onChange={onSelected}>
      {coins.map((coin) => (
        <option key={coin.id} price={coin.quotes.USD.price.toFixed(8)}>
          {coin.name} ({coin.symbol}): ${coin.quotes.USD.price.toFixed(8)}
        </option>
      ))}
    </select>
  );
}

export default App;
