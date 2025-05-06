// src/components/prediction-result-card.tsx
import type { PredictCropOutput } from "@/ai/flows/predict-crop";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PredictionResultCardProps {
  prediction: PredictCropOutput;
}

export function PredictionResultCard({ prediction }: PredictionResultCardProps) {
  const confidenceLevel = prediction.confidence * 100;
  let confidenceColor = "bg-green-500"; // Default to high confidence color

  if (confidenceLevel < 75 && confidenceLevel >= 50) {
    confidenceColor = "bg-yellow-500"; // Medium confidence
  } else if (confidenceLevel < 50) {
    confidenceColor = "bg-red-500"; // Low confidence
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Prediction Result</CardTitle>
        <CardDescription>Based on the provided parameters, the suggested crop is:</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
           <p className="text-4xl font-extrabold text-accent">{prediction.crop}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
           <span className="text-sm font-medium text-muted-foreground">Confidence:</span>
           <Badge className={cn("text-primary-foreground", confidenceColor)}>
             {confidenceLevel.toFixed(1)}%
           </Badge>
        </div>

        <div>
           <h4 className="text-lg font-semibold mb-2">Rationale:</h4>
           <p className="text-sm text-muted-foreground">{prediction.rationale}</p>
        </div>
      </CardContent>
    </Card>
  );
}
