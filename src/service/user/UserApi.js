import MyService from "../service";


const UserApi = {
    login: async (data) => {
        var result = null;
        await MyService.putRequestData("/users/login", data)
            .then(data => result = data)
            .catch(err => console.log(err))
        if (result && result.data) {
            console.log("result: ", result.data)
            reactLocalStorage.setObject("user.info", result.data);
        }
        return result
    },
    // register: async (data) => {
    //     var result = null;
    //     await MyService.postRequestData("/users/signup", data)
    //         .then(data => result = data)
    //         .catch(err => console.log(err))
    //     if (result.data) {
    //         console.log("result: ", result.data)
    //         reactLocalStorage.setObject("user.info", result.data);
    //     }
    //     return result
    // },
    // getUserById: async (user) => {
    //     var result = null;
    //     result = await MyService.getRequestData("/users/" + user.userId)
    //     if (result.data) {

    //         // var languageUser = reactLocalStorage.get("user.language");
    //         // languageUser = (languageUser === undefined || languageUser == "vi") ? "vi" : "en";

    //         // reactLocalStorage.set("language", languageUser);
    //         reactLocalStorage.setObject("user.info", result.data);
    //     }
    //     return result
    // },
    // logout: async () => {
    //     var user = reactLocalStorage.getObject("user.info", null);
    //     if (!user) return false
    //     else {
    //         var result = null;
    //         var token = user ? user.user_acc_tokn : ""
    //         await MyService.putRequestData("/users/logout", { user_acc_id: user.user_acc_id }, token)
    //             .then(data => result = data)
    //             .catch(err => console.log(err))
    //         if (result && result.code === "success") {
    //             reactLocalStorage.setObject("user.info", null)
    //             return true
    //         } else return false
    //     }
    // },
    // update: async (params) => {
    //     console.log("params", params)
    //     if (!params) return null;
    //     else {
    //         var user = reactLocalStorage.getObject("user.info", null);
    //         if (!user) return null;
    //         var token = user ? user.user_acc_tokn : ""
    //         var result = null;
    //         var url = "/users/edit"
    //         await MyService.putRequestData(url, params, token)
    //             .then(data => result = data)
    //             .catch(err => console.log(err))
    //         if (result && result.data) {
    //             reactLocalStorage.setObject("user.info", result.data)
    //         }
    //         return result
    //     }
    // },
    // changePassword: async (params) => {
    //     if (!params) return null;
    //     var user = reactLocalStorage.getObject("user.info", null);
    //     if (!user) return null;
    //     var token = user ? user.user_acc_tokn : ""
    //     var result = null;
    //     await MyService.putRequestData("/users/change-password", params, token)
    //         .then(data => result = data)
    //         .catch(err => console.log(err))
    //     if (result && result.data) {
    //         console.log("user after change password", result.data)
    //         reactLocalStorage.setObject("user.info", result.data)
    //     }
    //     return result
    // },
    // uploadAvatar: async (data) => { // upload ảnh đại diện
    //     if (!data) return null;
    //     var user = reactLocalStorage.getObject("user.info", null);
    //     if (!user) return null;
    //     var token = user ? user.user_acc_tokn : ""
    //     var result = null;
    //     const formData = new FormData()
    //     formData.append('avatar', data, data.name);
    //     await MyService.postRequestData("/users/upload-avatar", formData, token)
    //         .then(data => result = data)
    //         .catch(err => console.log(err))
    //     if (result && result.data) {
    //         reactLocalStorage.setObject("user.info", result.data)
    //     }
    //     return result
    // },
    // uploadProcedure: async (data) => {
    //     if (!data) return null;
    //     var user = reactLocalStorage.getObject("user.info", null);
    //     if (!user) return null;
    //     var token = user ? user.user_acc_tokn : ""
    //     var result = null;
    //     var url = "";
    //     var name = "";
    //     UserImgs.map(i => {
    //         if (i.id == data.proc_id) {
    //             url = i.url;
    //             name = i.name;
    //         }
    //     })
    //     if (!url || !name) {
    //         console.log("Not found proc_id");
    //         return null;
    //     }
    //     const formData = new FormData()
    //     formData.append(name, data.file, data.file.name);
    //     formData.append('proc_id', data.proc_id);
    //     formData.append('proc_img_indx', data.proc_img_indx);

    //     await MyService.postRequestData(url, formData, token)
    //         .then(data => result = data)
    //         .catch(err => console.log(err))
    //     if (result && result.data) {
    //         reactLocalStorage.setObject("user.info", result.data)
    //     }
    //     return result
    // },

}

export default UserApi;