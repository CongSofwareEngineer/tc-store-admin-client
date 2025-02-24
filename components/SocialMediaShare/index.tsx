import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  TelegramShareButton,
  InstapaperShareButton,
} from 'react-share'
const url = 'https://tcstore.vercel.app/shop'
const title = 'TC Store - Uy tín khách hàng là chất lượng chúng tôi'
const SocialMediaShare = () => {
  return (
    <div className={'absolute opacity-0 z-[-1]'}>
      <FacebookShareButton url={url} title={title}>
        <span>Facebook</span>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <span>Twitter</span>
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title}>
        <span>Linked</span>
      </LinkedinShareButton>
      <EmailShareButton url={url} title={title}>
        <span>Email</span>
      </EmailShareButton>
      <TelegramShareButton url={url} title={title}>
        <span>Telegram</span>
      </TelegramShareButton>
      <InstapaperShareButton url={url} title={title}>
        <span>Instapaper</span>
      </InstapaperShareButton>
    </div>
  )
}

export default SocialMediaShare
