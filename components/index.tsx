import { AboutConnector } from "./About";
import { Contacts } from "./Contacts";
import { HeroConnector } from "./Hero";
import { PortfolioConnector } from "./Portfolio";
import { ResumeConnector } from "./Resume";

// Map components which are dynamically resolved by content type in the CMS
export const componentMap = {
  intro: HeroConnector,
  about: AboutConnector,
  portfolioList: PortfolioConnector,
  contacts: Contacts,
  experienceList: ResumeConnector,
};
