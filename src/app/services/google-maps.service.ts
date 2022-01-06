import { Injectable } from "@angular/core";

const url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAEj35urdqfNphpjzblpT_NfF3xcCCmL4I&libraries=places&callback=initAutoComplete';
declare var window: any;
declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
    loadAPI: any
    placeSearch: any;
    autocomplete: any;
    place: any;

    constructor() {
      this.initAutoComplete();
    }

    initAutoComplete() {
        this.loadAPI = new Promise((resolve) => {
            // Set an 'initAutoComplete' function on the global scope for Google Maps API callback
            window['initAutoComplete'] = (ev) => {
                // Create the autocomplete object, restricting the search to geographical
                // location types.
                this.autocomplete = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(document.getElementById('location')),
                {types: ['geocode']});

                console.log(this.autocomplete);

                // When the user selects an address from the dropdown, populate the address
                // fields in the form.

                this.autocomplete.addListener('place_changed', this.setPlace.bind(this));
            }

            // if(typeof window.initAutoComplete === 'undefined') {
                console.log(window.initAutoComplete);
                this.loadScript();
            // }

        });
    }

    setPlace() {
        this.place = this.autocomplete.getPlace();
        console.log(this.place);
    }

    getPlace() {
        return this.place;
    }

    geolocate() {
        return this.loadAPI.then(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                this.autocomplete.setBounds(circle.getBounds());
                });
            }
        }).catch(error=>{
          console.error(error);
        });
    }
    
    /** Add Google API Scipt to head of index.html */
    loadScript() {
        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

}