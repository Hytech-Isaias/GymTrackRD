import { Check, Info, Trash2 } from "lucide-react";
import { cn } from "../../lib/utils";

export interface TrackerItemProps {
  title: string;
  sets: number | string;
  reps: number | string;
  completed: boolean;
  onToggle: () => void;
  onInfo?: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
}

const TrackerItem = ({
  title,
  sets,
  reps,
  completed,
  onToggle,
  onInfo,
  onDelete,
  isEditing = false,
}: TrackerItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-md border transition-all cursor-pointer group hover:bg-surface-secondary",
        completed && !isEditing
          ? "bg-secondary/10 border-secondary/20"
          : "bg-surface-secondary/30 border-surface-border hover:border-primary/50",
        isEditing && "cursor-default hover:border-error/50"
      )}
      onClick={!isEditing ? onToggle : undefined}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox / Status Indicator */}
        <div
          className={cn(
            "w-5 h-5 rounded border flex items-center justify-center transition-colors shadow-sm",
            completed
              ? "bg-secondary border-secondary"
              : "border-text-tertiary group-hover:border-primary",
            isEditing && "opacity-50 grayscale"
          )}
        >
          {completed && <Check className="w-3 h-3 text-white" />}
        </div>

        <div>
          <p
            className={cn(
              "text-sm font-medium transition-colors",
              completed && !isEditing
                ? "text-text-tertiary line-through"
                : "text-text-secondary group-hover:text-text-primary"
            )}
          >
            {title}
          </p>
          <div className="text-xs text-text-tertiary flex gap-2">
            <span>{sets} sets</span>
            <span>•</span>
            <span>{reps} reps</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {/* Info Button - always visible now */}
        {onInfo && !isEditing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInfo();
            }}
            className="p-2 text-text-tertiary hover:text-primary hover:bg-surface-tertiary rounded-lg transition-all"
            title="View details"
          >
            <Info size={18} />
          </button>
        )}

        {/* Delete Button - only in edit mode */}
        {isEditing && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 text-text-tertiary hover:text-error hover:bg-error/10 rounded-lg transition-all"
            title="Remove exercise"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export { TrackerItem };
