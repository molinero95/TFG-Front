import { INetwork } from "../entities/inetwork";
import { ServiceURLs } from "../entities/ServiceURLs";

export class NetworkService{
    public static createNetwork(network: INetwork): Promise<Response> {
        return fetch(ServiceURLs.SERVICE + ServiceURLs.CREATE_NETWORK, {
            method: "POST",
            body: JSON.stringify(network),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    public static getNerworkPages(pageSize: number): Promise<Response>{
        return fetch(ServiceURLs.SERVICE + ServiceURLs.NETWORK_PAGES + "/pageSize=" + pageSize, {
            method: "GET",
        });
    }

    public static getNetwork(name: string): Promise<Response> {
        return fetch(ServiceURLs.SERVICE + ServiceURLs.GET_NETWORK + "/networkName=" + name, {
            method: "GET",
        });
    }

    public static getNetworkNames(page: number, pageSize: number): Promise<Response> {
        return fetch(ServiceURLs.SERVICE + ServiceURLs.GET_ALL_NETWORKS + `/pageSize=${pageSize}/page=${page}`, {
            method: "GET",
        });
    }
}