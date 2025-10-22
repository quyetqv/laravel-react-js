// Two-factor is disabled. Provide a minimal hook that returns empty/no-op
// functions so components that import it will not break.
export const OTP_MAX_LENGTH = 6;

export const useTwoFactorAuth = () => ({
    qrCodeSvg: null as string | null,
    manualSetupKey: null as string | null,
    recoveryCodesList: [] as string[],
    hasSetupData: false,
    errors: [] as string[],
    clearErrors: () => {},
    clearSetupData: () => {},
    fetchQrCode: async () => {},
    fetchSetupKey: async () => {},
    fetchSetupData: async () => {},
    fetchRecoveryCodes: async () => {},
});
