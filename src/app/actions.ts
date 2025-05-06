// src/app/actions.ts
"use server";

import { predictCrop, type PredictCropInput, type PredictCropOutput } from "@/ai/flows/predict-crop";
import { z } from "zod";

const PredictCropFormSchema = z.object({
  nitrogen: z.coerce.number().min(0, "Nitrogen must be non-negative"),
  potassium: z.coerce.number().min(0, "Potassium must be non-negative"),
  phosphorus: z.coerce.number().min(0, "Phosphorus must be non-negative"),
  temperature: z.coerce.number(), // No specific range for now, adjust if needed
  humidity: z.coerce.number().min(0, "Humidity must be non-negative").max(100, "Humidity cannot exceed 100"),
  ph: z.coerce.number().min(0, "pH must be non-negative").max(14, "pH cannot exceed 14"),
  rainfall: z.coerce.number().min(0, "Rainfall must be non-negative"),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  prediction?: PredictCropOutput;
  status: "idle" | "loading" | "success" | "error";
};

export async function handlePredictCrop(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = Object.fromEntries(formData.entries());

  const validationResult = PredictCropFormSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    const fieldErrors: Record<string, string> = {};
    validationResult.error.errors.forEach((err) => {
      if (err.path[0]) {
        fieldErrors[err.path[0]] = err.message;
      }
    });
    return {
      message: "Invalid form data. Please check the fields.",
      fields: fieldErrors,
      status: "error",
    };
  }

  const validatedData: PredictCropInput = validationResult.data;

  try {
    const prediction = await predictCrop(validatedData);
    return {
      message: "Prediction successful!",
      prediction: prediction,
      status: "success",
    };
  } catch (error) {
    console.error("AI Prediction Error:", error);
    return {
      message: "Failed to get prediction. Please try again later.",
      status: "error",
    };
  }
}
