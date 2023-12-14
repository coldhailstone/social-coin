import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import InNav from './navigators/InNav';
import OutNav from './navigators/OutNav';

const queryClient = new QueryClient();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>{isLoggedIn ? <InNav /> : <OutNav />}</NavigationContainer>
        </QueryClientProvider>
    );
}
