import { Portfolio } from "./Portfolio";

export const PortfolioConnector = (props) => {
  return <Portfolio items={props?.projects} />;
};
