
import TradingViewWidget from 'react-tradingview-widget';
import { useCrypto } from '@/contexts/CryptoContext';

const CryptoChart = () => {
  const { selectedCrypto } = useCrypto();

  // Map crypto symbols to TradingView symbols
  const getTradingViewSymbol = (symbol: string) => {
    const symbolMap: { [key: string]: string } = {
      'btc': 'BINANCE:BTCUSDT',
      'eth': 'BINANCE:ETHUSDT',
      'usdt': 'BINANCE:USDTUSD',
      'xrp': 'BINANCE:XRPUSDT',
      'bnb': 'BINANCE:BNBUSDT'
    };
    return symbolMap[symbol.toLowerCase()] || 'BINANCE:BTCUSDT';
  };

  return (
    <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{selectedCrypto.name} Price</h2>
      </div>
      <div className="h-[400px] w-full">
        <TradingViewWidget
          symbol={getTradingViewSymbol(selectedCrypto.symbol)}
          theme="dark"
          locale="en"
          autosize
          hide_side_toolbar={false}
          allow_symbol_change={true}
          interval="D"
          toolbar_bg="#141413"
          enable_publishing={false}
          hide_top_toolbar={false}
          save_image={false}
          container_id="tradingview_chart"
        />
      </div>
    </div>
  );
};

export default CryptoChart;
