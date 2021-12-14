import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { useEffect, useRef, useState } from 'react';
import { useSkin } from '../../utility/hooks/useSkin';

const Chart = ({ chartId, height }) => {

  const [skin] = useSkin();
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);

  const sdk = new ChartsEmbedSDK({ baseUrl: 'https://charts.mongodb.com/charts-sep6-oxpfy' });

  const chartOptions = {
    chartId,
    height,
    showAttribution: false,
    background: skin === 'dark' ? '#283046' : '#fff',
    theme: skin === 'dark' ? 'dark' : 'light'
  }

  const [chart, buildChart] = useState(sdk.createChart(chartOptions));

  const callback = () => {
    if (document.body.classList.contains('dark-layout')) {
      const chart = sdk.createChart({chartId, height, showAttribution: false, background: '#283046', theme: 'dark'});
      buildChart(chart);
    } else {
      const chart = sdk.createChart({chartId, height, showAttribution: false, background: '#fff', theme: 'light'});
      buildChart(chart);
    }
  }

  const mutationObserver = new MutationObserver(callback)

  useEffect(() => {
    mutationObserver.observe(
      document.body,
      { attributes: 'dark-layout' }
    )
    return () => mutationObserver.disconnect();
  }, [])

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(!rendered)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);

  return <div ref={chartDiv}/>;
}

export default Chart