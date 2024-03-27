/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Assetify, AssetifyInterface } from "../Assetify";

const _abi = [
  {
    type: "function",
    name: "assetShares",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "assets",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "totalShares",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "sharesAvailable",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "pricePerShare",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "buyShares",
    inputs: [
      {
        name: "assetId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "sharesToBuy",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "createAsset",
    inputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "totalShares",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "pricePerShare",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAllAssets",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct Assetify.Asset[]",
        components: [
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "totalShares",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "sharesAvailable",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "pricePerShare",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "owner",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCurrentPrice",
    inputs: [
      {
        name: "assetId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserPortfolio",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserShares",
    inputs: [
      {
        name: "assetId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "sellShares",
    inputs: [
      {
        name: "assetId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "sharesToSell",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AssetCreated",
    inputs: [
      {
        name: "assetId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "name",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "totalShares",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "pricePerShare",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SharesPurchased",
    inputs: [
      {
        name: "assetId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "buyer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newPricePerShare",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SharesSold",
    inputs: [
      {
        name: "assetId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "seller",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newPricePerShare",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b5061109f8061001f6000396000f3fe6080604052600436106100865760003560e01c8063835dc40b11610059578063835dc40b14610126578063beebc5da14610154578063c2e35d4b14610167578063c55d0f561461019f578063cf35bdd0146101bf57600080fd5b80631edb27e91461008b5780632279a970146100c25780632acada4d146100e457806349ead9b414610106575b600080fd5b34801561009757600080fd5b506100ab6100a6366004610b4d565b6101f0565b6040516100b9929190610bab565b60405180910390f35b3480156100ce57600080fd5b506100e26100dd366004610bd9565b610331565b005b3480156100f057600080fd5b506100f9610507565b6040516100b99190610c41565b34801561011257600080fd5b506100e2610121366004610cf7565b61062f565b34801561013257600080fd5b50610146610141366004610dbb565b6107f8565b6040519081526020016100b9565b6100e2610162366004610bd9565b610845565b34801561017357600080fd5b50610146610182366004610dbb565b600160209081526000928352604080842090915290825290205481565b3480156101ab57600080fd5b506101466101ba366004610de7565b610a0b565b3480156101cb57600080fd5b506101df6101da366004610de7565b610a59565b6040516100b9959493929190610e00565b60008054606091829167ffffffffffffffff81111561021157610211610ce1565b60405190808252806020026020018201604052801561023a578160200160208202803683370190505b50600080549192509067ffffffffffffffff81111561025b5761025b610ce1565b604051908082528060200260200182016040528015610284578160200160208202803683370190505b50905060005b6000548110156103265760008181526001602090815260408083206001600160a01b038a1684529091529020541561031e57808382815181106102cf576102cf610e40565b60209081029190910181019190915260008281526001825260408082206001600160a01b038a1683529092522054825183908390811061031157610311610e40565b6020026020010181815250505b60010161028a565b509094909350915050565b600054821061035b5760405162461bcd60e51b815260040161035290610e56565b60405180910390fd5b600080838154811061036f5761036f610e40565b60009182526020808320868452600182526040808520338652909252922054600590910290910191508211156103e75760405162461bcd60e51b815260206004820152601760248201527f4e6f7420656e6f75676820736861726573206f776e65640000000000000000006044820152606401610352565b60008160030154836103f99190610e9a565b90508282600201600082825461040f9190610eb1565b909155505060008481526001602090815260408083203384529091528120805485929061043d908490610ec4565b909155505060018201546000906104549085610ed7565b60018401546104639084610ed7565b61046d9190610e9a565b9050808360030160008282546104839190610ec4565b9091555050604051339083156108fc029084906000818181858888f193505050501580156104b5573d6000803e3d6000fd5b50600383015460408051338152602081018790529081019190915285907fc84ba642853b7fceb52ece6998aa2618edc77f7a182996141f2a470af347cea3906060015b60405180910390a25050505050565b60606000805480602002602001604051908101604052809291908181526020016000905b8282101561062657838290600052602060002090600502016040518060a001604052908160008201805461055e90610ef9565b80601f016020809104026020016040519081016040528092919081815260200182805461058a90610ef9565b80156105d75780601f106105ac576101008083540402835291602001916105d7565b820191906000526020600020905b8154815290600101906020018083116105ba57829003601f168201915b505050918352505060018281015460208084019190915260028401546040840152600384015460608401526004909301546001600160a01b03166080909201919091529183529201910161052b565b50505050905090565b6000821161068e5760405162461bcd60e51b815260206004820152602660248201527f546f74616c20736861726573206d7573742062652067726561746572207468616044820152656e207a65726f60d01b6064820152608401610352565b600081116106f05760405162461bcd60e51b815260206004820152602960248201527f507269636520706572207368617265206d7573742062652067726561746572206044820152687468616e207a65726f60b81b6064820152608401610352565b6040805160a081018252848152602081018490529081018390526060810182905233608082015260008054600181018255908052815160059091027f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630190819061075a9082610f84565b5060208201516001828101919091556040830151600283015560608301516003830155608090920151600490910180546001600160a01b0319166001600160a01b039092169190911790556000805490916107b491610ec4565b9050807fa017cc32027fe26ea29fc5cf04e66882e07fd51f7283239ba15558b1f6489f338585856040516107ea93929190611044565b60405180910390a250505050565b60008054831061081a5760405162461bcd60e51b815260040161035290610e56565b5060008281526001602090815260408083206001600160a01b03851684529091529020545b92915050565b60005482106108665760405162461bcd60e51b815260040161035290610e56565b600080838154811061087a5761087a610e40565b9060005260206000209060050201905080600201548211156108de5760405162461bcd60e51b815260206004820152601b60248201527f4e6f7420656e6f7567682073686172657320617661696c61626c6500000000006044820152606401610352565b60008160030154836108f09190610e9a565b9050803410156109385760405162461bcd60e51b8152602060048201526013602482015272139bdd08195b9bdd59da08115512081cd95b9d606a1b6044820152606401610352565b8282600201600082825461094c9190610ec4565b909155505060008481526001602090815260408083203384529091528120805485929061097a908490610eb1565b909155505060018201546000906109919085610ed7565b60018401546109a09034610ed7565b6109aa9190610e9a565b9050808360030160008282546109c09190610eb1565b9091555050600383015460408051338152602081018790529081019190915285907fce81571c08c76465bdf390ad1abe80af8c51c6c4566e3485f9395f13d5ad6328906060016104f8565b600080548210610a2d5760405162461bcd60e51b815260040161035290610e56565b60008281548110610a4057610a40610e40565b9060005260206000209060050201600301549050919050565b60008181548110610a6957600080fd5b9060005260206000209060050201600091509050806000018054610a8c90610ef9565b80601f0160208091040260200160405190810160405280929190818152602001828054610ab890610ef9565b8015610b055780601f10610ada57610100808354040283529160200191610b05565b820191906000526020600020905b815481529060010190602001808311610ae857829003601f168201915b50505050600183015460028401546003850154600490950154939491939092506001600160a01b031685565b80356001600160a01b0381168114610b4857600080fd5b919050565b600060208284031215610b5f57600080fd5b610b6882610b31565b9392505050565b60008151808452602080850194506020840160005b83811015610ba057815187529582019590820190600101610b84565b509495945050505050565b604081526000610bbe6040830185610b6f565b8281036020840152610bd08185610b6f565b95945050505050565b60008060408385031215610bec57600080fd5b50508035926020909101359150565b6000815180845260005b81811015610c2157602081850181015186830182015201610c05565b506000602082860101526020601f19601f83011685010191505092915050565b600060208083018184528085518083526040925060408601915060408160051b87010184880160005b83811015610cd357603f19898403018552815160a08151818652610c9082870182610bfb565b838b0151878c0152898401518a880152606080850151908801526080938401516001600160a01b0316939096019290925250509386019390860190600101610c6a565b509098975050505050505050565b634e487b7160e01b600052604160045260246000fd5b600080600060608486031215610d0c57600080fd5b833567ffffffffffffffff80821115610d2457600080fd5b818601915086601f830112610d3857600080fd5b813581811115610d4a57610d4a610ce1565b604051601f8201601f19908116603f01168101908382118183101715610d7257610d72610ce1565b81604052828152896020848701011115610d8b57600080fd5b82602086016020830137600060208483010152809750505050505060208401359150604084013590509250925092565b60008060408385031215610dce57600080fd5b82359150610dde60208401610b31565b90509250929050565b600060208284031215610df957600080fd5b5035919050565b60a081526000610e1360a0830188610bfb565b602083019690965250604081019390935260608301919091526001600160a01b0316608090910152919050565b634e487b7160e01b600052603260045260246000fd5b602080825260149082015273105cdcd95d08191bd95cc81b9bdd08195e1a5cdd60621b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761083f5761083f610e84565b8082018082111561083f5761083f610e84565b8181038181111561083f5761083f610e84565b600082610ef457634e487b7160e01b600052601260045260246000fd5b500490565b600181811c90821680610f0d57607f821691505b602082108103610f2d57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610f7f576000816000526020600020601f850160051c81016020861015610f5c5750805b601f850160051c820191505b81811015610f7b57828155600101610f68565b5050505b505050565b815167ffffffffffffffff811115610f9e57610f9e610ce1565b610fb281610fac8454610ef9565b84610f33565b602080601f831160018114610fe75760008415610fcf5750858301515b600019600386901b1c1916600185901b178555610f7b565b600085815260208120601f198616915b8281101561101657888601518255948401946001909101908401610ff7565b50858210156110345787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6060815260006110576060830186610bfb565b6020830194909452506040015291905056fea2646970667358221220106fd0f1e0f4f57fbfd6c8eb6afb093a78a038ac40786d553da1299430ba66a664736f6c63430008190033";

type AssetifyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AssetifyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Assetify__factory extends ContractFactory {
  constructor(...args: AssetifyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string }
  ): Promise<Assetify> {
    return super.deploy(overrides || {}) as Promise<Assetify>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Assetify {
    return super.attach(address) as Assetify;
  }
  override connect(signer: Signer): Assetify__factory {
    return super.connect(signer) as Assetify__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AssetifyInterface {
    return new utils.Interface(_abi) as AssetifyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Assetify {
    return new Contract(address, _abi, signerOrProvider) as Assetify;
  }
}
