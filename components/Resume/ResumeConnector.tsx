import { Resume } from "./Resume";

export const ResumeConnector = (props) => {
  return <Resume jobs={props?.modules} />;
};
