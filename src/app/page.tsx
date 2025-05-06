import { CropPredictionForm } from "@/components/crop-prediction-form";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 lg:p-24 bg-background">
      <header className="w-full max-w-4xl mb-8 text-center">
        <div className="flex justify-center items-center mb-4">
           <Image src="https://picsum.photos/100/100" alt="CropWise Logo" width={80} height={80} className="rounded-full" data-ai-hint="agriculture farming" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary mb-2">
          CropWise
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          AI-Powered Crop Prediction for Smarter Farming
        </p>
      </header>

      <CropPredictionForm />

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} CropWise. All rights reserved. Built with AI.
      </footer>
    </main>
  );
}
