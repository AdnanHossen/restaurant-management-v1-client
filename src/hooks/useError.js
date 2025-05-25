const getAuthToastMessage = (error) => {
  const toastMessages = {
    // Common auth errors
    "auth/invalid-email": "Please enter a valid email address",
    "auth/user-disabled":
      "This account has been disabled. Contact support for help.",
    "auth/user-not-found": "No account found with this email",
    "auth/wrong-password":
      "Incorrect password. Try again or reset your password.",
    "auth/email-already-in-use":
      "This email is already registered. Try logging in instead.",
    "auth/weak-password": "Password must be at least 6 characters",
    "auth/operation-not-allowed": "Login method not enabled. Contact support.",

    // Network/request errors
    "auth/network-request-failed":
      "Network error. Check your connection and try again.",
    "auth/too-many-requests":
      "Too many attempts. Try again later or reset your password.",

    // Google popup errors
    "auth/popup-closed-by-user":
      "Login cancelled. Please complete the popup to continue.",
    "auth/cancelled-popup-request":
      "Login process was interrupted. Please try again.",
    "auth/popup-blocked": "Popup blocked! Allow popups for this site to login.",
    "auth/unauthorized-domain": "Login not allowed from this domain.",

    // Account conflicts
    "auth/account-exists-with-different-credential":
      "Account already exists with different login method. Try signing in with that method.",

    // Token/verification errors
    "auth/invalid-credential":
      "Your login session is invalid. Please login again.",
    "auth/invalid-verification-code": "Invalid verification code.",
    "auth/invalid-verification-id": "Verification failed. Please try again.",
    "auth/expired-action-code":
      "The action link has expired. Please request a new one.",

    // Special cases with enhanced messages
    "auth/requires-recent-login":
      "Security check required. Please sign in again to continue.",
  };

  // Enhanced message for account-exists with email
  if (
    error.code === "auth/account-exists-with-different-credential" &&
    error.email
  ) {
    return `An account already exists for ${error.email} with a different login method.`;
  }

  return (
    toastMessages[error.code] ||
    error.message ||
    "An unexpected error occurred. Please try again."
  );
};

// Optional: Export error severity levels
const getAuthErrorSeverity = (error) => {
  if (!error?.code) return "error";

  // Some errors are more "warning" than "error"
  const warningCodes = [
    "auth/popup-closed-by-user",
    "auth/cancelled-popup-request",
  ];

  return warningCodes.includes(error.code) ? "warning" : "error";
};

export { getAuthToastMessage, getAuthErrorSeverity };
