import { fetchData } from '@/configs/fetchConfig'
import { REQUEST_TYPE } from '@/constant/app'

const AdminApi = {
  getUserDetailById: async (id: string) => {
    return fetchData({
      url: `user/detail/${id}`,
    })
  },

  replyComment: async (id: string, body: any) => {
    return fetchData({
      url: `comment/reply/${id}`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },

  //bill
  getBills: async (queryUrl: string) => {
    return fetchData({
      url: `bill/all${queryUrl}`,
    })
  },
  updateBill: async (idBill: string, body: any) => {
    return fetchData({
      url: `bill/update/${idBill}`,
      body,
      method: REQUEST_TYPE.POST,
    })
  },
  deleteBill: async (idBill: string) => {
    return fetchData({
      url: `bill/delete/${idBill}`,
      method: REQUEST_TYPE.DELETE,
    })
  },

  //voucher
  getVouchers: async (query = '') => {
    return fetchData({ url: `voucher/admin/all${query}` })
  },
  getVoucherBuyId: async (id: string) => {
    return fetchData({ url: `voucher/detail/${id}` })
  },
  deleteVoucher: async (id: string, imagesDelete: string[]) => {
    return fetchData({
      url: `voucher/delete`,
      method: REQUEST_TYPE.POST,
      body: { id, imagesDelete },
    })
  },
  updateVoucher: async (id: string, body: any) => {
    return fetchData({
      url: `voucher/update/${id}`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },
  createVoucher: async (body: any) => {
    return fetchData({
      url: `voucher/create`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },

  //Product
  deleteProduct: async (id: string, imagesDelete?: string[]) => {
    return fetchData({
      url: `product/delete/${id}`,
      method: REQUEST_TYPE.POST,
      body: {
        imagesDelete,
      },
    })
  },
  createProduct: async (body: any) => {
    return fetchData({
      url: '/product/create',
      method: REQUEST_TYPE.POST,
      body,
    })
  },
  updateProduct: async (id: string, body: any) => {
    return fetchData({
      url: `/product/update/${id}`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },

  getListProducts: async (queryUrl: string) => {
    return fetchData({
      url: `product/admin/all${queryUrl}`,
    })
  },

  //Categories
  createCategories: async (body: any) => {
    return fetchData({
      url: `/category/create`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },
  updateCategories: async (id: string, body: any) => {
    return fetchData({
      url: `/category/update/${id}`,
      method: REQUEST_TYPE.PUT,
      body,
    })
  },
  deleteCategories: async (id: string) => {
    return fetchData({
      url: `category/delete/${id}`,
      method: REQUEST_TYPE.DELETE,
    })
  },
  getCategories: async (url: string) => {
    return fetchData({ url })
  },

  getCategoryByKey: async (keyParent: string) => {
    const url = `${keyParent}`
    return fetchData({ url })
  },

  getRevenue: async (queryUrl: string) => {
    return fetchData({
      url: `/revenue/admin/limit${queryUrl}`,
    })
  },
  getCart: async (queryUrl: string) => {
    return fetchData({
      url: `/cart/all${queryUrl}`,
    })
  },

  //user
  getUserAdmin: async (queryUrl: string) => {
    return fetchData({
      url: `user/admin/all${queryUrl}`,
    })
  },

  deleteUserAdmin: async (id: string) => {
    return fetchData({
      url: `user/delete/${id}`,
      method: REQUEST_TYPE.DELETE,
    })
  },

  //get comment
  getComments: async (queryUrl: string) => {
    return fetchData({
      url: `comment/all${queryUrl}`,
    })
  },
  // updateFanPage: async (id: TimeRanges, body: Object) => {
  //   const res = await fetchData({
  //     url: `fan-page/update/${id}`,
  //     body,
  //     method: REQUEST_TYPE.PUT,
  //   })
  //   return res
  // },
  // getFanPage: async () => {
  //   const res = await fetchData({
  //     url: `fan-page/all`,
  //   })
  //   return res
  // },
  // createFanPage: async (body: Object) => {
  //   const res = await fetchData({
  //     url: `fan-page/create`,
  //     body,
  //     method: REQUEST_TYPE.POST,
  //   })
  //   return res
  // },
  // deleteFanPage: async (body: Object) => {
  //   const res = await fetchData({
  //     url: `fan-page/delete`,
  //     body,
  //     method: REQUEST_TYPE.POST,
  //   })
  //   return res
  // },
}

export default AdminApi
