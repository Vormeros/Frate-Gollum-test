import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FrateGollum from './artifacts/contracts/FrateGollum.sol/FrateGollum.json';
import './App.css';
import img1 from './img/1.png';
import img3 from './img/5.png';
import img4 from './img/10.png';
import img5 from './img/12.png';
import img2 from './img/19.png';
import img6 from './img/14.png';




const FGaddress = "0x7AFb019702E6Aa059e9f0E6d3770164eCA04ddEA";

function App() {

  const [error, setError] = useState('');
  const [data, setData] = useState({})

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(FGaddress, FrateGollum.abi, provider);
      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const object = {"cost": String(cost), "totalSupply": String(totalSupply)}
        setData(object);
      }
      catch(err) {
        setError(err.message);
      }
    }
  }

  async function mint() {
    if(typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(FGaddress, FrateGollum.abi, signer);
      try {
        let overrides = {
          from: accounts[0],
          value: data.cost
        }
        const transaction = await contract.mint(accounts[0], 1, overrides);
        await transaction.wait();
        fetchData();
      }
      catch(err) {
        setError(err.message);
      }
    }
  }



  return (
    <div className="App">
        <div className="container">
          <div className="banniere">
            <img src={img1} alt="img" />
            <img src={img3} alt="img" />
            <img src={img4} alt="img" />
            <img src={img5} alt="img" />
            <img src={img2} alt="img" />
            <img src={img6} alt="img" />
          </div>
          {error && <p>{error}</p>}
          <h1> Mint a Frate Gollum! </h1>
          <p className="count">{data.totalSupply} / 50</p>
        <p className="cost">Each Frate Gollum NFT costs {data.cost / 10**18} eth (excluding gas fees)</p>
        <button onClick={mint}>Adopt a Frate Gollum</button>
        </div>
    </div>
  );
}

export default App;
