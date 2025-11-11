/**
 debounce delays function execution until the user stops triggering it for a certain time — super useful for auto-save, search etc

 * - When called repeatedly, it resets a timer each time.
 * - The actual function only runs after the delay once calls stop.
 eg:
  debounce(saveToLocalStorage, 2000)
 => Waits 2 seconds after user stops changing something, then saves once.
 */

// TypeScript generic fun type
export const debounce = <T extends (...args: unknown[]) => void>( 
  func: T,  // Function to control
  delay: number  // Delay in milliseconds
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>; // To store timeout reference

  return (...args: Parameters<T>) => {
     // Clear previous timer if function called again
    clearTimeout(timeoutId);
      // Start a new timer — function will run after delay
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
