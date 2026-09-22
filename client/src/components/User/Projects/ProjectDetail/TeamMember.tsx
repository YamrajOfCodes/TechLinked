import { MapPin, Trash2 } from "lucide-react";
import Avatar from "./Avatar";

function TeamMember({
  user,
  label,
  owner,
  handlePreRemoveMember,
}: {
  user: any;
  label: string;
  owner: boolean;
  handlePreRemoveMember: (id: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Avatar
          src={user.profilePhoto}
          name={`${user.FirstName} ${user.LastName}`}
        />

        <div>
          <p className="text-sm font-medium text-gray-900">
            {user.FirstName} {user.LastName}
          </p>

          <p className="text-xs text-gray-400">{label}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user.location && (
          <div className="hidden items-center gap-1 text-xs text-gray-400 sm:flex">
            <MapPin size={13} />
            {user.location}
          </div>
        )}

        {owner && (
          <button
            type="button"
            onClick={() => handlePreRemoveMember(user.id)}
            aria-label={`Remove ${user.FirstName} ${user.LastName}`}
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

export default TeamMember;