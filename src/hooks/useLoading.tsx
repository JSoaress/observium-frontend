import { useCallback, useState } from "react";

export const useLoading = (isLoading = false): [boolean, (cb: () => Promise<void>) => Promise<void>] => {
    const [loading, setLoading] = useState(isLoading);

    const suspend = useCallback(async (cb: () => Promise<void>) => {
        setLoading(true);
        try {
            await cb();
        } finally {
            setLoading(false);
        }
    }, []);

    return [loading, suspend];
};
