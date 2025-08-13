import './App.css'
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';
import Dashboard from './screens/dashboard/Dashboard';
import Home from './screens/home/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";  // Link
import { POST, SafeFetch } from './helpers/fetch';


import type { SilentRequest } from "@azure/msal-browser";


function App() {

    const { instance, accounts } = useMsal();

    const getSubdomain = (): string => {
        const x = window.location.hostname.split('.').splice(1, 1).join(".");
        return x == "" ? "dev" : x; 
    };

    const handleLogin = async () => {
        try {
            await instance.loginPopup(loginRequest);

            const account = instance.getAllAccounts()[0];
            if (!account) throw new Error("No account found after login");

            // Build a request object that includes the account
            const silentRequest: SilentRequest = {
                ...loginRequest,
                account,
                forceRefresh: true,
            };

            try {
                const result = await instance.acquireTokenSilent(silentRequest);

                await SafeFetch(
                    "api/StoreToken",
                    POST({ Token: result.accessToken, Tenant: getSubdomain() })
                );

                alert(result.accessToken );

                // loginNavigationFunction();
            } catch (silentError) {
                console.warn("Silent token failed, trying popup:", silentError);

                const popupResult = await instance.acquireTokenPopup({
                    ...loginRequest,
                    account,
                });

                await SafeFetch(
                    "api/StoreToken",
                    POST({ Token: popupResult.accessToken, Tenant: getSubdomain() })
                );

                // loginNavigationFunction();
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    };



    //const handleLogin = async (loginNavigationFunction: () => void) => {
    //    try {
    //        // Force user login to get a new session
    //        await instance.loginPopup(loginRequest);

    //        const account = instance.getAllAccounts()[0];
    //        if (!account) throw new Error("No account found after login");

    //        //loginRequest.account = account;

    //        // Build a request object that includes the account
    //        const silentRequest: SilentRequest = {
    //            ...loginRequest,
    //            account,
    //            forceRefresh: true,
    //        };


    //        // Try silent token acquisition
    //        let result;
    //        try {

    //            result = await instance.acquireTokenSilent({
    //                ...loginRequest,
    //                forceRefresh: true, // <-- important if cache might be stale
    //            });

    //            await SafeFetch("api/StoreToken", POST({ Token: result.accessToken, Tenant: getSubdomain() }));
    //            loginNavigationFunction();

    //        } catch (silentError) {
    //            // Silent token failed — fallback to popup
    //            console.warn("Silent token failed, trying popup:", silentError);
    //            result = await instance.acquireTokenPopup(loginRequest);
    //        }
    //    } catch (err) {
    //        console.error("Login failed:", err);
    //    }
    //}

    const handleLogout = async () => {
        instance.logoutPopup();
        await SafeFetch("api/RemoveToken", POST({}));

    };






    return (
        <div>

            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </BrowserRouter>

            {accounts.length > 0 ? (
                <>
                    <p>Welcome, {accounts[0].username}</p>
                    <button onClick = { handleLogout }>Logout</button>
                </>
            ) : (
                    <button onClick={handleLogin}>Login with Azure</button>
                )
            }
        </div >
    )
}

export default App
