import { useState, useEffect } from 'react';

interface Position {
    latitude: number | null;
    longitude: number | null;
}

interface GeolocationState extends Position {
    error: string | null;
    loading: boolean;
}

const useGeolocation = (): GeolocationState => {
    const [position, setPosition] = useState<Position>({ latitude: null, longitude: null });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const updatePosition = (position: GeolocationPosition) => {
        setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
        setLoading(false)
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(updatePosition, () => {
                setError('Unable to retrieve your location')
                setLoading(false)
            });
        }
    }, []);

    return { ...position, error, loading };
};

export default useGeolocation;
