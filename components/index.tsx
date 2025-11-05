import { AboutConnector } from "./About";
import { HeroConnector } from "./Hero";
import { PortfolioConnector } from "./Portfolio";
// import { Contacts } from "./Contacts";

// Map components which are dynamically resolved by content type in the CMS
export const componentMap = {
  intro: HeroConnector,
  about: AboutConnector,
  portfolioList: PortfolioConnector,
  // contacts: Contacts,
};
