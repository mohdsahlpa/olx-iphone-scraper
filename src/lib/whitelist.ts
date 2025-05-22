
// For demonstration purposes, add emails here.
// In a real application, this would likely come from a secure database or configuration.

const devEmail = process.env.NEXT_PUBLIC_ALLOWED_DEV_EMAIL;
const userEmail = process.env.NEXT_PUBLIC_ALLOWED_USER_EMAIL;

const potentialEmails: (string | undefined)[] = [
  devEmail,
  userEmail,
];

// Filter out undefined or empty strings to ensure only valid emails are included.
export const whitelistedEmails: string[] = potentialEmails.filter(
  (email): email is string => typeof email === 'string' && email.trim() !== ''
);

// Optional: Log during server startup if environment variables are not set, for easier debugging.
// These logs will appear in the terminal where your Next.js server is running.
if (typeof window === 'undefined') { // This condition ensures logging happens only on the server-side during build/startup.
  if (!devEmail) {
    console.warn("WHITELIST_CONFIG: Environment variable NEXT_PUBLIC_ALLOWED_DEV_EMAIL is not set. It will not be included in the whitelist.");
  }
  if (!userEmail) {
    console.warn("WHITELIST_CONFIG: Environment variable NEXT_PUBLIC_ALLOWED_USER_EMAIL is not set. It will not be included in the whitelist.");
  }
  
  if (whitelistedEmails.length === 0) {
    console.warn("WHITELIST_CONFIG: No emails are currently whitelisted (based on NEXT_PUBLIC_ALLOWED_DEV_EMAIL and NEXT_PUBLIC_ALLOWED_USER_EMAIL). Access to the dashboard will be denied for all users unless these are set.");
  } else {
    console.log("WHITELIST_CONFIG: Server-side view of whitelisted emails (from NEXT_PUBLIC_ variables):", whitelistedEmails);
  }
}
