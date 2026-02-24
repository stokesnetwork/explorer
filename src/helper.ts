import { useEffect, useRef } from "react";

export function numberWithCommas(num: unknown): string {
  const [integerPart, fractionalPart] = (num ?? "").toString().split(".");

  if (!integerPart) return "0";

  const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart ? `${withCommas}.${fractionalPart}` : withCommas;
}

export function floatToStr(floatNo: number, maxPrecision = 8): string {
  return parseFloat(floatNo.toPrecision(maxPrecision)).toString();
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default usePrevious;
