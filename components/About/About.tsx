import { Fade } from "react-awesome-reveal";
import { renderRichTextContent } from "@/utils/RichText";
import styles from "./About.module.scss";

interface AboutProps {
  content: any;
  theme: string;
}

export const About = ({ content, theme }: AboutProps) => {
  return (
    <Fade triggerOnce delay={500}>
      <div className="about__intro" data-theme={theme}>
        {renderRichTextContent(content)}
      </div>
    </Fade>
  );
};
