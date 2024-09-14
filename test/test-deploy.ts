import { ethers } from "hardhat"
import { expect, assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"
import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import hre from "hardhat";

describe("SimpleStorage", function () {
    let simpleStorageFactory: SimpleStorage__factory
    let simpleStorage: SimpleStorage
    beforeEach(async function () {
        simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as unknown as SimpleStorage__factory
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number = 0", async () => {
        const currentFavoriteNum = await simpleStorage.retrieve()
        const expectedValue = "0"

        // The 2 following lines are equivalent ways to write an assertion
        assert.equal(currentFavoriteNum.toString(), expectedValue)
        expect(currentFavoriteNum.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async () => {
        const expectedValue = "8"

        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentFavoriteNum = await simpleStorage.retrieve()

        assert.equal(currentFavoriteNum.toString(), expectedValue)
    })
})