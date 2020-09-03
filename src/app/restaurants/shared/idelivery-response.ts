export interface IDeliveryResponse {
    _id: string;
    neighborhood: string;
    timeToDelivery: number;
    free: boolean;
    value?: number;
}
