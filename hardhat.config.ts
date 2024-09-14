import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers"
import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-verify"
import "dotenv/config"
import "./tasks/blockNumber"
import "hardhat-gas-reporter"
import "solidity-coverage"

const RPC_URL_SEPOLIA = process.env.RPC_URL_SEPOLIA
const RPC_URL_HOLESKY = process.env.RPC_URL_HOLESKY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const API_KEY_ETHERSCAN = process.env.API_KEY_ETHERSCAN
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: RPC_URL_SEPOLIA,
            accounts: [PRIVATE_KEY!],
            chainId: 11155111,
        },
        holesky: {
            url: RPC_URL_HOLESKY,
            accounts: [PRIVATE_KEY!],
            chainId: 17000,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            accounts: [
                "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
            ],
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: {
            sepolia: API_KEY_ETHERSCAN!,
            holesky: API_KEY_ETHERSCAN!,
        },
        customChains: [
            {
                network: "sepolia",
                chainId: 11155111,
                urls: {
                    apiURL: "https://api-sepolia.etherscan.io/api",
                    browserURL: "https://sepolia.etherscan.io",
                },
            },
            {
                network: "holesky",
                chainId: 17000,
                urls: {
                    apiURL: "https://api-holesky.etherscan.io/api",
                    browserURL: "https://holesky.etherscan.io/",
                },
            },
        ],
    },
    gasReporter: {
        enabled: true,
        outputFile: "./reports/gas-report.txt",
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        L1: "ethereum",
        token: "ETH",
        L1Etherscan: API_KEY_ETHERSCAN,
    },
    sourcify: {
        enabled: false,
    },
    solidity: "0.8.24",
}

export default config;
