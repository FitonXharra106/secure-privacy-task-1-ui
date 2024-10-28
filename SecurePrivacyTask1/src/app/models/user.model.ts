/**
 * Represents a user in the application.
 */
export interface User {
  /**
   * Unique identifier for the user (optional).
   */
  id?: string;

  /**
   * The user's first name.
   */
  firstName: string;

  /**
   * The user's last name.
   */
  lastName: string;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * Indicates whether the user has given consent.
   */
  consentGiven: boolean;

  /**
   * The date when the user was created (optional).
   */
  createdAt?: Date;
}
