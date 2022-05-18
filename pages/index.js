import React from "react";
import abi from "../utils/BuyMeACoffee.json";
import {ethers} from "ethers";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {useEffect} from "react/cjs/react.production.min";

export default function Home() {
  const contractAddress = "0x34d9297629323795CE29190159206cDD81e6B2d2";
  const contractABI = abi.abi;
  const [currentAmount, setCurrentAmount] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState([]);
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const isWalletConnected = async () => {
    try {
      const {ethereum} = window;
      const accounts = await ethereum.request({method: "eth_accounts"});
      console.log("accounts: ", accounts);
      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("Wallet is connected! " + account);
      } else {
        console.log("Make sure Metamask is connected!");
      }
    } catch (err) {
      console.log("error ", error);
    }
  };

  const connectWallet = async () => {
    try {
      const {ethereum} = window;
      if (!ethereum) {
        console.log("Please install Metamask extension");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const buyCoffee = async () => {
    try {
      const {ethereum} = window;
      if (ethereum) {
        const provider = new ethereum.Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log("buying coffee...");
        const coffeeTxn = await buyMeACoffee.buyCoffee(
          name ? name : "name",
          message ? message : "Your Content is Amazing!",
          {value: ethers.utils.parseEther("0.0001")}
        );

        await coffeeTxn.wait();
        console.log("mined", coffeeTxn.hash);
        console.log("coffee purchased");
        setName("");
        setMessage("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getMemos = async () => {
    try {
      const {ethereum} = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log("fetching memos from the blockchain...");
        const memos = await buyMeACoffee.getMemos();
        console.log("fetched!");
        setMemos(memos);
      } else {
        console.log("Metamask is not Connected!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let buyMeACoffee;
    isWalletConnected();
    getMemos();

    const onNewMemo = (from, timestamp, name, timestamp, name, message);
    setMemos((prevState) => [
      ...prevState,
      {
        address: from,
        timestamp: new Date(timestamp * 1000),
        message,
        name,
      },
    ]);

    const {ethereum} = window;

    if (ethereum) {
      const provider = new ethers.providers(ethereum, "any");
      const signer = provider.getSigner();
      buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);
      buyMeACoffee.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyMeACoffee) {
        buyMeACoffee.off("NewMemo", onNewMemo);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Buy Sharon a Coffee</title>
        <meta name='description' content='Tipping Site' />
        <Link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Buy Sharon a Coffee!</h1>
        {currentAccount ? (
          <div>
            <form>
              <div>
                <label>Name</label>
                <br />
                <input
                  id='name'
                  type='text'
                  placeholder='name'
                  onChange={onNameChange}
                />
              </div>
              <br />
              <div>
                <label>Leave Sharon a message</label>
                <br />
                <textarea
                  id='message'
                  placeholder='Your Content is Amazing!'
                  rows='3'
                  onChange={onMessageChange}
                  required></textarea>
              </div>
              <div>
                <button type='button' onClick={buyCoffee}>
                  Send 1 for 0.0001ETH
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button onClick={connectWallet}>Connect your Wallet</button>
        )}
      </main>
      {currentAccount && <h1>Memos Received</h1>}
      {currentAccount &&
        memos.map((memo, idx) => {
          return (
            <div
              key={idx}
              style={{
                border: "2px solid",
                borderRadius: "5px",
                padding: "5px",
              }}>
              <p style={{fontWeight: "bold"}}></p>
              <p>
                From: {memo.name} at {memo.timestamp.toString()}
              </p>
            </div>
          );
        })}
      <footer className={styles.footer}>
        <a
          href='https://github.com/jebitok-dev/'
          target='_blank'
          rel='noopener noreferrer'>
          Created by @SharonJebitok cc thatguyintech for Alchemy's #RoadToWeb3!
        </a>
      </footer>
      )
    </div>
  );
}
