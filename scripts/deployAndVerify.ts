import { HardhatEthersProvider } from "@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider"
import { ethers, run, network } from "hardhat"

async function main() {
    const simpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying contract...")
    const simpleStorage = await simpleStorageFactory.deploy()

    await simpleStorage.waitForDeployment()
    const sSAddress = await simpleStorage.getAddress()
    console.log(`Deployed contract to: ${sSAddress}`)

    if (network.config.chainId === 17000 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deploymentTransaction()?.wait(2)
        await verify(sSAddress, [])
    }

    // Interact with the contract, store a favorite number and retrieve
    const currentFavoriteNumber = await simpleStorage.retrieve()
    console.log(`Current favorite Number: ${currentFavoriteNumber.toString()}`)

    const transactionResponse = await simpleStorage.store("7")
    const transactionRececipt = await transactionResponse.wait(1)
    const updatedFavoriteNumber = await simpleStorage.retrieve()
    console.log(`Updated favorite Number: ${updatedFavoriteNumber.toString()}`)
}

async function verify(contractAddress: string, args: any[]) {
    console.log(`Verifying contract ${contractAddress} ...`)
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
