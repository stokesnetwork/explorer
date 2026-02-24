import { useEffect, useState } from "react";
import moment from "moment";
import { numberWithCommas } from "../helper.ts";
import {
  getBlockdagInfo,
  getCoinSupply,
  getBlockReward,
  getHalving,
  getHashrate,
  getFeeEstimate,
  getKaspadInfo,
} from "../kaspa-api-client";
import { STOKES_UNIT } from "../explorer_constants";

const DashboardStatsTiles = () => {
  const [blockCount, setBlockCount] = useState(null);
  const [circulating, setCirculating] = useState(null);
  const [maxSupply, setMaxSupply] = useState(null);
  const [blockReward, setBlockReward] = useState(null);
  const [nextHalvingDate, setNextHalvingDate] = useState(null);
  const [hashrateTh, setHashrateTh] = useState(null);
  const [mempoolSize, setMempoolSize] = useState(null);
  const [normalFee, setNormalFee] = useState(null);

  useEffect(() => {
    const load = async () => {
      const results = await Promise.allSettled([
        getBlockdagInfo(),
        getCoinSupply(),
        getBlockReward(),
        getHalving(),
        getHashrate(),
        getFeeEstimate(),
        getKaspadInfo(),
      ]);

      const blockdag = results[0].status === "fulfilled" ? results[0].value : null;
      const coinsupply = results[1].status === "fulfilled" ? results[1].value : null;
      const reward = results[2].status === "fulfilled" ? results[2].value : null;
      const halving = results[3].status === "fulfilled" ? results[3].value : null;
      const hashrate = results[4].status === "fulfilled" ? results[4].value : null;
      const feeEstimate = results[5].status === "fulfilled" ? results[5].value : null;
      const kaspad = results[6].status === "fulfilled" ? results[6].value : null;

      setBlockCount(blockdag?.blockCount ?? null);

      const circ = coinsupply?.circulatingSupply
        ? Number(coinsupply.circulatingSupply) / 100000000
        : null;
      const max = coinsupply?.maxSupply
        ? Number(coinsupply.maxSupply) / 100000000
        : null;
      setCirculating(Number.isFinite(circ) ? circ : null);
      setMaxSupply(Number.isFinite(max) ? max : null);

      setBlockReward(
        reward?.blockreward !== undefined && reward?.blockreward !== null
          ? Number(reward.blockreward)
          : null,
      );

      setNextHalvingDate(
        halving?.nextHalvingTimestamp
          ? moment(Number(halving.nextHalvingTimestamp) * 1000).format(
              "YYYY-MM-DD HH:mm:ss UTC",
            )
          : halving?.nextHalvingDate ?? null,
      );

      setHashrateTh(
        hashrate?.hashrate !== undefined && hashrate?.hashrate !== null
          ? Number(hashrate.hashrate)
          : null,
      );

      setMempoolSize(
        kaspad?.mempoolSize !== undefined && kaspad?.mempoolSize !== null
          ? Number(kaspad.mempoolSize)
          : null,
      );

      const fee = feeEstimate?.normalBuckets?.[0]?.feerate;
      setNormalFee(fee !== undefined && fee !== null ? Number(fee) : null);
    };

    load();
  }, []);

  const minedPct =
    circulating !== null && maxSupply !== null && maxSupply > 0
      ? (circulating / maxSupply) * 100
      : null;

  const tiles = [
    {
      label: "Total blocks",
      value: blockCount ? numberWithCommas(blockCount) : "-",
    },
    {
      label: "Circulating supply",
      value:
        circulating !== null
          ? `${numberWithCommas(Math.round(circulating))} ${STOKES_UNIT}`
          : "-",
    },
    {
      label: "Mined",
      value: minedPct !== null ? `${minedPct.toFixed(2)} %` : "-",
    },
    {
      label: "Hashrate",
      value: hashrateTh !== null ? `${hashrateTh.toFixed(1)} TH/s` : "-",
    },
    {
      label: "Mempool size",
      value: mempoolSize !== null ? numberWithCommas(mempoolSize) : "-",
    },
    {
      label: "Normal fee",
      value: normalFee !== null ? `${numberWithCommas(normalFee)} sompi/gram` : "-",
    },
    {
      label: "Block reward",
      value:
        blockReward !== null ? `${blockReward.toFixed(2)} ${STOKES_UNIT}` : "-",
    },
    {
      label: "Reward reduction",
      value: nextHalvingDate ?? "-",
    },
  ];

  return (
    <div className="dashboardStatsTilesGrid">
      {tiles.map((t) => (
        <div key={t.label} className="dashboardStatsTile">
          <div className="dashboardStatsTileLabel">{t.label}</div>
          <div className="dashboardStatsTileValue">{t.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStatsTiles;
