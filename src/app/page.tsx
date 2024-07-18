"use client";
import { useState } from "react";
import MetaMaskOnboarding from '@metamask/onboarding';
import styles from "./page.module.css";

export default function Home() {
    const [isKeepKeyConnected, setIsKeepKeyConnected] = useState(false);
    const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
    const [result, setResult] = useState("");
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

    const callEthMethod = async (method, params = []) => {
        try {
            const result = await window.ethereum.request({
                method: method,
                params: params
            });
            setResult(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(`Error performing ${method}:`, error);
            setResult(`Error performing ${method}: ${error.message}`);
        }
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

            <div className={styles.methodContainer}>
                <div className={styles.methodBox}>
                    <p>eth_chainId</p>
                    <button onClick={() => callEthMethod('eth_chainId')}>Get eth_chainId</button>
                </div>
                <div className={styles.methodBox}>
                    <p>net_version</p>
                    <button onClick={() => callEthMethod('net_version')}>Get net_version</button>
                </div>
                <div className={styles.methodBox}>
                    <p>eth_accounts</p>
                    <button onClick={() => callEthMethod('eth_accounts')}>Get eth_accounts</button>
                </div>
                <div className={styles.methodBox}>
                    <p>eth_getBlockByNumber</p>
                    <button onClick={() => callEthMethod('eth_getBlockByNumber', ['latest', true])}>Get eth_getBlockByNumber</button>
                </div>
                <div className={styles.methodBox}>
                    <p>eth_blockNumber</p>
                    <button onClick={() => callEthMethod('eth_blockNumber')}>Get eth_blockNumber</button>
                </div>
                <div className={styles.methodBox}>
                    <p>eth_getBalance</p>
                    <button onClick={() => callEthMethod('eth_getBalance', ['0xYourAccountAddress', 'latest'])}>Get eth_getBalance</button>
                </div>
                <div className={styles.methodBox}>
                    <p>eth_getTransactionReceipt</p>
                    <button onClick={() => callEthMethod('eth_getTransactionReceipt', ['0xYourTransactionHash'])}>Get eth_getTransactionReceipt</button>
                </div>
                <div className={styles.methodBox}>
                    <p>eth_getTransactionByHash</p>
                    <button onClick={() => callEthMethod('eth_getTransactionByHash', ['0xYourTransactionHash'])}>Get eth_getTransactionByHash</button>
                </div>
            </div>

            <div className={styles.resultContainer}>
                <pre className={styles.resultBox}>{result}</pre>
            </div>
        </main>
    );
}
