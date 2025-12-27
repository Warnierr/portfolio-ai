"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Ne pas traquer les routes admin
        if (pathname.startsWith("/admin")) return;

        const track = async () => {
            try {
                await fetch("/api/analytics", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        page: pathname,
                        referrer: document.referrer,
                    }),
                });
            } catch (e) {
                // Silent fail for analytics
            }
        };

        track();
    }, [pathname]);

    return null;
}
