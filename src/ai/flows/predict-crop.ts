// This file is machine-generated, DO NOT EDIT.
'use server';

/**
 * @fileOverview Predicts the most suitable crop based on environmental parameters.
 *
 * - predictCrop - A function that predicts the most suitable crop.
 * - PredictCropInput - The input type for the predictCrop function.
 * - PredictCropOutput - The return type for the predictCrop function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictCropInputSchema = z.object({
  nitrogen: z.number().describe('Nitrogen content in the soil (mg/kg).'),
  potassium: z.number().describe('Potassium content in the soil (mg/kg).'),
  phosphorus: z.number().describe('Phosphorus content in the soil (mg/kg).'),
  temperature: z.number().describe('Temperature in Celsius.'),
  humidity: z.number().describe('Humidity (%).'),
  ph: z.number().describe('pH value of the soil.'),
  rainfall: z.number().describe('Rainfall in mm.'),
});
export type PredictCropInput = z.infer<typeof PredictCropInputSchema>;

const PredictCropOutputSchema = z.object({
  crop: z.string().describe('The predicted most suitable crop to grow.'),
  confidence: z.number().describe('Confidence score of the prediction (0-1).'),
  rationale: z.string().describe('The rational for the prediction based on the parameters given.'),
});
export type PredictCropOutput = z.infer<typeof PredictCropOutputSchema>;

export async function predictCrop(input: PredictCropInput): Promise<PredictCropOutput> {
  return predictCropFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictCropPrompt',
  input: {schema: PredictCropInputSchema},
  output: {schema: PredictCropOutputSchema},
  prompt: `You are an expert agricultural advisor. Given the following soil and climate parameters, predict the most suitable crop to grow. Also, provide a confidence score (0-1) for your prediction and a rationale for why you chose that crop.

Nitrogen: {{{nitrogen}}} mg/kg
Potassium: {{{potassium}}} mg/kg
Phosphorus: {{{phosphorus}}} mg/kg
Temperature: {{{temperature}}} Celsius
Humidity: {{{humidity}}} %
pH: {{{ph}}}
Rainfall: {{{rainfall}}} mm

Format your response as a JSON object with 'crop', 'confidence', and 'rationale' keys.
`,
});

const predictCropFlow = ai.defineFlow(
  {
    name: 'predictCropFlow',
    inputSchema: PredictCropInputSchema,
    outputSchema: PredictCropOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
