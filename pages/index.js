import React from 'react';
import abi from '../utils/BuyMeACoffee.json';
import { ethers } from 'ethers';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Buy Sharon a Coffe</title>
        <meta name="description" content="Tipping Site" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Buy Sharon a Coffee!</h1>
        <div>
         <form>
          <div>
            <label>Name</label><br />
            <input id="name" type="text" placeholder="Name" onChange={} />  
          </div><br/>
          <div>
            <label>Leave Sharon a message</label><br/>
            <textarea id="message" placeholder="Your Content is Amazing!" rows="3" onChange={} required></textarea>
          </div> 
          <div>
            <button type="button" onClick={}>
              Send 1 for 0.0001ETH
            </button>
          </div>  
        </form> 
        </div>
        <button onClick={}>Connect your Wallet</button>
      </main>
      <h1>Memos Received</h1>
      return (
        <div key={} style={{border: "2px solid", borderRadius: "5px", padding: "5px"}}>
          <p style={{fontWeight: "bold"}}></p>
          <p>From: at</p>
        </div>

        <footer className={styles.footer}>
          <a href="https://github.com/jebitok-dev/" target="_blank" rel="noopener noreferrer">
            Created by @SharonJebitok cc thatguyintech for Alchemy's #RoadToWeb3!
          </a>
        </footer>

      )

    </div>
  )
}

