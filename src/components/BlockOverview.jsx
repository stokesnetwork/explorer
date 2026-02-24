import moment from "moment";
import {useContext, useEffect, useRef, useState} from "react";
import {FaDiceD20, FaPause, FaPlay} from 'react-icons/fa';
import LastBlocksContext from "./LastBlocksContext";
import { Link } from "react-router-dom";

const BlockOverview = (props) => {
    const {blocks, isConnected} = useContext(LastBlocksContext);
    const [tempBlocks, setTempBlocks] = useState([]);
    const [keepUpdating, setKeepUpdating] = useState(true);

    const keepUpdatingRef = useRef()
    keepUpdatingRef.current = keepUpdating


    useEffect(() => {
        if (keepUpdatingRef.current) {
            setTempBlocks(blocks);
        }
    }, [blocks])

    const visibleBlocks = Array.isArray(tempBlocks)
        ? [...tempBlocks]
            .sort((a, b) => (Number(b?.blueScore) || 0) - (Number(a?.blueScore) || 0))
            .slice(0, props.lines)
        : [];

    return <div className="block-overview">
        <div className="blockOverviewHeaderRow">
            {/* <div className="blockOverviewHeaderControl">
                {!keepUpdating ? <FaPlay id="play-button" className="play-button" onClick={() => setKeepUpdating(true)}/> :
                    <FaPause id="pause-button" className="play-button" onClick={() => setKeepUpdating(false)}/>}
            </div> */}
            
                <h4 className="block-overview-header text-center"> Latest Processed Blocks</h4>
                <div className="dashboardSubtitle" style={{marginBottom: "2rem"}}>
                    Blocks are arriving with a speed of 1 block per second
                </div>           
            <div />
        </div>

        <div className="block-overview-content">
            <table className={`styled-table w-100`}>
                <thead>
                <tr>
                    <th>Timestamp</th>
                    {props.small ? <></> : <th>BlueScore</th>}
                    <th>TXs</th>
                    <th width="100%">Hash</th>
                </tr>
                </thead>
                <tbody>
                {
                    visibleBlocks.map((x) => (
                        <Link key={x?.block_hash ?? `${x?.blueScore ?? ""}-${x?.timestamp ?? ""}`}
                              to={`/blocks/${x?.block_hash}`}
                              className="table-row-link-styled">
                            <td className="table-timestamp table-cell">
                                {x?.timestamp ? moment(parseInt(x.timestamp)).format("HH:mm:ss") : "-"}
                            </td>
                            {props.small ? <></> : <td>{x?.blueScore ?? "-"}</td>}
                            <td className="table-cell">{x?.txCount ?? "-"}</td>
                            <td className="hashh table-cell blockHashLink">{x?.block_hash ?? "-"}</td>
                        </Link>
                    ))
                }
                </tbody>
            </table>
        </div>
    </div>

}

export default BlockOverview;