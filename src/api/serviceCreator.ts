import HTTP from "@/http";
import { AxiosProgressEvent } from "axios";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();
export default (concreteName: string) => {
  return {
    create<TRequest, TResponse>(data: TRequest) {
      return HTTP<TResponse>({
        method: "post",
        url: `/api/${concreteName}/Create`,
        data: data,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          notify({
            type: "success",
            title: "Data Creation Process",
            text: "Success",
          });
          return response;
        })
        .catch((error) => {
          notify({
            type: "error",
            title: "Data Creation Process",
            text: "Error",
          });
          throw error;
        });
    },

    PaymentRequest<TRequest, TResponse>(data: any) {
      return HTTP<TResponse>({
        method: "post",
        url: `/api/Payments/payment`,
        data: data,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          notify({
            type: "success",
            title: "Data Creation Process",
            text: "Success",
          });
          return response;
        })
        .catch((error) => {
          notify({
            type: "error",
            title: "Data Creation Process",
            text: "Error",
          });
          throw error;
        });
    },

    PaymentResultRequest<TRequest, TResponse>(data: any) {
      return HTTP<TResponse>({
        method: "post",
        url: `/api/Payments/PaymentResult`,
        params: data,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          notify({
            type: "success",
            title: "Data Creation Process",
            text: "Success",
          });
          return response;
        })
        .catch((error) => {
          notify({
            type: "error",
            title: "Data Creation Process",
            text: "Error",
          });
          throw error;
        });
    },

    readById<TResponse>(id: string) {
      return HTTP.get<TResponse>(`/api/${concreteName}/ReadById/${id}`)
        .then((response) => {
          // Başarılı bir yanıtın işlemleri
          notify({
            type: "success",
            title: "Data Call Process",
            text: "Success",
          });
          return response;
        })
        .catch((error) => {
          notify({
            type: "error",
            title: "Data Call Process",
            text: "Error",
          });
          throw error;
        });
    },

    readBySieveModel<TResponse>() {
      return HTTP.get<SieveResponse<TResponse>>(
        `/api/${concreteName}/ReadBySieveModel${"?Sorts=-createdOn&page=1&pageSize=99999"}`
      )
        .then((response) => {
          // Başarılı bir yanıtın işlemleri
          notify({
            type: "success",
            title: "Data Call Process",
            text: "Success",
          });
          return response;
        })
        .catch((error) => {
          notify({
            type: "error",
            title: "Data Call Process",
            text: "Error",
          });
          throw error;
        });
    },

    update<TRequest extends IActionRequest, TResponse extends IResponse>(
      data: TRequest
    ) {
      return HTTP<TResponse>({
        method: "post",
        url: `/api/${concreteName}/Update/${data.updateId}`,
        data: data,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          notify({
            type: "success",
            title: "Data Update Process",
            text: "Success",
          });
          return response;
        })
        .catch((error) => {
          notify({
            type: "error",
            title: "Data Update Process",
            text: "Error",
          });
          throw error;
        });
    },

    // updateWithFile(data, processFunction) {
    //   return HTTP(
    //     {
    //       method: "put",
    //       url: `/api/${concreteName}/Update/${data.id}`,
    //       data: data.item,
    //       headers: { "Content-Type": "multipart/form-data" },
    //     },
    //     { onUploadProgress: processFunction }
    //   )
    //     .then(response => {
    //       notify({
    //         type: "success",
    //         title: "Data Update File Process",
    //         text: "Success",
    //       });
    //       return response;
    //     })
    //     .catch(error => {
    //       notify({
    //         type: "error",
    //         title: "Data Update File Process",
    //         text: "Error",
    //       });
    //       throw error;
    //     });
    // },

    // active(data) {
    //   return HTTP.patch(`/api/${concreteName}/Active`, data, {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //     .then(response => {
    //       notify({
    //         type: "success",
    //         title: "Data Active Process",
    //         text: "Success",
    //       });
    //       return response;
    //     })
    //     .catch(error => {
    //       notify({
    //         type: "error",
    //         title: "Data Active Process",
    //         text: "Error",
    //       });
    //       throw error;
    //     });
    // },

    // deActive(data) {
    //   return HTTP.patch(`/api/${concreteName}/DeActive`, data, {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //     .then(response => {
    //       notify({
    //         type: "success",
    //         title: "Data DeActive Process",
    //         text: "Success",
    //       });
    //       return response;
    //     })
    //     .catch(error => {
    //       notify({
    //         type: "error",
    //         title: "Data DeActive Process",
    //         text: "Error",
    //       });
    //       throw error;
    //     });
    // },

    delete(data: string[]) {
      return HTTP<IdResponseList>({
        method: "post",
        url: `/api/${concreteName}/Delete`,
        data: data,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          notify({
            type: "success",
            title: "Data Delete Process",
            text: "Success",
          });
          return response;
        })
        .catch((error) => {
          notify({
            type: "error",
            title: "Data Delete Process",
            text: "Error",
          });
          throw error;
        });
    },

    // unDelete(data) {
    //   return HTTP.delete(`/api/${concreteName}/UnDelete`, {
    //     data: data,
    //     headers: { "Content-Type": "application/json" },
    //   })
    //     .then(response => {
    //       notify({
    //         type: "success",
    //         title: "Data UnDelete Process",
    //         text: "Success",
    //       });
    //       return response;
    //     })
    //     .catch(error => {
    //       notify({
    //         type: "error",
    //         title: "Data UnDelete Process",
    //         text: "Error",
    //       });
    //       throw error;
    //     });
    // },
  };
};
