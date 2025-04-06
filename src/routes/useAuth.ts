import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("auth");
            if (!token) {
                setIsAuthenticated(false);
                navigate("/seller-center/login", { replace: true });
                return;
            }
            setIsAuthenticated(true);
        };

        checkAuth();

    }, [location, navigate]);

    return isAuthenticated;
};

export default useAuth;