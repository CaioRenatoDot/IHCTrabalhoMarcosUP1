import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

function SocialLoginButtons() {
  return (
    <div className="social-login">
      <a className="social-button" href="https://www.google.com">
        <FcGoogle size={20} />
        Continue com o google
      </a>

      <a className="social-button" href="https://www.facebook.com">
        <FaFacebook size={20} color="#1877F2" />
        Continue com o facebook
      </a>
    </div>
  )
}

export default SocialLoginButtons
