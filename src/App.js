import { useEffect, useRef, useState } from 'react';

import './App.css';
import TcAdapter from 'tcadapter';

function App() {
  const [appID, setAppID] = useState('1500002611');
  const [fileID, setFileID] = useState('5285890813738446783');
  const [psign, setPsign] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwMjYxMSwiZmlsZUlkIjoiNTI4NTg5MDgxMzczODQ0Njc4MyIsImN1cnJlbnRUaW1lU3RhbXAiOjE2MTU5NTEyMzksImV4cGlyZVRpbWVTdGFtcCI6MjIxNTY1MzYyMywicGNmZyI6ImJhc2ljRHJtUHJlc2V0IiwidXJsQWNjZXNzSW5mbyI6eyJ0IjoiMjIxNTY1MzYyMyJ9fQ.hRrQYvC0UYtcO-ozB35k7LZI6E3ruvow7DC0XzzdYKE');
  const [hls, setHls] = useState();

  if (!TcAdapter.isSupported()) {
    throw new Error('current environment can not support TcAdapter');
  }

  const videoRef = useRef(null);

  const init = () => {
    hls && hls.destroy();
    const adapter = new TcAdapter(videoRef.current, {
      // demo1
      appID,
      fileID,
      psign,
      
      // demo2 
      // fileID: "5285890815603219568", /**请传入需要播放的视频fileID 必须 */
      // appID: "1500002611", /**请传入点播账号的子应用appID 必须 */
      // psign: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwMjYxMSwiZmlsZUlkIjoiNTI4NTg5MDgxNTYwMzIxOTU2OCIsImN1cnJlbnRUaW1lU3RhbXAiOjE2MTU5NTM2NjcsImV4cGlyZVRpbWVTdGFtcCI6MjIxNTY1NjA1MSwicGNmZyI6ImJhc2ljRHJtUHJlc2V0IiwidXJsQWNjZXNzSW5mbyI6eyJ0IjoiMjIxNTY1NjA1MSJ9fQ.XqRiy697HNT_1huSYOjwj1BJftZKxD8Ojmi0aq_8bUc",

      // demo3
      // fileID: "5285890815601918477", /**请传入需要播放的视频fileID 必须 */
      // appID: "1500002611", /**请传入点播账号的子应用appID 必须 */
      // psign: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwMjYxMSwiZmlsZUlkIjoiNTI4NTg5MDgxNTYwMTkxODQ3NyIsImN1cnJlbnRUaW1lU3RhbXAiOjE2MTU5NTE3MDYsImV4cGlyZVRpbWVTdGFtcCI6MjIxNTY1Mzk3OCwicGNmZyI6ImRlZmF1bHQiLCJ1cmxBY2Nlc3NJbmZvIjp7InQiOiIyMjE1NjUzOTc4In19.6u05eXa6bJ4GLCIdlZfeMw_LUDf1AYP8FXRhoxLQBTY",
      hlsConfig: {},
    }, () => {
      // 获取视频信息
      console.log('basicInfo', adapter.getVideoBasicInfo());
    });


    adapter.on('loadedmetadata', data => {
        console.log('loadedmetadata', data);
        console.log('getVideoBasicInfo', adapter.getVideoBasicInfo());
        console.log('getStreamimgOutputList', adapter.getStreamimgOutputList());
        console.log('getKeyFrameDescInfo', adapter.getKeyFrameDescInfo());
        console.log('getImageSpriteInfo', adapter.getImageSpriteInfo());
    });

    adapter.on('hlsready', () => {
      setHls(adapter.hls);
    })

    videoRef.current.play();
    
  }
  useEffect(() => {
    init();
  }, []);
  

  const play = () => {
    fileID === '5285890813738446783' ? videoRef.current.play() : init();
  }

  return (
    <div>	
      <div>
        <video id="player" ref={ videoRef }></video>
        <br />
        <span className="demo-label">appID: </span>
        <input type="text" value={appID} onChange={e => setAppID(e.target.value)} />
        <br />
        <span className="demo-label">fileID: </span>
        <input type="text" value={fileID} onChange={e => setFileID(e.target.value)} />
        <br />
        <span className="demo-label">psign: </span>
        <input type="text" value={psign} onChange={e => setPsign(e.target.value)} />
      </div>
      <button className="play-btn" onClick={play}>play</button>
    </div>
  );
}

export default App;
