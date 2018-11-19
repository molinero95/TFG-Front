export class MenuLinks {
    public static MODEL_CREATE_LINK: string = "modelCreate";
    public static PREDICTIONS_LINK: string = "predictions";
    public static TEST_MODEL_LINK: string = "testModel";
    public static TRAIN_MODEL_LINK: string = "trainModel";

}

export class ServiceURLs {
    public static SERVICE: string = "http://localhost:49937/api/";
    public static GET_ALL_NETWORKS: string = "network/GetNetworkNames";
    public static CREATE_NETWORK: string = "network/AddNetwork";
    public static GET_NETWORK: string = "network/GetNetworkInfo";
    public static TEST: string = "test/Test"
}