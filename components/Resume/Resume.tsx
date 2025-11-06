import cx from "clsx";
import { Fade, Zoom } from "react-awesome-reveal";
import { Icon } from "@/components/Icon";
import { FormattedDate } from "@/utils/DateFormat";
import styles from "./Resume.module.scss";

type Job = {
  id: string;
  company: string;
  position: string;
  start: string;
  end: string;
  description: string;
};

interface ResumeProps {
  jobs: Job[];
}

export const Resume = ({ jobs }: ResumeProps) => (
  <>
    <div className={styles.timeline}>
      <div className={styles.resume__header}>
        <div className={styles.timeline__exp}>Work Experience</div>
      </div>
      <div className={styles.timeline__wrap}>
        <Fade triggerOnce direction="up">
          {jobs?.map((job) => (
            <div key={job.id} className={cx(styles.timeline__block, !job.position && "hidden")}>
              <Zoom delay={200}>
                <div className={styles.timeline__ico}>
                  <Icon icon="bag" />
                </div>
              </Zoom>

              <div className={styles.timeline__header}>
                <div className={styles.timeline__pos}>{job.position}</div>

                <p>
                  <FormattedDate dateStr={job.start} />
                  {" – "}
                  {job.end ? <FormattedDate dateStr={job.end} /> : "Current"}
                </p>
              </div>
              <div className={styles.timeline__content}>
                <div className={styles.timeline__company}>{job.company}</div>
                <p>{job.description}</p>
              </div>
            </div>
          ))}
        </Fade>
      </div>
    </div>
    <Fade triggerOnce direction="up">
      <div className={styles.timeline}>
        <div className={styles.resume__header}>
          <div className={styles.timeline__exp}>Education</div>
        </div>
        <div className={styles.timeline__wrap}>
          <div className={styles.timeline__block}>
            <Zoom delay={200}>
              <div className={styles.timeline__ico}>
                <Icon icon="graduation" />
              </div>
            </Zoom>
            <div className={styles.timeline__header}>
              <div className={styles.timeline__pos}>Bachelor Degree</div>
              <p>Sept 1998 - June 2001</p>
            </div>
            <div className={styles.timeline__content}>
              <div className={styles.timeline__company}>Computer science</div>
              <p>Technical University of Sofia, Bulgaria</p>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  </>
);
