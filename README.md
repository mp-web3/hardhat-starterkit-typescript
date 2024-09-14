# hardhat-starterkit-typescript
This is an advanced hardhat starterkit written in typescript to: deploy contracts, verify contracts, test the code + and maybe the most important prepare everything you need to test a frontend

## Tasks

### typechain

typechain is a tool that is able to create types for all of our contracts, and therefore to correctly
call the functions we need in our tests, scripts, etc...

#### using typechain

To install typechain (we are using the `@typechain/hardhat` package) if it is not yet installed:

```
yarn add --dev @typechain/hardhat
```

Then we need to import it into `hardhat.config.ts`

Finally we can run `yarn hardhat` you'll see that `typechain` was added to the `Tasks` with the following description: 
- `typechain`: Generate Typechain typings for compiled contracts

Now to generate the typing run:
```
yarn hardhat typechain
```

All of the types are generated inside a newly created folder `typechain-types`, which contains types for all of our contracts
