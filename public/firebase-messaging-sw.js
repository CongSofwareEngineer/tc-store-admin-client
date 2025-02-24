importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

const firebaseConfig = JSON.parse(new URL(location).searchParams.get('firebaseConfig'))

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  if (payload?.data?.title) {
    const notificationTitle = payload?.data?.title
    const notificationOptions = {
      body: payload?.data?.body || null,
      icon: 'https://skywalker.infura-ipfs.io/ipfs/QmTZBqX5FbMPQEC6AaTmhaqDSPv3gpp5hb3XzZN7piA534',
      image: 'https://skywalker.infura-ipfs.io/ipfs/QmTZBqX5FbMPQEC6AaTmhaqDSPv3gpp5hb3XzZN7piA534',
      actions: [
        {
          action: 'action',
          title: payload.data?.titleConfirm || 'Kiểm tra',
        },
      ],
      data: payload?.data, // Pass any additional data
    }
    self.registration.showNotification(notificationTitle, notificationOptions)


  }
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.openWindow('/my-page') // Open the URL in a new window/tab
  );
  // console.log('Notification clicked:', event.notification);
  // event.notification.close()
  // const notificationData = event.notification.data;

  // event.waitUntil(
  //   clients
  //     .matchAll({
  //       type: "window",
  //     })
  //     .then((clientList) => {
  //       clients.openWindow('/my-page')
  //       // if (notificationData?.url) {
  //       //   event.waitUntil(
  //       //     clients.openWindow(notificationData.url) // Open the URL in a new window/tab
  //       //   );
  //       // } else {
  //       //   // Default behavior: Open the app's root URL
  //       //   event.waitUntil(
  //       //     clients.openWindow('/') // Replace '/' with your app's root URL
  //       //   );
  //       // }
  //     }),
  // );


  // if (notificationData?.url) {
  //   event.waitUntil(
  //     clients.openWindow(notificationData.url) // Open the URL in a new window/tab
  //   );
  // } else {
  //   // Default behavior: Open the app's root URL
  //   event.waitUntil(
  //     clients.openWindow('/') // Replace '/' with your app's root URL
  //   );
  // }
})
