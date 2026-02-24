import { Container } from "react-bootstrap";
import TxOverview from "./TxOverview";

const TxPage = () => {
  return (
    <div className="blocks-page">
      <Container className="webpage blocks-page-overview" fluid>
        <div className="pageSurface">
          <TxOverview font="normal" lines={40} />
        </div>
      </Container>
    </div>
  );
};

export default TxPage;