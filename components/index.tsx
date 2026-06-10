import dynamic from "next/dynamic";
import { HeroConnector } from "./Hero";

const AboutConnector = dynamic(() =>
  import("./About").then((mod) => mod.AboutConnector),
);
const PortfolioConnector = dynamic(() =>
  import("./Portfolio").then((mod) => mod.PortfolioConnector),
);
const Contacts = dynamic(() =>
  import("./Contacts").then((mod) => mod.Contacts),
);
const ResumeConnector = dynamic(() =>
  import("./Resume").then((mod) => mod.ResumeConnector),
);

export const componentMap = {
  intro: HeroConnector,
  about: AboutConnector,
  portfolioList: PortfolioConnector,
  contacts: Contacts,
  experienceList: ResumeConnector,
};
