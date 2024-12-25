import { useCallback, useEffect, useMemo, useState } from "react";
import InputBox from "./components/InputBox";
import { useCurrencyInfo } from "./hooks/useCurrencyInfo";

function App() {  
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyOptions = useCurrencyInfo(from);
  const options = Object.keys(currencyOptions);
  
  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }

  const computeConvertedAmount = useCallback(() => {
    setConvertedAmount(Number(amount * currencyOptions[to]));
  }, [amount, currencyOptions, to]);

  return (
      <div
          className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
          style={{
              backgroundImage: `url(https://cdn.pixabay.com/photo/2023/02/01/21/40/pink-7761356_1280.png)`,
          }}
      >
          <div className="w-full">
              <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                  <form
                      onSubmit={(e) => {
                          e.preventDefault();
                          computeConvertedAmount();
                      }}
                  >
                      <div className="w-full mb-1">
                          <InputBox
                              label = "From"
                              amount = {amount}
                              onAmountChange = {(amount) => {setAmount(Math.max(0, amount))}}
                              onCurrencyChange = { (currency) => { setFrom(currency) } }
                              currencyOptions = { options }
                              selectCurrency = { from }
                              amountDisable = { false }
                              currencyDisable = { false }
                              className = ""
                          />
                      </div>
                      <div className="relative w-full h-0.5">
                          <button
                              type="button"
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                              onClick={swap}
                          >
                              swap
                          </button>
                      </div>
                      <div className="w-full mt-1 mb-4">
                            <InputBox
                              label = "To"
                              amount = {convertedAmount}
                              onAmountChange = {(amount) => {setConvertedAmount(amount)}}
                              onCurrencyChange = { (currency) => { setTo(currency) } }
                              currencyOptions = { options }
                              selectCurrency = { to }
                              amountDisable = { false }
                              currencyDisable = { false }
                              className = ""
                          />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
                      >
                        Convert { from.toUpperCase() } to { to.toUpperCase() } 
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default App  
