'use client'
import React from 'react'

const Vietcombank = () => {
  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const partnerCode = 'MOMOIQA420180417'
  //       const accessKey = 'F8BBA842ECF85'
  //       const secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz'
  //       const requestId = partnerCode + new Date().getTime()
  //       const orderId = requestId
  //       const orderInfo = 'pay with MoMo'
  //       const redirectUrl = 'https://momo.vn/return'
  //       const ipnUrl = 'https://callback.url/notify'
  //       // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  //       const amount = '50000'
  //       const requestType = 'captureWallet'
  //       const extraData = '' //pass empty value if your merchant does not have stores

  //       //before sign HMAC SHA256 with format
  //       //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  //       const rawSignature =
  //         'accessKey=' +
  //         accessKey +
  //         '&amount=' +
  //         amount +
  //         '&extraData=' +
  //         extraData +
  //         '&ipnUrl=' +
  //         ipnUrl +
  //         '&orderId=' +
  //         orderId +
  //         '&orderInfo=' +
  //         orderInfo +
  //         '&partnerCode=' +
  //         partnerCode +
  //         '&redirectUrl=' +
  //         redirectUrl +
  //         '&requestId=' +
  //         requestId +
  //         '&requestType=' +
  //         requestType
  //       //puts raw signature
  //       console.log('--------------------RAW SIGNATURE----------------')
  //       console.log(rawSignature)
  //       //signature

  //       const signature = crypto.HmacSHA256(secretkey, rawSignature).toString(crypto.enc.Hex)
  //       console.log({ signature })

  //       // const urlTest = `https://test-payment.momo.vn/pay/store/${partnerCode}?a=${amount}&b=234234&s=${signature}`
  //       // console.log({ urlTest })

  //       // console.log({ signature })

  //       // const requestBody = JSON.stringify({
  //       //   partnerCode: partnerCode,
  //       //   accessKey: accessKey,
  //       //   requestId: requestId,
  //       //   amount: amount,
  //       //   orderId: orderId,
  //       //   orderInfo: orderInfo,
  //       //   redirectUrl: redirectUrl,
  //       //   ipnUrl: ipnUrl,
  //       //   extraData: extraData,
  //       //   requestType: requestType,
  //       //   signature: signature,
  //       //   lang: 'vi',
  //       // })

  //       // console.log({ l: Buffer.byteLength(requestBody) })

  //       // const data = await axios.request({
  //       //   url: '/pay/store/',
  //       //   baseURL: 'https://test-payment.momo.vn',
  //       //   method: 'POST',
  //       //   headers: {
  //       //     'Content-Type': 'application/json',
  //       //     'Content-Length': Buffer.byteLength(requestBody),
  //       //   },
  //       // })

  //       // console.log({ data })
  //       const baseUrl = 'https://momo.vn'

  //       const comment = 'hello'
  //       const partnerName = 'Ho Dien Congf'
  //       const qrData = `${baseUrl}/pay?partnerCode=${partnerCode}&amount=${amount}&comment=${encodeURIComponent(comment)}&partnerName=${encodeURIComponent(partnerName)}`
  //       console.log({ qrData })
  //     } catch  {
  //
  //     }
  //   })()
  // }, [])

  return <div>Vietcombank</div>
}

export default Vietcombank
