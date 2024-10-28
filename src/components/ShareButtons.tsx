import React from 'react';
import styles from './ShareButtons.module.css';
import {
  FaWhatsapp,
  FaFacebookF,
  FaFacebookMessenger,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaTelegramPlane,
  FaSignal,
  FaRedditAlien,
} from 'react-icons/fa';

type Platform =
  | 'whatsapp'
  | 'facebook'
  | 'facebook-messenger'
  | 'twitter'
  | 'linkedin'
  | 'linkedin-messaging'
  | 'email'
  | 'telegram'
  | 'signal'
  | 'reddit';

interface ShareButtonsProps {
  url: string;
  title?: string;
  text?: string;
  platforms?: Platform[];
  className?: string;
  facebookAppId?: string; // For Facebook Messenger
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title = document.title,
  text = '',
  platforms = ['whatsapp', 'facebook', 'facebook-messenger', 'twitter', 'linkedin', 'email', 'telegram', 'signal', 'reddit'],
  className = '',
  facebookAppId = '', // Default to empty string
}) => {
  const encodedURL = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text);

  const shareLinks: Record<Platform, string> = {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedURL}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    'facebook-messenger': facebookAppId
      ? `https://www.facebook.com/dialog/send?app_id=${facebookAppId}&link=${encodedURL}&redirect_uri=${encodedURL}`
      : '#', // Fallback if app ID not provided
    twitter: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedText}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedTitle}&summary=${encodedText}`,
    'linkedin-messaging': `https://www.linkedin.com/messaging/compose/?body=${encodedText}%20${encodedURL}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A${encodedURL}`,
    telegram: `https://t.me/share/url?url=${encodedURL}&text=${encodedText}`,
    signal: `https://signal.me/#p/+1234567890?text=${encodedText}%20${encodedURL}`, // Replace with dynamic number if possible
    reddit: `https://www.reddit.com/submit?url=${encodedURL}&title=${encodedTitle}`,
  };

  const icons: Record<Platform, JSX.Element> = {
    whatsapp: <FaWhatsapp />,
    facebook: <FaFacebookF />,
    'facebook-messenger': <FaFacebookMessenger />,
    twitter: <FaTwitter />,
    linkedin: <FaLinkedinIn />,
    'linkedin-messaging': <FaLinkedinIn />, // Using LinkedIn icon
    email: <FaEnvelope />,
    telegram: <FaTelegramPlane />,
    signal: <FaSignal />,
    reddit: <FaRedditAlien />,
  };

  const handleClick = (platform: Platform) => {
    if (platform === 'facebook-messenger' && !facebookAppId) {
      alert('Facebook App ID is required for Messenger sharing.');
    }
    // Add more custom handlers if necessary
  };

  return (
    <div className={`${styles.shareButtons} ${className}`}>
      {platforms.map((platform) => (
        <a
          key={platform}
          href={shareLinks[platform]}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles[platform]}`}
          aria-label={`Share on ${platform
            .replace('-', ' ')
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}`}
          onClick={() => handleClick(platform)}
        >
          {icons[platform]}
        </a>
      ))}
    </div>
  );
};

export default ShareButtons;
