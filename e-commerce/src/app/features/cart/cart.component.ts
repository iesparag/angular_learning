// cart.component.ts

import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CartItem } from './state/cart.state';
import { Store } from '@ngrx/store';
import { getUserCart } from './state/cart.actions';
import { Observable, of } from 'rxjs';
import { selectAllCartItems } from './state/cart.selectors';
import { CartCommonCardComponent } from '../../shared/components/cart-common-card/cart-common-card.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SaveForLaterComponent } from '../save-for-later/save-for-later.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { GooglePlacesService } from '../../core/services/google-places.service';
import { FormsModule } from '@angular/forms';
import { saveUserAddressActionStart } from '../auth/state/auth.actions';

@Component({
    selector: 'app-cart',
    imports: [
        CartCommonCardComponent,
        AsyncPipe,
        CommonModule,
        FormsModule,
        RouterLink,
        SaveForLaterComponent,
        EmptyStateComponent,
    ],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, AfterViewInit {
    formattedAddress: string = '';
    addressComponents: Array<any> = [];
    address: string = '';
    addressDetails = {
        floor: '',
        building: '',
        street: '',
        locality: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        isDefault: false,
    };
    isAddressSaved: boolean = false;
    isError: boolean = false;
    errorMessage: string = '';
    userCartList$: Observable<CartItem[]> = of([]);
    totalAmount: number = 0;
    store = inject(Store);

    constructor(private googlePlacesService: GooglePlacesService) {}

    ngOnInit(): void {
        this.formattedAddress = this.googlePlacesService.getFormattedAddress();
        this.addressComponents =
            this.googlePlacesService.getAddressComponents();
        this.getUserCart();
        this.userCartList$ = this.store.select(selectAllCartItems);
        this.userCartList$.subscribe((cartItems) => {
            this.totalAmount = this.calculateTotalAmount(cartItems);
        });

        this.googlePlacesService
            .getAddressObservable()
            .subscribe((selectedAddress) => {
                this.address = selectedAddress;
                console.log('Address selected:', this.address);

                this.addressComponents =
                    this.googlePlacesService.getAddressComponents();
                this.processAddressComponents();
            });
    }

    ngAfterViewInit(): void {
        this.initializeAddressAutocomplete();
    }

    getUserCart() {
        this.store.dispatch(getUserCart());
    }

    calculateTotalAmount(cartItems: CartItem[]): number {
        return cartItems.reduce((sum, item) => {
            return sum + item.product.price * item.quantity;
        }, 0);
    }

    initializeAddressAutocomplete() {
        const inputElement = document.getElementById(
            'addressInput'
        ) as HTMLInputElement;

        if (inputElement) {
            this.googlePlacesService.initializeAutocomplete(inputElement);
        } else {
            console.error('Address input element not found');
        }
    }

    onAddressChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.address = input.value;
        this.isAddressSaved = false; // Reset save status if a new address is entered
        console.log('Selected Address:', this.address);
    }

    processAddressComponents(): void {
        const components = this.addressComponents;

        this.addressDetails.floor =
            components.find((component) =>
                component.types.includes('street_number')
            )?.long_name || '';
        this.addressDetails.building =
            components.find((component) => component.types.includes('premise'))
                ?.long_name || '';
        this.addressDetails.street =
            components.find((component) => component.types.includes('route'))
                ?.long_name || '';
        this.addressDetails.locality =
            components.find((component) => component.types.includes('locality'))
                ?.long_name || '';
        this.addressDetails.city =
            components.find((component) =>
                component.types.includes('administrative_area_level_3')
            )?.long_name || '';
        this.addressDetails.state =
            components.find((component) =>
                component.types.includes('administrative_area_level_1')
            )?.long_name || '';
        this.addressDetails.country =
            components.find((component) => component.types.includes('country'))
                ?.long_name || '';
        this.addressDetails.zip =
            components.find((component) =>
                component.types.includes('postal_code')
            )?.long_name || '';
    }

    validateAddressFields(): boolean {
        this.isError = false;
        this.errorMessage = '';

        // Check for missing fields and add errors for each required field
        const missingFields = [];

        if (!this.addressDetails.floor) missingFields.push('floor');
        if (!this.addressDetails.building) missingFields.push('building');
        if (!this.addressDetails.street) missingFields.push('street');
        if (!this.addressDetails.locality) missingFields.push('locality');
        if (!this.addressDetails.city) missingFields.push('city');
        if (!this.addressDetails.state) missingFields.push('state');
        if (!this.addressDetails.country) missingFields.push('country');
        if (!this.addressDetails.zip) missingFields.push('zip');

        if (missingFields.length > 0) {
            this.isError = true;
            console.log('this.isError: ', this.isError);
            console.log('this.errorMessage: ', this.errorMessage);
            this.errorMessage = `Please fill in all required fields: ${missingFields.join(
                ', '
            )}`;
            return false;
        }
        console.log('this.isError: ', this.isError);
        console.log('this.errorMessage: ', this.errorMessage);

        return true;
    }

    saveAddressDetails() {
        if (this.validateAddressFields()) {
            debugger;
            // Prepare the complete address data
            const completeAddress = {
                mainAddress: this.address,
                ...this.addressDetails,
            };

            console.log('Saving Address:', completeAddress);

            // this.store.dispatch(saveUserAddressActionStart({ address: completeAddress }));
            // debugger;
            this.isAddressSaved = true;

            // Clear input fields
            this.addressDetails = {
                floor: '',
                building: '',
                street: '',
                locality: '',
                city: '',
                state: '',
                country: '',
                zip: '',
                isDefault: false,
            };
        } else {
            console.error('Please complete all address fields before saving');
            debugger;
        }
    }

    useMyLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    this.reverseGeocode(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }

    reverseGeocode(lat: number, lng: number) {
        const geocoder = new window.google.maps.Geocoder();
        const latLng = new window.google.maps.LatLng(lat, lng);

        geocoder.geocode({ location: latLng }, (results: any, status: any) => {
            if (status === 'OK' && results[0]) {
                console.log('results:1234 ', results);
                const address = results[0].formatted_address;
                this.address = address;

                const components = results[0].address_components;
                this.addressDetails.floor = this.getAddressComponent(
                    components,
                    'floor'
                );
                this.addressDetails.building = this.getAddressComponent(
                    components,
                    'building'
                );
                this.addressDetails.street = this.getAddressComponent(
                    components,
                    'route'
                );
                this.addressDetails.locality = this.getAddressComponent(
                    components,
                    'locality'
                );
                this.addressDetails.city = this.getAddressComponent(
                    components,
                    'locality'
                );
                this.addressDetails.state = this.getAddressComponent(
                    components,
                    'administrative_area_level_1'
                );
                this.addressDetails.country = this.getAddressComponent(
                    components,
                    'country'
                );
                this.addressDetails.zip = this.getAddressComponent(
                    components,
                    'postal_code'
                );
            } else {
                console.error('Geocoder failed due to: ' + status);
            }
        });
    }

    getAddressComponent(components: any[], type: string): string {
        for (let i = 0; i < components.length; i++) {
            for (let j = 0; j < components[i].types.length; j++) {
                if (components[i].types[j] === type) {
                    return components[i].long_name;
                }
            }
        }
        return '';
    }
}
