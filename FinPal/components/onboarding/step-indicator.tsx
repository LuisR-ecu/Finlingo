interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold transition-colors ${
              step === currentStep
                ? "bg-primary text-primary-foreground"
                : step < currentStep
                  ? "bg-success text-success-foreground"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {step < currentStep ? "✓" : step}
          </div>
          {step < totalSteps && (
            <div className={`h-1 w-12 transition-colors ${step < currentStep ? "bg-success" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  )
}
