'use client';

// AdminGuard is no longer needed for auth checks since middleware handles it securely.
// We keep it as a transparent wrapper to avoid breaking imports in layout.tsx.
export default function AdminGuard({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
