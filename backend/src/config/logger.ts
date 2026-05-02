import winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';

// Google Cloud Logging uses 'severity' instead of 'level'
const severityLevels: Record<string, string> = {
  error: 'ERROR',
  warn: 'WARNING',
  info: 'INFO',
  http: 'INFO',
  verbose: 'DEBUG',
  debug: 'DEBUG',
  silly: 'DEBUG',
};

const gcpFormat = winston.format((info) => {
  return {
    ...info,
    severity: severityLevels[info.level] || 'INFO',
  };
});

export const logger = winston.createLogger({
  level: isProduction ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    gcpFormat(),
    isProduction ? winston.format.json() : winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
  ],
});
