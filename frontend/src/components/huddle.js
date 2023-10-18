// import {Database} from "@tableland/sdk";
import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ig from "./css/img.png";

import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";
import "./css/huddle.css";

import {
  useAudio,
  useLobby,
  useMeetingMachine,
  usePeers,
  useRoom,
  useVideo,
} from "@huddle01/react/hooks";

import VideocamIcon from "@mui/icons-material/Videocam";
import PlayDisabledIcon from "@mui/icons-material/PlayDisabled";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Huddle(props) {
  console.log(props);
  const fetchvid = () => {
    return <>{fetchVideoStream};</>;
  };

  const oppvid = () => {
    Setvid(!vid);
  };

  const navigate = useNavigate();
  const videoRef = useRef(null);
  // const [roomid,setroomid]=useState("")
  const roomid = props.roomid;
  const { state, send } = useMeetingMachine();
  // Event Listner
  useEventListener("lobby:cam-on", () => {
    if (state.context.camStream && videoRef.current)
      videoRef.current.srcObject = state.context.camStream;
  });

  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby } = useLobby();
  const {
    fetchAudioStream,
    produceAudio,
    stopAudioStream,
    stopProducingAudio,
    stream: micStream,
  } = useAudio();
  const {
    fetchVideoStream,
    produceVideo,
    stopVideoStream,
    stopProducingVideo,
    stream: camStream,
  } = useVideo();
  const { joinRoom, leaveRoom } = useRoom();
  const [joinlobby, setJoinlobby] = useState(true);
  const [cam, Setcam] = useState(true);
  const [mic, Setmic] = useState(true);
  const [vid, Setvid] = useState(false);
  const [aud, Setaud] = useState(false);
  const [enroom, Setenroom] = useState(false);

  const { peers } = usePeers();
  // const roomid = "djm-hedk-pzl";
  const { id } = useParams()
  useEffect(() => {
    const run = async () => {
      await initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
      // setroomid(props.roomid)

    };
    run();
  }, []);



  return (
    <div className="gradient">


      <div className="content">
        <div>
          <h1 className="text-6xl font-bold">
          </h1>
          {/* 
           <h2 className="text-2xl">Room State</h2>
        <h3>{JSON.stringify(state.value)}</h3>  */}

          {joinlobby ? (
            <>
              <div className="titleHeader">
                <div className="tit">


                  <div className="innbut">
                    <button
                      className="bn632-hover bn24"
                      disabled={!joinLobby.isCallable}
                      onClick={() => [setJoinlobby(false), console.log(roomid), joinLobby(roomid)]}
                    >
                      JOIN_LOBBY
                    </button>
                    {/**text-3xl text-yellow-500 font-extrabold */}
                  </div>
                </div>
                <div className="igg">
                  <img src={ig} className="ig" alt="img" />{" "}
                </div>
              </div>
            </>
          ) : (
            <>

              <div>
                <div className="online_meet_class" >
                  <div className="video_class" >
                    {


                      vid ? (<>
                        <video ref={videoRef} autoPlay muted></video>

                      </>) : (<>
                        <h1 id="ready_class" >Ready To Join ?</h1>

                      </>)
                    }
                  </div>
                  {
                    enroom ? (<> </>) : (<>

                      <div className="opp"  >
                        <button
                          className="button-85"
                          disabled={!joinRoom.isCallable}
                          onClick={() => [joinRoom(), Setenroom(!enroom)]}
                        >
                          JOIN_ROOM
                        </button>

                        <button
                          className="button-86"
                          disabled={!state.matches("Initialized.JoinedLobby")}
                          onClick={() => { console.log('hello') && navigate(``) }}
                        >
                          LEAVE_LOBBY
                        </button>

                      </div>


                    </>)
                  }


                  <div className="othervideo">
                    {Object.values(peers)
                      .filter((peer) => peer.cam)
                      .map((peer) => (
                        <Video
                          key={peer.peerId}

                          track={peer.cam}
                          debug
                        />
                      ))}
                    {Object.values(peers)
                      .filter((peer) => peer.mic)
                      .map((peer) => (
                        <Audio
                          key={peer.peerId}
                          peerId={peer.peerId}
                          track={peer.mic}
                        />
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                {vid ? (
                  <>
                    <VideocamIcon
                      disabled={!stopVideoStream.isCallable}
                      onClick={() => [
                        stopVideoStream(),
                        Setvid(!vid),
                        console.log("clicked"),
                      ]}
                    />
                    {/** stopVideoStream,*/}

                    {/**fetchVideoStream, onClick={()=>Setvid(!vid)} */}
                  </>
                ) : (
                  <>
                    <VideocamOffIcon
                      disabled={!fetchVideoStream.isCallable}
                      onClick={() => {
                        fetchVideoStream();
                        Setvid(!vid);
                      }}
                    />
                  </>
                )}

                {aud ? (
                  <>
                    <MicIcon
                      disabled={!stopAudioStream.isCallable}
                      onClick={() => [stopAudioStream(), Setaud(!aud)]}
                    />
                  </>
                ) : (
                  <>
                    <MicOffIcon
                      disabled={!fetchAudioStream.isCallable}
                      onClick={() => [fetchAudioStream(), Setaud(!aud)]}
                    />
                  </>
                )}

                {/* <button
            disabled={!fetchAudioStream.isCallable}
            onClick={fetchAudioStream}
          >
            FETCH_AUDIO_STREAM
          </button>
          <button
            disabled={!stopAudioStream.isCallable}
            onClick={stopAudioStream}
          >
            STOP_AUDIO_STREAM
          </button> */}




              </div>
              <br />

              {/* <button
            disabled={!produceVideo.isCallable}
            onClick={() => produceVideo(camStream)}
          > */}

              {vid && enroom ? (
                <>



                  {
                    enroom ? (<>

                      <h2 className="text-3xl text-green-600 font-extrabold">
                        Room
                      </h2>
                      <button disabled={!leaveRoom.isCallable} className="button-85" onClick={() => leaveRoom && (navigate(`/view/${id}`))}>
                        LEAVE_ROOM
                      </button>

                    </>) : (<></>)
                  }


                </>) : (
                <>
                  {enroom ? (
                    <>
                      <h2 className="text-3xl text-green-600 font-extrabold">
                        Room
                      </h2>

                      <button
                        disabled={!leaveRoom.isCallable}
                        onClick={() => leaveRoom && (navigate(`/view/${id}`))}
                      >
                        LEAVE_ROOM
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}

              <div className="flex gap-4 flex-wrap">
                {vid && enroom ? (
                  <>
                    {cam ? (
                      <>
                        <VideocamOffIcon
                          disabled={!produceVideo.isCallable}
                          //  onClick={() => produceVideo(camStream)}
                          onClick={() => [
                            Setcam(!cam),
                            produceVideo(camStream),
                          ]}
                        />
                      </>
                    ) : (
                      <>
                        <VideocamIcon
                          disabled={!stopProducingVideo.isCallable}
                          onClick={() => [stopProducingVideo(), Setcam(!cam)]}
                        />
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {aud && enroom ? (
                  <>
                    {mic ? (
                      <>
                        <MicOffIcon
                          disabled={!produceAudio.isCallable}
                          onClick={() => [
                            produceAudio(micStream),
                            Setmic(!mic),
                          ]}
                        />
                      </>
                    ) : (
                      <>
                        <MicIcon
                          disabled={!stopProducingAudio.isCallable}
                          onClick={() => [stopProducingAudio(), Setmic(!mic)]}
                        />
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {/* </button> */}


              </div>
            </>
          )}


        </div>
      </div>
    </div>
  );
}
