import type { SocialType } from "../../types/types";
import { Icon, type IconName } from "../Icon";
import styles from "./Social.module.scss";

interface SocialProps {
  data: SocialType[];
}

export const Social = ({ data }: SocialProps) => {
  return (
    <div className={styles.social}>
      <ul className={styles.social__list}>
        {data.map((item) => (
          <li key={item.icon}>
            <a href={`${item.url}`} target="_blank" rel="noopener noreferrer" title={item.name}>
              <Icon icon={item.icon as IconName} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
