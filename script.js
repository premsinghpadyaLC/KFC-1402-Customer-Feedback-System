function getGreeting() {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const timeString = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;

  if (hour >= 5 && hour < 12) {
    return `Good Morning! It's ${timeString}.`;
  } else if (hour >= 12 && hour < 18) {
    return `Good Afternoon! It's ${timeString}.`;
  } else {
    return `Good Evening! It's ${timeString}.`;
  }
}

window.onload = function () {
  const greetingElement = document.getElementById('greeting-message');
  if (greetingElement) {
    const originalText = greetingElement.innerHTML;
    greetingElement.innerHTML = getGreeting() + "<br>" + originalText;
  }

  const drawQRCodeWithLogo = (canvasId, url, logoUrl) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const size = 200;
    const logoSize = 50;
    const ctx = canvas.getContext('2d');

    QRCode.toCanvas(canvas, url, {
      width: size,
      margin: 2,
      color: {
        dark: '#1f2937',
        light: '#ffffff'
      }
    }, function (error) {
      if (error) {
        console.error(`QR code generation failed for ${canvasId}:`, error);
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const x = (size - logoSize) / 2;
        const y = (size - logoSize) / 2;

        ctx.fillStyle = '#fff';
        ctx.fillRect(x - 4, y - 4, logoSize + 8, logoSize + 8);
        ctx.drawImage(img, x, y, logoSize, logoSize);
      };
      img.onerror = () => {
        console.error(`Failed to load logo image: ${logoUrl}`);
      };
      img.src = logoUrl;
    });
  };

  const googleReviewUrl = 'https://www.google.com/search?sca_esv=ba24c2d2484ecd3d&rlz=1C1ONGR_enCA1147CA1147&sxsrf=AE3TifOkPDmDYAtRVuxyHXAr17w98KqZrw:1756343932312&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8swB97NJFz77SyLBoXvIfyIcPH2zTELpDRVC6lDOmxWTH7qmi4Aztgj7QGlfxgeAsNIFPOKh6kjRfCHVdYtWwqijpE6Z0&q=KFC+Reviews&sa=X&ved=2ahUKEwjOk8GBq6yPAxXH3skDHWbALFIQ0bkNegQIKBAE&cshid=1756343940267370&biw=1358&bih=650&dpr=1';
  const feedbackSurveyUrl = 'https://customer.kfc-listens.com/jfe/form/SV_0okhX9n4fu7IfVY?Q_Language=EN';
  const logoUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/800px-KFC_logo-image.svg.png';

  setTimeout(() => {
    drawQRCodeWithLogo('qr-google-maps', googleReviewUrl, logoUrl);
    drawQRCodeWithLogo('qr-feedback-form', feedbackSurveyUrl, logoUrl);
  }, 400);
};
