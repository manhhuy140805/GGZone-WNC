/**
 * Logger utility for development and production
 * In production, logs can be disabled via environment variable
 */

const isDevelopment = import.meta.env.DEV;
const isLoggingEnabled = import.meta.env.VITE_ENABLE_LOGGING !== 'false';

class Logger {
  private shouldLog(): boolean {
    return isDevelopment || isLoggingEnabled;
  }

  log(...args: any[]): void {
    if (this.shouldLog()) {
      console.log(...args);
    }
  }

  error(...args: any[]): void {
    if (this.shouldLog()) {
      console.error(...args);
    }
  }

  warn(...args: any[]): void {
    if (this.shouldLog()) {
      console.warn(...args);
    }
  }

  info(...args: any[]): void {
    if (this.shouldLog()) {
      console.info(...args);
    }
  }

  debug(...args: any[]): void {
    if (this.shouldLog()) {
      console.debug(...args);
    }
  }
}

export const logger = new Logger();
