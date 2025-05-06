// src/components/crop-prediction-form.tsx
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { handlePredictCrop, type FormState } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SubmitButton } from "@/components/submit-button";
import { PredictionResultCard } from "@/components/prediction-result-card";
import { AlertCircle, Droplets, Leaf, Sun, Thermometer, TestTube, CloudRain, Loader2 } from "lucide-react"; // Added Loader2
import { useToast } from "@/hooks/use-toast";


const initialFormState: FormState = {
  message: "",
  status: "idle",
};

export function CropPredictionForm() {
  const [formState, formAction, isPending] = useActionState(handlePredictCrop, initialFormState); // Updated hook and added isPending
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (formState.status === "success") {
      // toast({
      //   title: "Success!",
      //   description: formState.message,
      // });
      setShowResult(true);
      // Optionally reset form fields if needed
      // formRef.current?.reset();
    } else if (formState.status === "error" && formState.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: formState.message,
      });
      setShowResult(false); // Hide previous results on error
    }
  }, [formState, toast]);

   const renderFieldError = (fieldName: keyof NonNullable<FormState["fields"]>) => { // Made fields explicitly non-nullable for lookup
     if (formState.fields?.[fieldName]) {
       return <p className="text-xs text-destructive mt-1">{formState.fields[fieldName]}</p>;
     }
     return null;
   };

  return (
    <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Enter Parameters</CardTitle>
          <CardDescription>Provide the environmental details to predict the best crop.</CardDescription>
        </CardHeader>
        <form ref={formRef} action={formAction}>
          <CardContent className="space-y-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nitrogen */}
              <div className="space-y-2">
                <Label htmlFor="nitrogen" className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" /> Nitrogen (mg/kg)
                </Label>
                <Input id="nitrogen" name="nitrogen" type="number" step="any" placeholder="e.g., 90" required aria-describedby="nitrogen-error" />
                {renderFieldError("nitrogen")}
              </div>

              {/* Potassium */}
              <div className="space-y-2">
                <Label htmlFor="potassium" className="flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-conical text-primary"><path d="M10.2 2.2c-.1.1-.3.4-.5.9s-.4 1-.5 1.6c-.1.5-.2 1.1-.2 1.8 0 .4.1.7.1 1 .1.3.1.6.2.8.1.2.2.4.3.6s.2.4.3.5c.1.2.2.4.3.5s.2.3.2.4c.1.1.2.2.2.3.6 1 1.3 1.8 2.1 2.4.8.6 1.5 1 2.3 1.2.8.2 1.6.3 2.4.3.6 0 1.2-.1 1.8-.2.6-.1 1.1-.3 1.6-.6.5-.3.9-.6 1.3-1 .4-.4.7-.8 1-1.3s.5-.9.6-1.4c.1-.5.2-1.1.2-1.6 0-.8-.1-1.6-.3-2.4-.2-.8-.5-1.6-1-2.3s-1.1-1.4-1.7-1.9c-.6-.5-1.3-1-2-1.4S14 2.3 13.2 2c-.8-.2-1.6-.3-2.4-.3-.6 0-1.2.1-1.8.2-.4.1-.7.2-1 .4-.3.2-.6.4-.9.6-.3.2-.6.5-.8.8z"/><path d="M20.8 15c-.3-.3-.5-.6-.8-.8s-.5-.5-.8-.7c-.3-.3-.5-.5-.8-.7s-.5-.4-.8-.6c-.3-.2-.5-.4-.8-.5s-.5-.2-.8-.3c-.3-.1-.5-.1-.8-.1h-1.4c-.4 0-.7.1-1.1.1s-.7.1-1.1.2c-.4.1-.7.2-1.1.3s-.7.3-1.1.5c-.4.2-.7.4-1.1.6-.4.2-.7.5-1.1.8s-.7.6-1.1 1c-.4.4-.7.8-1 1.3s-.5 1-.7 1.5c-.2.5-.3 1-.4 1.5s-.1 1-.1 1.5c0 .6.1 1.1.1 1.6.1.5.2 1 .3 1.5.1.5.3 1 .4 1.5.1.5.3.9.4 1.4.1.4.3.9.5 1.3s.4.8.6 1.1c.2.3.5.6.8.8.3.2.6.4.9.6.3.2.7.4 1 .5.3.1.7.2 1 .3.3.1.7.1 1 .1h1.4c.4 0 .7-.1 1.1-.1s.7-.1 1.1-.2c.4-.1.7-.2 1.1-.3s.7-.3 1.1-.5c.4-.2.7-.4 1.1-.6.4-.2.7-.5 1.1-.8s.7-.6 1.1-1c.4-.4.7-.8 1-1.3s.5-1 .7-1.5c.2-.5.3-1 .4-1.5s.1-1 .1-1.5c0-.6-.1-1.1-.1-1.6-.1-.5-.2-1-.3-1.5-.1-.5-.3-1-.4-1.5-.1-.5-.3-.9-.4-1.4-.1-.4-.3-.9-.5-1.3s-.4-.8-.6-1.1c-.2-.3-.5-.6-.8-.8s-.6-.4-.9-.6c-.3-.2-.7-.4-1-.5-.3-.1-.7-.2-1-.3-.3-.1-.7-.1-1-.1z"/></svg>
                   Potassium (mg/kg)
                 </Label>
                <Input id="potassium" name="potassium" type="number" step="any" placeholder="e.g., 42" required aria-describedby="potassium-error" />
                {renderFieldError("potassium")}
              </div>

               {/* Phosphorus */}
              <div className="space-y-2">
                <Label htmlFor="phosphorus" className="flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-round text-primary"><path d="M10 2v7.31"/><path d="M14 9.31V2"/><path d="M3 13h18"/><path d="M14 13a4 4 0 0 1-4 4 4 4 0 0 1-4-4"/><path d="M6 13a4 4 0 0 0 4 4 4 4 0 0 0 4-4h0V9a6 6 0 0 0-12 0v4"/></svg>
                   Phosphorus (mg/kg)
                </Label>
                <Input id="phosphorus" name="phosphorus" type="number" step="any" placeholder="e.g., 53" required aria-describedby="phosphorus-error" />
                 {renderFieldError("phosphorus")}
              </div>

               {/* Temperature */}
              <div className="space-y-2">
                 <Label htmlFor="temperature" className="flex items-center gap-2">
                   <Thermometer className="w-4 h-4 text-primary" /> Temperature (°C)
                 </Label>
                 <Input id="temperature" name="temperature" type="number" step="any" placeholder="e.g., 20.5" required aria-describedby="temperature-error" />
                 {renderFieldError("temperature")}
              </div>

               {/* Humidity */}
              <div className="space-y-2">
                <Label htmlFor="humidity" className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-primary" /> Humidity (%)
                </Label>
                <Input id="humidity" name="humidity" type="number" step="any" placeholder="e.g., 82" required aria-describedby="humidity-error" />
                {renderFieldError("humidity")}
              </div>

               {/* pH */}
              <div className="space-y-2">
                <Label htmlFor="ph" className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-primary" /> pH
                </Label>
                <Input id="ph" name="ph" type="number" step="0.1" placeholder="e.g., 6.5" required aria-describedby="ph-error" />
                {renderFieldError("ph")}
              </div>

               {/* Rainfall */}
              <div className="space-y-2">
                <Label htmlFor="rainfall" className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-primary" /> Rainfall (mm)
                </Label>
                <Input id="rainfall" name="rainfall" type="number" step="any" placeholder="e.g., 200" required aria-describedby="rainfall-error" />
                {renderFieldError("rainfall")}
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-end">
            {/* Pass isPending to SubmitButton */}
            <SubmitButton className="bg-primary hover:bg-primary/90 text-primary-foreground" pending={isPending}>
              <Sun className="mr-2 h-4 w-4" /> Predict Crop
            </SubmitButton>
          </CardFooter>
        </form>
      </Card>

      <div className="flex flex-col items-center justify-center space-y-4">
         {/* Use isPending instead of formState.status === 'loading' */}
         {isPending && (
             <div className="flex flex-col items-center text-muted-foreground">
               <Loader2 className="h-12 w-12 animate-spin text-primary" />
               <p className="mt-2 text-lg font-medium">Predicting...</p>
               <p className="text-sm">Analyzing parameters to find the best crop.</p>
             </div>
         )}
         {showResult && formState.prediction && !isPending && ( // Ensure result is not shown while pending
           <PredictionResultCard prediction={formState.prediction} />
         )}
         {!showResult && !isPending && ( // Ensure placeholder is not shown while pending
              <Card className="w-full h-full flex flex-col items-center justify-center bg-muted/50 border-dashed border-2 p-8 text-center">
                  <Leaf className="w-16 h-16 text-muted-foreground mb-4" />
                  <CardTitle className="text-xl text-muted-foreground">Awaiting Prediction</CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground">
                      Enter the environmental parameters and click "Predict Crop" to see the AI's suggestion.
                  </CardDescription>
              </Card>
          )}
      </div>
    </div>
  );
}
