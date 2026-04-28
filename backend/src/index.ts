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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

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

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(requestContext);
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

    if (process.env.NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
    }

    next();
});
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
