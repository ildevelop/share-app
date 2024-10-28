import React from 'react';
import ShareButtons from './components/ShareButtons';
import './App.css'; // Ensure to include any global styles

const App: React.FC = () => {
  const shareURL = 'https://example.com';
  const shareTitle = 'Check out this awesome website!';
  const shareText = 'I found this website really useful. Take a look!';
  const facebookAppId = 'YOUR_FACEBOOK_APP_ID'; // Replace with your actual App ID

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to My Website</h1>
      <p>This is an example of a reusable ShareButtons component.</p>
      <ShareButtons
        url={shareURL}
        title={shareTitle}
        text={shareText}
        platforms={['whatsapp', 'facebook', 'facebook-messenger', 'twitter', 'linkedin', 'email', 'telegram', 'signal', 'reddit']}
        className="custom-share-buttons"
        facebookAppId={facebookAppId}
      />
    </div>
  );
};

export default App;
