import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useNavigate } from "react-router-dom";
import '../components/css/Home.css'
import image from '../images/im.jpg'
import image1 from '../images/slider2.jpg'


const images = [
  {
    url: image,
    description: 'Welcome to Hackmeet - your gateway to seamless virtual connections.',
  },
  {
    url: image1,
    description:
      'Join meetings effortlessly, connect your wallet with MetaMask for secure transactions.',
  },
  {
    url: image,
    description:
      'Experience private or public meetings with encrypted video calls',
  },
];
// normal code

const Home = () => {

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current === images.length - 1 ? 0 : current + 1));
    }, 5000); // Adjust the time interval in milliseconds (e.g., 3000 for 3 seconds)
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    try {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      })

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();

      })
      await provider.send("eth_requestAccounts", []);
      const net = await provider.getNetwork()
      console.log(net.chainId);
      if (net.chainId != "0x13881") {
        //   console.log("entered");
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13881' }],
          });

        } catch (switchError) {
          console.log(switchError)
        }
      }
      const signer = await provider.getSigner();
      // console.log(signer);
      if (signer.getAddress()) {
        navigate("/live");
      } else {
        window.alert("connect to wallet")
      }
    } catch (error) {
      console.log(error);
    }

  }
  connect();
  return (
    <div className='backgrounddiv'>
      <div className='Headerdiv'>
        {/* ths is the top headernavbar */}
        <div className="dashboard">
          <div className="dashboard-header">
            <h1>Empower Your</h1>
            <h1 className="highlighted-text">Connections</h1>
          </div>
          <p>Your All-in-One Meeting and Hosting Platform</p>

        </div>






        <div className="slider">
          <div className="slider-container">
            {images.map((image, index) => (
              <div key={index} className={index === current ? 'slide active' : 'slide'}>
                {index === current && (
                  <div className="slide-content">
                    <div className="image-container">
                      <img src={image.url} alt={`slide ${index}`} className="image" />
                    </div>
                    <p className="description">{image.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>


      </div>
      <div className='connectbutton'>
        <button className='button-86' onClick={connect}>Connect To Wallet</button>

      </div>
    </div>

  )
}

export default Home

{/* <div className="description">
        <p>
          Welcome to <strong>Hackmeet</strong> – your gateway to seamless virtual connections. Join meetings effortlessly, connect your wallet with MetaMask for secure transactions, and experience private or public meetings with encrypted video calls. With Hackmeet, managing your meeting history is a breeze, ensuring your virtual connections are always at your fingertips.
        </p>
      </div> */}