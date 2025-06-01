
// import TradingViewWidget from 'react-tradingview-widget';
// import { useCrypto } from '@/contexts/CryptoContext';

// const CryptoChart = () => {
//   const { selectedCrypto } = useCrypto();

//   // Map crypto symbols to TradingView symbols
//   const getTradingViewSymbol = (symbol: string) => {
//     const symbolMap: { [key: string]: string } = {
//       'btc': 'BINANCE:BTCUSDT',
//       'eth': 'BINANCE:ETHUSDT',
//       'usdt': 'BINANCE:USDTUSD',
//       'xrp': 'BINANCE:XRPUSDT',
//       'bnb': 'BINANCE:BNBUSDT'
//     };
//     return symbolMap[symbol.toLowerCase()] || 'BINANCE:BTCUSDT';
//   };

//   return (
//     <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-semibold">{selectedCrypto.name} Price</h2>
//       </div>
//       <div className="h-[400px] w-full">
//         <TradingViewWidget
//           symbol={getTradingViewSymbol(selectedCrypto.symbol)}
//           theme="dark"
//           locale="en"
//           autosize
//           hide_side_toolbar={false}
//           allow_symbol_change={true}
//           interval="D"
//           toolbar_bg="#141413"
//           enable_publishing={false}
//           hide_top_toolbar={false}
//           save_image={false}
//           container_id="tradingview_chart"
//         />
//       </div>
//     </div>
//   );
// };

// export default CryptoChart;


import { useEffect, useRef } from "react";
import { useCrypto } from "@/contexts/CryptoContext";

declare global {
  interface Window {
    TradingView: any;
  }
}

const CryptoChart = () => {
  const { selectedCrypto } = useCrypto();
  const chartRef = useRef<HTMLDivElement>(null);

  const getTradingViewSymbol = (symbol: string) => {
    const symbolMap: { [key: string]: string } = {
      btc: "BINANCE:BTCUSDT",
      eth: "BINANCE:ETHUSDT",
      usdt: "BINANCE:USDTUSD",
      xrp: "BINANCE:XRPUSDT",
      bnb: "BINANCE:BNBUSDT",
    };
    return symbolMap[symbol.toLowerCase()] || "BINANCE:BTCUSDT";
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (chartRef.current) {
        new window.TradingView.widget({
          autosize: true,
          symbol: getTradingViewSymbol(selectedCrypto.symbol),
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#141413",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: "tradingview_chart",
        });
      }
    };
    document.body.appendChild(script);
  }, [selectedCrypto]);

  return (
    <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{selectedCrypto.name} Price</h2>
      </div>
      <div id="tradingview_chart" ref={chartRef} className="h-[400px] w-full" />
    </div>
  );
};

export default CryptoChart;
