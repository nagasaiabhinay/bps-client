import React, { ReactElement } from 'react';

function useMultiStepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

    const next = () => {
        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    };

    const back = () => {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
    };

    const goTo = (index: number) => {
        if (index >= 0 && index < steps.length) {
            setCurrentStepIndex(index);
        }
    };

    return {
        currentStepIndex, // current step index
        step: steps[currentStepIndex], // current step component
        steps, // all steps
        isFirstStep: currentStepIndex === 0, // is first step
        isLastStep: currentStepIndex === steps.length - 1, // is last step
        goTo, // go to step by index
        next, // go to next step
        back, // go to previous step
    };
}

export default useMultiStepForm;
