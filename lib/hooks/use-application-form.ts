"use client";

import { useReducer, useEffect, useCallback } from "react";
import type {
  ApplicationFormData,
  StepIndex,
} from "@/lib/schemas/application";

const STORAGE_KEY = "mww-application-draft";

interface FormState {
  currentStep: StepIndex;
  data: ApplicationFormData;
  completedSteps: boolean[];
}

type FormAction =
  | { type: "SET_STEP"; step: StepIndex }
  | { type: "UPDATE_DATA"; step: keyof ApplicationFormData; data: Record<string, unknown> }
  | { type: "MARK_COMPLETED"; step: number }
  | { type: "LOAD_DRAFT"; state: FormState };

const initialData: ApplicationFormData = {
  personalProfile: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    instagram: "",
    linkedin: "",
  },
  wellnessJourney: {
    wellnessPhilosophy: "",
    fitnessRoutine: "",
    dietaryApproach: "",
  },
  visionEssay: {
    essay: "",
  },
  reviewSubmit: {
    agreeTerms: false as unknown as true,
    agreePrivacy: false as unknown as true,
  },
};

const initialState: FormState = {
  currentStep: 0,
  data: initialData,
  completedSteps: [false, false, false, false],
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.step };
    case "UPDATE_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          [action.step]: {
            ...state.data[action.step],
            ...action.data,
          },
        },
      };
    case "MARK_COMPLETED": {
      const completed = [...state.completedSteps];
      completed[action.step] = true;
      return { ...state, completedSteps: completed };
    }
    case "LOAD_DRAFT":
      return action.state;
    default:
      return state;
  }
}

export function useApplicationForm(): {
  state: FormState;
  setStep: (step: StepIndex) => void;
  updateData: (step: keyof ApplicationFormData, data: Record<string, unknown>) => void;
  markCompleted: (step: number) => void;
  saveDraft: () => void;
  progress: number;
} {
  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as FormState;
        dispatch({ type: "LOAD_DRAFT", state: parsed });
      }
    } catch {
      // Ignore parse errors from corrupted localStorage
    }
  }, []);

  const saveDraft = useCallback((): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state]);

  const setStep = useCallback((step: StepIndex): void => {
    dispatch({ type: "SET_STEP", step });
  }, []);

  const updateData = useCallback(
    (step: keyof ApplicationFormData, data: Record<string, unknown>): void => {
      dispatch({ type: "UPDATE_DATA", step, data });
    },
    []
  );

  const markCompleted = useCallback((step: number): void => {
    dispatch({ type: "MARK_COMPLETED", step });
  }, []);

  const completedCount = state.completedSteps.filter(Boolean).length;
  const TOTAL_STEPS = 4;
  const progress = Math.round((completedCount / TOTAL_STEPS) * 100);

  return { state, setStep, updateData, markCompleted, saveDraft, progress };
}
