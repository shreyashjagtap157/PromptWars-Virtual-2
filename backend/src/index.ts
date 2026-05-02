import express from 'express';
import cors, { type CorsOptions } from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import processRoutes from './routes/processRoutes';
import translateRoutes from './routes/translateRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';
import { requestContext } from './middlewares/requestContext';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === 'production';

function collectAllowedOrigins(): Set<string> {
    const origins = new Set<string>([
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3001',
    ]);

    for (const rawValue of [process.env.CORS_ORIGIN, process.env.FRONTEND_URL, process.env.NEXT_PUBLIC_SITE_URL]) {
        if (!rawValue) {
            continue;
        }

        for (const value of rawValue.split(',')) {
            const trimmedValue = value.trim();
            if (!trimmedValue) {
                continue;
            }

            try {
                origins.add(new URL(trimmedValue).origin);
            } catch {
                origins.add(trimmedValue);
            }
        }
    }

    return origins;
}

const allowedOrigins = collectAllowedOrigins();

const corsOptions: CorsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
            callback(null, true);
            return;
        }

        callback(null, false);
    },
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
    exposedHeaders: ['X-Request-Id', 'X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
    maxAge: 600,
};

// Security Hardening
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https://*"],
            connectSrc: ["'self'", "https://nominatim.openstreetmap.org", "https://*.googleapis.com", "https://www.google-analytics.com"],
        },
    },
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/', limiter); // Apply to API routes
app.set('trust proxy', 1);

app.use(requestContext);
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

app.get('/healthz', (_req, res) => {
    res.json({
        status: 'ok',
        uptime: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
    });
});

app.use('/auth', authRoutes);
app.use('/process', processRoutes);
app.use('/translate', translateRoutes);
app.use('/user', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
