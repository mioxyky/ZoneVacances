"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type CalendarYearContextValue = {
  currentYear: number;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean | ((current: boolean) => boolean)) => void;
  mobileDrawerContentTarget: HTMLElement | null;
  setMobileDrawerContentTarget: (target: HTMLElement | null) => void;
};

const CalendarYearContext = createContext<CalendarYearContextValue | null>(null);

export function CalendarYearProvider({
  children,
  currentYear,
}: {
  children: ReactNode;
  currentYear: number;
}) {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDrawerContentTarget, setMobileDrawerContentTarget] = useState<HTMLElement | null>(null);
  const value = useMemo(
    () => ({
      currentYear,
      selectedYear,
      setSelectedYear,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      mobileDrawerContentTarget,
      setMobileDrawerContentTarget,
    }),
    [currentYear, isMobileMenuOpen, mobileDrawerContentTarget, selectedYear],
  );

  return <CalendarYearContext.Provider value={value}>{children}</CalendarYearContext.Provider>;
}

export function useCalendarYear() {
  const value = useContext(CalendarYearContext);
  if (!value) throw new Error("useCalendarYear must be used within CalendarYearProvider");
  return value;
}
