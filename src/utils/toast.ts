/**
 * Utility to dispatch a portfolio-wide custom success/error toast.
 */
export const showToast = (message: string, type: "success" | "error" = "success") => {
  const event = new CustomEvent("portfolio-toast", { detail: { message, type } });
  window.dispatchEvent(event);
};
