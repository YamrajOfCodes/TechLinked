import { LeaderboardUser } from "@/app/(home)/leaderboard/page";
import getInitials from "./GetInitials";

const Avatar = ({
  user,
  size = 40,
  ringColor,
}: {
  user: LeaderboardUser;
  size?: number;
  ringColor?: string;
}) => {
  const initials = getInitials(user.name);

  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--app-surface-2)] font-semibold text-[var(--app-text-primary)]"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        boxShadow: ringColor
          ? `0 0 0 2px var(--app-surface), 0 0 0 4px ${ringColor}`
          : undefined,
      }}
    >
      {user.profilePhoto ? (
        <img
          src={user.profilePhoto}
          alt={user.name}
          className="h-full w-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}

export default Avatar;