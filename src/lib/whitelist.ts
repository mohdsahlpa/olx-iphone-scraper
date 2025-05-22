
// For demonstration purposes, add emails here.
// In a real application, this would likely come from a secure database or configuration.

const devEmail = process.env.ALLOWED_DEV_EMAIL;
const userEmail = process.env.ALLOWED_USER_EMAIL;

const potentialEmails: (string | undefined)[] = [
  devEmail,
  userEmail,
  // You can add other emails directly to this array if needed, e.g., "admin@example.com"
];

// Filter out undefined or empty strings to ensure only valid emails are included.
export const whitelistedEmails: string[] = potentialEmails.filter(
  (email): email is string => typeof email === 'string' && email.trim() !== ''
);

// Optional: Log during server startup if environment variables are not set, for easier debugging.
// These logs will appear in the terminal where your Next.js server is running.
if (typeof window === 'undefined') { // Run only on server-side
  if (!devEmail) {
    console.warn("WHITELIST_CONFIG: Environment variable ALLOWED_DEV_EMAIL is not set. It will not be included in the whitelist.");
  }
  if (!userEmail) {
    console.warn("WHITELIST_CONFIG: Environment variable ALLOWED_USER_EMAIL is not set. It will not be included in the whitelist.");
  }
  if (whitelistedEmails.length === 0) {
    console.warn("WHITELIST_CONFIG: No emails are currently whitelisted. Access to the dashboard will be denied for all users.");
  } else {
    console.log("WHITELIST_CONFIG: Current whitelisted emails:", whitelistedEmails);
  }
}
