import { About } from "./About";

export const AboutConnector = (props) => {
  return <About content={props?.content} theme={props?.theme?.theme} />;
};
