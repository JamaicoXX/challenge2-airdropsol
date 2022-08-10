// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Get the wallet balance from a given private key
const getWalletBalance = async (publicKeyFromCLI) => {
    try {
        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletBalance = await connection.getBalance(
            new PublicKey(publicKeyFromCLI)
        );
        console.log(parseInt(walletBalance));
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async (publicKeyFromCLI) => {
    try {
        // Connect to the Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicKeyFromCLI),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    // get the publickey inputted in the CLI
    const publicKeyFromCLI = process.argv[2];
    //Check Wallet Current Balance
    await getWalletBalance(publicKeyFromCLI); 
    //Airdrop Sol to publicKey
    await airDropSol(publicKeyFromCLI);
    //Check Wallet new Balance 
    await getWalletBalance(publicKeyFromCLI);
}

mainFunction();
