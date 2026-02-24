import { Container } from "react-bootstrap";
import BlockOverview from "./BlockOverview";

const BlocksPage = () => {
  return (
    <div className="blocks-page">
      <Container className="webpage blocks-page-overview" fluid>
        <div className="blocksPageSurface">
          <div className="blocksPageMain">
            <div className="blocksPageCard">
              <div className="cardHeroBackground dashboardHeroBackground" aria-hidden="true">
                <div className="hero_aurora">
                  <div className="hero_aurora-inner" />
                </div>
                <div className="hero_aurora is-blured">
                  <div className="hero_aurora-inner" />
                </div>
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
              <BlockOverview lines={10} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlocksPage;