import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../api/axios';
import Layout from '../../components/Layout/Layout';

function VideoRoom() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const { id } = useParams();

  const connectWebSocket = () => {
    try {
      const wsUrl = `${API_URL.replace('http://', 'ws://')}/ws/${id}`;
      console.log('Connecting to WebSocket:', wsUrl);
      const ws = new WebSocket(wsUrl);
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionError('Błąd połączenia WebSocket');
      };

      ws.onclose = () => {
        console.log('WebSocket closed, attempting to reconnect...');
        setTimeout(connectWebSocket, 3000);
      };

      socketRef.current = ws;
      return ws;
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      setConnectionError('Nie można utworzyć połączenia WebSocket');
      return null;
    }
  };

  useEffect(() => {
    let stream: MediaStream | null = null;

    const initializeConnection = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const ws = connectWebSocket();
        if (!ws) return;

        const peerConnection = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        peerConnectionRef.current = peerConnection;

        stream.getTracks().forEach(track => {
          peerConnection.addTrack(track, stream!);
        });

        peerConnection.onicecandidate = event => {
          if (event.candidate && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
          }
        };

        peerConnection.ontrack = event => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        ws.onmessage = async event => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'offer') {
              await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
              const answer = await peerConnection.createAnswer();
              await peerConnection.setLocalDescription(answer);
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'answer', answer }));
              }
            } else if (data.type === 'answer') {
              await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
            } else if (data.type === 'candidate') {
              await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
          } catch (error) {
            console.error('Error processing WebSocket message:', error);
          }
        };

        ws.onopen = async () => {
          try {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            ws.send(JSON.stringify({ type: 'offer', offer }));
          } catch (error) {
            console.error('Error creating offer:', error);
          }
        };
      } catch (error) {
        console.error('Error initializing media devices:', error);
        setConnectionError('Nie można uzyskać dostępu do kamery lub mikrofonu');
      }
    };

    initializeConnection();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, [id]);

  return (
    <Layout>
      <div className="box">
        {connectionError && (
          <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
            {connectionError}
          </div>
        )}
        <div style={{display: "flex", gap: "12px", minHeight: "600px"}}>
          <video ref={localVideoRef} autoPlay muted style={{flex: 1}} />
          <video ref={remoteVideoRef} autoPlay style={{flex: 1}} />
        </div>
      </div>
    </Layout>
  );
}

export default VideoRoom;
