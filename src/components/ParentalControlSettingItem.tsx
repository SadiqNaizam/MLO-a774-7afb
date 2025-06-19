import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

interface ParentalControlSettingItemProps {
  id: string;
  label: string;
  description?: string;
  isActive: boolean;
  onToggle: (id: string, isActive: boolean) => void;
  disabled?: boolean;
}

const ParentalControlSettingItem: React.FC<ParentalControlSettingItemProps> = ({
  id,
  label,
  description,
  isActive,
  onToggle,
  disabled = false,
}) => {
  console.log("Rendering ParentalControlSettingItem:", label, "Active:", isActive);

  const handleToggle = () => {
    if (!disabled) {
      onToggle(id, !isActive);
    }
  };

  return (
    <div className={cn(
        "flex items-center justify-between p-3 sm:p-4 rounded-lg border",
        disabled ? "opacity-70 bg-gray-50" : "bg-white hover:bg-gray-50 transition-colors"
      )}>
      <div className="space-y-0.5">
        <Label htmlFor={id} className={cn("text-sm font-medium", disabled ? "cursor-not-allowed" : "cursor-pointer")}>
          {label}
        </Label>
        {description && (
          <p className="text-xs text-gray-500">
            {description}
          </p>
        )}
      </div>
      <Switch
        id={id}
        checked={isActive}
        onCheckedChange={handleToggle}
        disabled={disabled}
        aria-label={label}
      />
    </div>
  );
};

export default ParentalControlSettingItem;