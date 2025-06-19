import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target } from 'lucide-react'; // Example icon

interface SavingsGoalCardProps {
  title: string;
  currentAmount: number;
  targetAmount: number;
  description?: string;
  onViewDetails?: () => void; // Optional action
}

const SavingsGoalCard: React.FC<SavingsGoalCardProps> = ({
  title,
  currentAmount,
  targetAmount,
  description,
  onViewDetails,
}) => {
  const progressPercentage = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;

  console.log("Rendering SavingsGoalCard:", title);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Target className="h-6 w-6 text-green-600" />
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm">
          <span className="font-semibold">${currentAmount.toFixed(2)}</span> saved of ${targetAmount.toFixed(2)}
        </div>
        <Progress value={progressPercentage} aria-label={`${progressPercentage.toFixed(0)}% towards ${title}`} />
      </CardContent>
      {onViewDetails && (
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={onViewDetails}>
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default SavingsGoalCard;