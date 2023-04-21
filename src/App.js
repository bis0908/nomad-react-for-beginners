import React, { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setcoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [selectedCoinUSD, setSelectedCoinUSD] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((json) => {
        setcoins(json);
        setLoading(false);
      });
  }, []);

  const onChange = (e) => {
    setMoney(e.target.value);
  };

  const onSelected = (e) => {
    // console.log("e: ", e);
    const selectedPrice = e.target.selectedOptions[0].getAttribute("price");
    setSelectedCoinUSD(parseFloat(selectedPrice));
  };

  function HowMuchisIt() {
    return (
      <input type="number" value={money > 0 ? `${money / selectedCoinUSD}` : 0} disabled></input>
    );
  }

  function PrintCoins() {
    return (
      <select onChange={onSelected}>
        {coins.map((coin) => {
          return (
            <option key={coin.id} price={coin.quotes.USD.price}>
              {coin.name}({coin.symbol}): {coin.quotes.USD.price} USD
            </option>
          );
        })}
      </select>
    );
  }

  /* 
    [] option에서 선택한 코인의 USD를 저장한다.
    [] 이 코인의 USD를 money로 나눈다.
    [] 나눈 USD를 disabled된 input에 입력한다.
    [] 단, money 값이 바뀔때만 업데이트 되어야 함.
  */
  return (
    <div>
      {/* <h1>The Coins! {loading ? "" : `${coins.length}`}</h1> */}
      <h1>The Coins! {loading ? "" : `${coins.length}`}</h1>
      <div>
        if i have this dollars...
        <input type="number" value={money} onChange={onChange}></input>
      </div>
      <div>
        i can buy coin qty
        {/* <input type="number" value={money} disabled></input> */}
        <HowMuchisIt />
      </div>
      {loading ? <strong>Loading...</strong> : <PrintCoins />}
    </div>
  );
}

export default App;
