import { ReactNode } from "react";
import { UserRow } from "../../utils/types";
import styles from "../../styles/user-cell.module.css";

export interface UserCellProps {
  user: UserRow;
  showEmail?: boolean;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function UserCell({
  user,
  showEmail = true,
  className = "",
}: UserCellProps): ReactNode {
  const containerClass = `${styles.userCell} ${className}`.trim();

  return (
    <div className={containerClass}>
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={`${user.name}'s avatar`}
          className={styles.avatar}
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) {
              fallback.style.display = "flex";
            }
          }}
        />
      ) : null}
      <div
        className={styles.avatarFallback}
        style={{ display: user.avatarUrl ? "none" : "flex" }}
      >
        {getInitials(user.name)}
      </div>
      <div className={styles.userContent}>
        <p className={styles.userName}>{user.name}</p>
        {showEmail && <p className={styles.userEmail}>{user.email}</p>}
      </div>
    </div>
  );
}
