import httpService from "./httpService";
const qualityEndpoint = "quality/";

const qualityService = {
    get: async (id) => {
        const { data } = await httpService.get(qualityEndpoint + id);
        return data;
    }
    // delete: async (id) => {
    //     const { data } = await httpService.delete(qualityEndpoint + id);
    //     return data;
    // }
};
export default qualityService;
