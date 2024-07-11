"use client";
import { useState, useEffect } from "react";
import MetaMaskOnboarding from '@metamask/onboarding';
import styles from "./page.module.css";

export default function Home() {
    const [isKeepKeyConnected, setIsKeepKeyConnected] = useState(false);
    const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
    const onboarding = new MetaMaskOnboarding();

    const handleMetaMaskConnect = async () => {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            setIsMetaMaskConnected(accounts && accounts.length > 0);
        } catch (error) {
            console.error(error);
        }
    };

    const handleMetaMaskInstall = () => {
        onboarding.startOnboarding();
    };

    const handleKeepKeyConnect = () => {
        // Placeholder for actual logic to connect KeepKey
        setIsKeepKeyConnected(true); // Simulated connection
    };

    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <button
                    onClick={MetaMaskOnboarding.isMetaMaskInstalled() ? handleMetaMaskConnect : handleMetaMaskInstall}
                    disabled={isMetaMaskConnected}
                >
                    {MetaMaskOnboarding.isMetaMaskInstalled()
                        ? isMetaMaskConnected
                            ? "MetaMask Connected"
                            : "Connect MetaMask"
                        : "Install MetaMask"}
                </button>

                <button
                    onClick={handleKeepKeyConnect}
                    disabled={isKeepKeyConnected}
                >
                    {isKeepKeyConnected ? "KeepKey Connected" : "Connect KeepKey"}
                </button>
            </div>

            <div className={styles.statusContainer}>
                <div className={styles.statusBox}>
                    <p>isKeepKeyConnected: {isKeepKeyConnected.toString()}</p>
                </div>
                <div className={styles.statusBox}>
                    <p>isMetaMaskConnected: {isMetaMaskConnected.toString()}</p>
                </div>
            </div>
        </main>
    );
}
