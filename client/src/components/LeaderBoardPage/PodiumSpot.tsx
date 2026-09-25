import { Crown, Star } from "lucide-react";
import Avatar from "./Avtar";
import { LeaderboardUser } from "@/app/(home)/leaderboard/page";

const pedestal = {
  1: {
    height: 150,
    color: "#ffb84d",
  },
  2: {
    height: 110,
    color: "#A9B4BE",
  },
  3: {
    height: 80,
    color: "#C08552",
  },
} as const;


const PodiumSpot = ({
  user,
  place,
}: {
  user: LeaderboardUser;
  place: 1 | 2 | 3;
}) => {
  const { height, color } = pedestal[place];

  const avatarSize = place === 1 ? 72 : 56;

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center sm:w-44 sm:flex-none">
      <div className="relative">
        {place === 1 && (
          <Crown
            size={22}
            className="absolute -top-7 left-1/2 -translate-x-1/2"
            style={{
              color,
            }}
            fill={color}
          />
        )}

        <Avatar
          user={user}
          size={avatarSize}
          ringColor={color}
        />
      </div>

      <div className="mt-3 w-full text-center">
        <div className="truncate text-xs font-semibold text-[var(--app-text-primary)] sm:text-sm">
          {user.name}
        </div>

        <div className="mt-1 truncate text-xs text-[var(--app-text-muted)]">
          {user.college}
        </div>
      </div>

      <div className="mt-2 rounded-full bg-[var(--app-background)] px-3 py-1 text-xs font-semibold tabular-nums text-[var(--app-text-primary)]">
        {user.impactPoints.toLocaleString()}

        <span className="ml-1 font-normal text-[var(--app-text-muted)]">
          pts
        </span>
      </div>

      <div
        className="relative mt-4 w-full max-w-[9rem]"
        style={{
          height,
        }}
      >
        <div
          className="absolute inset-x-0 bottom-0 top-3 rounded-b-[50%/12px]"
          style={{
            background: `linear-gradient(
              90deg,
              ${color}55 0%,
              ${color}cc 45%,
              ${color}55 100%
            )`,
          }}
        />

        <div
          className="absolute inset-x-0 top-0 h-6 rounded-[50%]"
          style={{
            background: `linear-gradient(
              180deg,
              ${color}ee,
              ${color}99
            )`,
          }}
        />

        <div
          className="absolute left-1/2 top-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[#0F1720]"
          style={{
            backgroundColor: color,
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          }}
        >
          <Star
            size={16}
            fill="currentColor"
          />
        </div>

        <span className="absolute inset-x-0 bottom-4 text-center text-2xl font-bold tabular-nums text-[#0F1720]/70">
          {place}
        </span>
      </div>
    </div>
  );
}

export default PodiumSpot;