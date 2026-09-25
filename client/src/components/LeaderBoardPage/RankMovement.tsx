import { Minus } from "lucide-react";

const RankMovement = ({
  rank,
}: {
  rank: number;
}) => {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-[var(--app-text-muted)]">
      <Minus size={12} />
      {rank}
    </span>
  );
}

export default RankMovement;