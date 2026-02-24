import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Modal, Row, Spinner} from 'react-bootstrap';
import {useNavigate} from 'react-router';
import './App.scss';
import BalanceModal from './components/BalanceModal';
import BlockDAGBox from './components/BlockDAG';
import BlockOverview from './components/BlockOverview';
import CoinsupplyBox from './components/CoinsupplyBox';
import DashboardStatsTiles from './components/dashboardStatsTiles';
import MarketDataBox from './components/MarketDataBox';
import TxOverview from './components/TxOverview';
import {getBlock} from './kaspa-api-client';
import {ADDRESS_PREFIX, SUFFIX} from "./explorer_constants";


function Dashboard() {

    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showLoadingModal, setShowLoadingModal] = useState(false)

    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState(ADDRESS_PREFIX);

    const search = (e) => {
        e.preventDefault();
        const v = e.target.searchInput.value

        setShowLoadingModal(true);

        if (v.length == 64) {
            getBlock(v).then(
                data => {
                    if (data.detail == "Block not found") {
                        navigate(`/txs/${v}`)
                    } else {
                        navigate(`/blocks/${v}`)
                    }
                }
            ).catch((err) => {
            })
        }

        if (v.startsWith(ADDRESS_PREFIX)) {
            navigate(`/addresses/${v}`)
        }

        setShowLoadingModal(false);

    }


    //<Button variant="primary">Go!</Button>
    return (
        <div className="dashboardPage">
            <Modal show={showLoadingModal} animation={false} centered>
                <Modal.Body className="dashboardModalBody">
                    <Spinner animation="border" variant="primary" size="xl"/></Modal.Body>
            </Modal>
            <Container className="webpage" fluid>
                <div className="dashboardHero pageSurface">
                    <div className="dashboardHeroBackground" aria-hidden="true">
                        <div className="hero_aurora"><div className="hero_aurora-inner"/></div>
                        <div className="hero_aurora is-blured"><div className="hero_aurora-inner"/></div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            viewBox="0 0 622 705"
                            fill="none"
                            className="hero_light"
                        >
                            <path
                                d="M311 0L621.037 704.25H0.962891L311 0Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <div className="dashboardHeroLeft">
                        <div className="dashboardTitle">
                            <div className="bigfont">
                                STOKES<br/>EXPLORER{SUFFIX}
                            </div>
                            <div className="dashboardSubtitle">
                                Search blocks and addresses.
                            </div>
                        </div>
                        <Form onSubmit={search}>
                            <InputGroup className="dashboardSearch">
                                <Form.Control className="bg-light text-dark shadow-none" name="searchInput"
                                              type="text" placeholder={`Search for ${ADDRESS_PREFIX}address or block`}/>
                                <Button type="submit" className="shadow-none searchButton" variant="dark"><i
                                    className='fa fa-search'/></Button>
                            </InputGroup>
                        </Form>
                    </div>
                </div>

                <div className="dashboardSection">
                    <div className="pageSurface dashboardStatCard">
                        <DashboardStatsTiles/>
                    </div>
                </div>

                {/* <div className="dashboardContentGrid">
                    <div className="pageSurface dashboardContentCard">
                        <BlockOverview lines={12} small/>
                    </div>
                    <div className="pageSurface dashboardContentCard">
                        <TxOverview lines={12}/>
                    </div>
                </div> */}
            </Container>
            <BalanceModal handleClose={handleClose} show={show} address={address} balance={balance}/>
        </div>

    );
}

export default Dashboard;
