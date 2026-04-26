export declare class AuthService {
    static register(email: string, password?: string): Promise<{
        uid: string;
        token: string;
    }>;
    static login(email: string, password?: string): Promise<{
        uid: string;
        token: string;
    }>;
}
//# sourceMappingURL=AuthService.d.ts.map