import { Fade } from "react-awesome-reveal";
import { renderRichTextContent } from "@/utils/RichText";

// import styles from "./About.module.scss";

interface AboutProps {
  content: any;
}

export const About = ({ content }: AboutProps) => {
  return (
    <Fade triggerOnce delay={500}>
      {renderRichTextContent(content)}
    </Fade>
  );
};
