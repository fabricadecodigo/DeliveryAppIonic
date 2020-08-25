import { IBusinessHourResponse } from './ibusiness-hour-response';
export interface IRestaurantResponse {
    _id?: string;
    name?: string;
    phone?: string;
    open?: boolean;
    cep?: string;
    stret?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    businessHour?: IBusinessHourResponse[];
}
