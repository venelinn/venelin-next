import { Hero } from "./Hero";

export const HeroConnector = (props) => {
  return (
    <Hero
      id={props?.id}
      media={props?.media}
      heading={props?.heading}
      subHeading={props?.subHeading}
      description={props?.description}
      links={props?.links}
      theme={props?.theme.theme}
      hasHue={props?.hasHue}
      hasOverlay={props?.hasOverlay}
      random={props?.random}
      social={props?.social}
    />
  );
};
