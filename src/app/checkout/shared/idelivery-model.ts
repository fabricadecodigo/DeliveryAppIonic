import { IAddressResponse } from './../../users/shared/iaddress-response';
import { DeliveryPlaceType } from './delivery-place-type.enum';

export interface IDeliveryModel {
    deliveryPlaceType?: DeliveryPlaceType;
    addressId?: string;
    selectedAddress?: IAddressResponse;
}
