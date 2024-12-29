import axios from "axios";

const baseUrl = "https://blushomemade-e0fkbbdtaadtcuhw.canadacentral-01.azurewebsites.net"

const axios_Create = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        "Content-Type" : "application/json",
        'Accept': 'application/json',
    }
});

export default axios_Create
