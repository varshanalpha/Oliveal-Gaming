import jsQR from 'jsqr';

/**
 * Decodes QR code from canvas ImageData using jsQR
 */
export const decodeQRFromImageData = (imageData: ImageData): string | null => {
  try {
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'attemptBoth',
    });
    return code ? code.data : null;
  } catch {
    return null;
  }
};

/**
 * Decodes QR code from an uploaded Image File
 */
export const decodeQRFromFile = async (file: File): Promise<string> => {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload a valid image file (PNG, JPG, or JPEG).');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) {
            reject(new Error('Could not initialize canvas context.'));
            return;
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const decoded = decodeQRFromImageData(imageData);

          if (decoded && decoded.trim()) {
            resolve(decoded.trim());
          } else {
            reject(new Error('No QR code detected in the uploaded image. Please ensure the QR code is clear.'));
          }
        } catch (err: any) {
          reject(new Error(err?.message || 'Failed to process QR image.'));
        }
      };

      img.onerror = () => reject(new Error('Corrupted or unreadable image file.'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
};

