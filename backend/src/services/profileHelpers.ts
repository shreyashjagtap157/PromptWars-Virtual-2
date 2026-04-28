export interface StoredProfile {
    email?: string;
    selectedRegion: string;
    selectedState: string;
    selectedDistrict: string;
    preferredLanguage: string;
    progress: Record<string, string>;
    createdAt: string;
    updatedAt?: string;
}

export function createDefaultProfile(email?: string): StoredProfile {
    return {
        ...(email ? { email } : {}),
        selectedRegion: 'general',
        selectedState: '',
        selectedDistrict: '',
        preferredLanguage: 'en-US',
        progress: {},
        createdAt: new Date().toISOString(),
    };
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function mergeProfileDefaults(profile?: Partial<StoredProfile> | null): StoredProfile {
    const defaults = createDefaultProfile(profile?.email);

    return {
        ...defaults,
        ...(profile || {}),
        email: typeof profile?.email === 'string' ? profile.email : defaults.email,
        selectedRegion: typeof profile?.selectedRegion === 'string' ? profile.selectedRegion : defaults.selectedRegion,
        selectedState: typeof profile?.selectedState === 'string' ? profile.selectedState : defaults.selectedState,
        selectedDistrict: typeof profile?.selectedDistrict === 'string' ? profile.selectedDistrict : defaults.selectedDistrict,
        preferredLanguage: typeof profile?.preferredLanguage === 'string' ? profile.preferredLanguage : defaults.preferredLanguage,
        progress: isRecord(profile?.progress) ? (profile.progress as Record<string, string>) : {},
        createdAt: typeof profile?.createdAt === 'string' ? profile.createdAt : defaults.createdAt,
        updatedAt: typeof profile?.updatedAt === 'string' ? profile.updatedAt : undefined,
    };
}

export function isAlreadyExistsError(error: unknown): boolean {
    const maybeError = error as { code?: number | string; message?: string } | undefined;

    return maybeError?.code === 6
        || maybeError?.code === 'already-exists'
        || maybeError?.code === 'ALREADY_EXISTS'
        || (typeof maybeError?.message === 'string' && maybeError.message.toLowerCase().includes('already exists'))
        || (typeof maybeError?.message === 'string' && maybeError.message.includes('ALREADY_EXISTS'));
}