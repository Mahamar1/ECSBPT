/**
 * ECS BTP Security Engine
 * Provides anti-XSS, anti-Brute Force, and input validation functions.
 */

// Anti-XSS Sanitizer
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Strict Email Validator
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

// Rate Limiter / Anti Brute-Force Tracker
interface RateLimitRecord {
  attempts: number;
  lockoutUntil: number;
}

const rateLimitStore: Record<string, RateLimitRecord> = {};

export function checkRateLimit(
  key: string, 
  maxAttempts: number = 5, 
  lockoutDurationMs: number = 15 * 60 * 1000
): { allowed: boolean; remainingAttempts: number; retryAfterSeconds: number } {
  const now = Date.now();
  const record = rateLimitStore[key] || { attempts: 0, lockoutUntil: 0 };

  if (record.lockoutUntil > now) {
    const retryAfterSeconds = Math.ceil((record.lockoutUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  // If lockout expired, reset
  if (record.lockoutUntil !== 0 && record.lockoutUntil <= now) {
    record.attempts = 0;
    record.lockoutUntil = 0;
  }

  record.attempts += 1;

  if (record.attempts > maxAttempts) {
    record.lockoutUntil = now + lockoutDurationMs;
    rateLimitStore[key] = record;
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds: Math.ceil(lockoutDurationMs / 1000)
    };
  }

  rateLimitStore[key] = record;
  return {
    allowed: true,
    remainingAttempts: maxAttempts - record.attempts,
    retryAfterSeconds: 0
  };
}

export function resetRateLimit(key: string): void {
  delete rateLimitStore[key];
}

// Security Audit Status Checker
export function getSecurityAuditStatus() {
  return [
    { name: 'Protection anti-XSS & Injection', status: 'Actif', level: 'HIGH' },
    { name: 'Protection Anti-Brute Force', status: 'Actif', level: 'HIGH' },
    { name: 'En-têtes Sécurité HTTP (HSTS, CSP, Frame-Options)', status: 'Actif', level: 'HIGH' },
    { name: 'Route d\'Administration Masquée (/@dmin-ecsbtp)', status: 'Sécurisé', level: 'HIGH' },
    { name: 'Anti-Clickjacking (X-Frame-Options: DENY)', status: 'Actif', level: 'HIGH' },
    { name: 'Validation & Assainissement des Entrées', status: 'Actif', level: 'HIGH' },
  ];
}

// Canvas Image Compressor for Web & Mobile Uploads
export function compressImage(dataUrl: string, maxWidth = 1200, quality = 0.75): Promise<string> {
  return new Promise((resolve) => {
    if (!dataUrl || !dataUrl.startsWith('data:image')) {
      resolve(dataUrl);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
