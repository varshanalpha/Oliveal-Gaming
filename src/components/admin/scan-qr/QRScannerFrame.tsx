import React, { useState, useRef, useEffect } from 'react';
import {
  Scan,
  ScanLine,
  Upload,
  Camera,
  CameraOff,
  Info,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { decodeQRFromFile, decodeQRFromImageData } from '../../../services/qrScannerService';

interface QRScannerFrameProps {
  onScanPayload: (payload: string) => void;
  isVerifying?: boolean;
}

export const QRScannerFrame: React.FC<QRScannerFrameProps> = ({
  onScanPayload,
  isVerifying = false,
}) => {
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessingUpload, setIsProcessingUpload] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Stop camera stream cleanup
  const stopCamera = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Request & Start Camera Scanning
  const startCamera = async () => {
    setCameraError(null);
    setUploadError(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera API is not supported in this browser environment. Please use Upload QR Code.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setCameraActive(true);
        requestScanFrame();
      }
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was denied. Please allow camera access or upload an image.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No camera device found on this system. Please use Upload QR Code.');
      } else {
        setCameraError('Unable to access camera. Please use Upload QR Code or quick test samples.');
      }
      setCameraActive(false);
    }
  };

  // Continuous Camera Frame Scanning Loop
  const requestScanFrame = () => {
    if (!videoRef.current || !canvasRef.current || !cameraActive) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = decodeQRFromImageData(imageData);

      if (code && code.trim()) {
        stopCamera();
        onScanPayload(code.trim());
        return;
      }
    }

    animationFrameId.current = requestAnimationFrame(requestScanFrame);
  };

  // Handle QR File Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setCameraError(null);
    setIsProcessingUpload(true);

    try {
      const decodedPayload = await decodeQRFromFile(file);
      setIsProcessingUpload(false);
      onScanPayload(decodedPayload);
    } catch (err: any) {
      setIsProcessingUpload(false);
      setUploadError(err?.message || 'Failed to decode QR code from the uploaded image.');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Fast Test Presets
  const QUICK_TEST_CODES = [
    { label: 'BK-1000 (Aakash S • Ready)', code: 'BK-1000' },
    { label: 'BK-1001 (Arjun K • Already Checked In)', code: 'BK-1001' },
    { label: 'BK-0994 (Praveen R • Ready)', code: 'BK-0994' },
    { label: 'Invalid QR Sample', code: 'RANDOM-INVALID-PAYLOAD' },
  ];

  return (
    <div className="rounded-3xl bg-[#0e0a1d]/90 border border-purple-500/25 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl relative space-y-4">
      
      {/* Header: Title + Status Indicator Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-purple-500/15">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center font-bold text-sm shadow-[0_0_12px_rgba(168,85,247,0.3)]">
            <Scan className="w-4.5 h-4.5" />
          </div>
          <h2 className="text-xl sm:text-[22px] font-bold text-white font-display tracking-tight">
            QR Code Scanner
          </h2>
        </div>

        {/* Ready to Scan Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span>{isVerifying ? 'Verifying...' : cameraActive ? 'Scanning...' : 'Ready to Scan'}</span>
        </div>
      </div>

      {/* Error Banners if camera or upload fails */}
      {cameraError && (
        <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2.5 text-amber-200 text-xs">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>{cameraError}</span>
        </div>
      )}

      {uploadError && (
        <div className="p-3 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-start gap-2.5 text-red-200 text-xs">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Large QR Scanning Frame (Matching Reference Image) */}
      <div className="relative w-full max-w-[280px] sm:max-w-[300px] h-[230px] sm:h-[250px] mx-auto rounded-3xl bg-[#090615] border border-purple-500/20 overflow-hidden flex flex-col items-center justify-center p-5 text-center shadow-inner group">
        
        {/* Subtle Neon Grid Backdrop */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#a855f7 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Live Video Feed (Active when camera is running) */}
        {cameraActive && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover z-10"
            autoPlay
            playsInline
            muted
          />
        )}
        <canvas ref={canvasRef} className="hidden" />

        {/* 4 Glowing Corner Brackets */}
        <div className="absolute inset-5 pointer-events-none z-20">
          {/* Top-Left */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-[3.5px] border-l-[3.5px] border-fuchsia-400 rounded-tl-xl shadow-[0_0_12px_rgba(232,121,249,0.85)]" />
          {/* Top-Right */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t-[3.5px] border-r-[3.5px] border-fuchsia-400 rounded-tr-xl shadow-[0_0_12px_rgba(232,121,249,0.85)]" />
          {/* Bottom-Left */}
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3.5px] border-l-[3.5px] border-fuchsia-400 rounded-bl-xl shadow-[0_0_12px_rgba(232,121,249,0.85)]" />
          {/* Bottom-Right */}
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3.5px] border-r-[3.5px] border-fuchsia-400 rounded-tr-xl shadow-[0_0_12px_rgba(232,121,249,0.85)]" />

          {/* Animated Scanning Laser Line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_15px_rgba(232,121,249,1)] animate-scan-bounce" />
        </div>

        {/* Center Prompt & Controls */}
        <div className="relative z-30 flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/70 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <ScanLine className="w-7 h-7 text-fuchsia-400" />
          </div>

          <div>
            <p className="text-sm sm:text-base font-bold text-white tracking-tight">
              Scan Customer QR Code
            </p>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Align the QR code within the frame
            </p>
          </div>

          {/* Camera Toggle Button */}
          <div className="pt-1">
            {!cameraActive ? (
              <button
                type="button"
                onClick={startCamera}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 hover:text-white text-[11px] font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Camera className="w-3 h-3" />
                <span>Start Camera Scanner</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopCamera}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 hover:bg-red-900/60 border border-red-500/40 text-red-200 text-[11px] font-semibold transition-all cursor-pointer shadow-sm"
              >
                <CameraOff className="w-3 h-3" />
                <span>Stop Camera</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Separator labeled "or" */}
      <div className="flex items-center gap-3 w-full max-w-[280px] sm:max-w-[300px] mx-auto py-0.5">
        <div className="h-px flex-1 bg-purple-500/20" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
          or
        </span>
        <div className="h-px flex-1 bg-purple-500/20" />
      </div>

      {/* Upload QR Code Action Button */}
      <div className="w-full max-w-[280px] sm:max-w-[300px] mx-auto">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
          className="hidden"
          id="qr-file-upload-input"
        />
        <button
          type="button"
          disabled={isProcessingUpload}
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-10.5 sm:h-11 rounded-2xl bg-gradient-to-r from-purple-900/40 to-fuchsia-950/40 hover:from-purple-900/60 hover:to-fuchsia-950/60 border border-purple-500/30 hover:border-purple-500/50 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
        >
          {isProcessingUpload ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
              <span>Decoding Image...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 text-purple-400" />
              <span>Upload QR Code</span>
            </>
          )}
        </button>
      </div>

      {/* Quick Test Demo Presets for frictionless testing */}
      <div className="w-full max-w-[280px] sm:max-w-[300px] mx-auto pt-0.5">
        <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1 font-semibold">
          <span className="flex items-center gap-1 text-purple-300">
            <Sparkles className="w-3 h-3 text-purple-400" />
            Quick Test QR Codes:
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {QUICK_TEST_CODES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => onScanPayload(item.code)}
              className="px-2 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-purple-950/60 border border-purple-500/20 hover:border-purple-500/40 text-[10px] text-zinc-300 hover:text-white font-mono truncate text-left transition-colors cursor-pointer"
              title={item.label}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Instruction Card Below */}
      <div className="w-full max-w-[280px] sm:max-w-[300px] mx-auto rounded-2xl bg-[#110c22] border border-purple-500/20 p-2.5 sm:p-3 flex items-start gap-2.5 text-zinc-300 text-[11px] sm:text-xs">
        <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          Scan the booking QR code from the customer's phone to check-in and start their gaming session.
        </span>
      </div>

    </div>
  );
};
