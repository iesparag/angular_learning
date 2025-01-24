import { Injectable } from '@angular/core';
let google: any;
@Injectable({
  providedIn: 'root',
})
export class GooglePlacesService {
  initializeAutocomplete(inputElement: HTMLInputElement): void {
    const autocomplete = new google.maps.places.Autocomplete(inputElement, {
      types: ['geocode'], // Show address-related suggestions
      componentRestrictions: { country: 'in' }, // Limit to India
    });

    // Listen for the 'place_changed' event
    autocomplete.addListener('place_changed', () => {
      const place: google.maps.places.PlaceResult = autocomplete.getPlace();
      if (place && place.formatted_address) {
        console.log('Selected Place:', place.formatted_address);
        inputElement.value = place.formatted_address;
      }
    });
  }
}
